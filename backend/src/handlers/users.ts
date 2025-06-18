import type { APIGatewayProxyHandler } from "aws-lambda"
import { successResponse, errorResponse, serverErrorResponse, notFoundResponse } from "../utils/response"
import { usersDb } from "../utils/database"
import { cognitoService } from "../utils/cognito"
import { v4 as uuidv4 } from "uuid"

export const getUsers: APIGatewayProxyHandler = async (event) => {
  try {
    const { page = "1", limit = "10", role, search } = event.queryStringParameters || {}

    const pageNum = Number.parseInt(page)
    const limitNum = Number.parseInt(limit)

    let filterExpression = ""
    const expressionAttributeValues: any = {}

    if (role) {
      filterExpression = "#role = :role"
      expressionAttributeValues[":role"] = role
    }

    if (search) {
      if (filterExpression) filterExpression += " AND "
      filterExpression += "contains(#name, :search) OR contains(email, :search)"
      expressionAttributeValues[":search"] = search
    }

    const result = await usersDb.scan(
      filterExpression || undefined,
      Object.keys(expressionAttributeValues).length > 0 ? expressionAttributeValues : undefined,
      limitNum,
    )

    return successResponse({
      users: result.items,
      pagination: {
        page: pageNum,
        limit: limitNum,
        total: result.count,
        totalPages: Math.ceil(result.count / limitNum),
      },
    })
  } catch (error: any) {
    console.error("GetUsers error:", error)
    return serverErrorResponse(error.message || "Failed to get users")
  }
}

export const createUser: APIGatewayProxyHandler = async (event) => {
  try {
    const { email, name, role = "user", password } = JSON.parse(event.body || "{}")

    if (!email || !name || !password) {
      return errorResponse("Email, name, and password are required")
    }

    // Create user in Cognito
    const cognitoUsername = await cognitoService.createUser(email, password, name, role)

    // Create user record in DynamoDB
    const userId = uuidv4()
    const user = {
      id: userId,
      email,
      name,
      role,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      isActive: true,
      cognitoUsername,
    }

    await usersDb.put(user)

    return successResponse(user, "User created successfully")
  } catch (error: any) {
    console.error("CreateUser error:", error)
    return serverErrorResponse(error.message || "Failed to create user")
  }
}

export const updateUser: APIGatewayProxyHandler = async (event) => {
  try {
    const { id } = event.pathParameters || {}
    const { name, role, isActive } = JSON.parse(event.body || "{}")

    if (!id) {
      return errorResponse("User ID is required")
    }

    const user = await usersDb.get({ id })
    if (!user) {
      return notFoundResponse("User not found")
    }

    const updateExpression = []
    const expressionAttributeValues: any = {}
    const expressionAttributeNames: any = {}

    if (name) {
      updateExpression.push("#name = :name")
      expressionAttributeValues[":name"] = name
      expressionAttributeNames["#name"] = "name"
    }

    if (role) {
      updateExpression.push("#role = :role")
      expressionAttributeValues[":role"] = role
      expressionAttributeNames["#role"] = "role"
    }

    if (typeof isActive === "boolean") {
      updateExpression.push("isActive = :isActive")
      expressionAttributeValues[":isActive"] = isActive
    }

    updateExpression.push("updatedAt = :updatedAt")
    expressionAttributeValues[":updatedAt"] = new Date().toISOString()

    const updatedUser = await usersDb.update(
      { id },
      `SET ${updateExpression.join(", ")}`,
      expressionAttributeValues,
      Object.keys(expressionAttributeNames).length > 0 ? expressionAttributeNames : undefined,
    )

    // Update Cognito user attributes if needed
    if (name || role) {
      const attributes = []
      if (name) attributes.push({ Name: "name", Value: name })
      if (role) attributes.push({ Name: "custom:role", Value: role })

      await cognitoService.updateUser(user.cognitoUsername, attributes)
    }

    return successResponse(updatedUser, "User updated successfully")
  } catch (error: any) {
    console.error("UpdateUser error:", error)
    return serverErrorResponse(error.message || "Failed to update user")
  }
}

export const deleteUser: APIGatewayProxyHandler = async (event) => {
  try {
    const { id } = event.pathParameters || {}

    if (!id) {
      return errorResponse("User ID is required")
    }

    const user = await usersDb.get({ id })
    if (!user) {
      return notFoundResponse("User not found")
    }

    // Delete from Cognito
    await cognitoService.deleteUser(user.cognitoUsername)

    // Delete from DynamoDB
    await usersDb.delete({ id })

    return successResponse({ id }, "User deleted successfully")
  } catch (error: any) {
    console.error("DeleteUser error:", error)
    return serverErrorResponse(error.message || "Failed to delete user")
  }
}
