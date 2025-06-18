import type { APIGatewayProxyHandler } from "aws-lambda"
import { successResponse, errorResponse, serverErrorResponse } from "../utils/response"
import { cognitoService } from "../utils/cognito"
import { usersDb } from "../utils/database"
import { v4 as uuidv4 } from "uuid"
import * as jwt from "jsonwebtoken"
import { CognitoIdentityProviderClient, ConfirmSignUpCommand } from "@aws-sdk/client-cognito-identity-provider";

import type { Request, Response } from "express";

export const confirmSignup = async (req: Request, res: Response) => {
  const { email, code } = req.body;
  const client = new CognitoIdentityProviderClient({ region: process.env.AWS_REGION });
  try {
    await client.send(new ConfirmSignUpCommand({
      ClientId: process.env.COGNITO_CLIENT_ID,
      Username: email,
      ConfirmationCode: code,
    }));
    res.status(200).json({ message: "Account confirmed" });
  } catch (error: any) {
    res.status(400).json({ error: error?.message || "Unknown error" });
  }
export const signUp: APIGatewayProxyHandler = async (event: import("aws-lambda").APIGatewayProxyEvent) => {
  try {
    const { email, password, name } = JSON.parse(event.body || "{}")
  try {
    const { email, password, name } = JSON.parse(event.body || "{}")

    if (!email || !password || !name) {
      return errorResponse("Email, password, and name are required")
    }

    // Create user in Cognito
    const cognitoUsername = await cognitoService.createUser(email, password, name)

    // Create user record in DynamoDB
    const userId = uuidv4()
    const user = {
      id: userId,
      email,
      name,
      role: "user",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      isActive: true,
      cognitoUsername,
    }

    await usersDb.put(user)

    console.error("SignUp error:", error)
    return serverErrorResponse((error as Error).message || "Failed to create user")
  }
}
  }
export const signIn: APIGatewayProxyHandler = async (event: import("aws-lambda").APIGatewayProxyEvent) => {
  try {
    const { email, password } = JSON.parse(event.body || "{}")
  try {
    const { email, password } = JSON.parse(event.body || "{}")

    if (!email || !password) {
      return errorResponse("Email and password are required")
    }

    // Authenticate with Cognito
    const authResult = await cognitoService.authenticateUser(email, password)

    if (!authResult) {
      return errorResponse("Invalid credentials", 401)
    }

    // Get user from DynamoDB
    const userQuery = await usersDb.query("email = :email", { ":email": email }, "EmailIndex")

    if (!userQuery.items || userQuery.items.length === 0) {
      return errorResponse("User not found", 404)
    }

    const user = userQuery.items[0]

    // Update last login
    await usersDb.update({ id: user.id }, "SET lastLogin = :lastLogin, updatedAt = :updatedAt", {
      ":lastLogin": new Date().toISOString(),
      ":updatedAt": new Date().toISOString(),
    })

    return successResponse(
      {
        user: {
          id: user.id,
          email: user.email,
          name: user.name,
          role: user.role,
        },
        tokens: {
          accessToken: authResult.AccessToken,
          refreshToken: authResult.RefreshToken,
          expiresIn: authResult.ExpiresIn,
        },
      },
      "Login successful",
    console.error("SignIn error:", error)
    return serverErrorResponse((error as Error).message || "Failed to sign in")
  }
}
  }
export const verify: APIGatewayProxyHandler = async (event: import("aws-lambda").APIGatewayProxyEvent) => {
  try {
    const { token } = JSON.parse(event.body || "{}")
  try {
    const { token } = JSON.parse(event.body || "{}")

    if (!token) {
      return errorResponse("Token is required")
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as any
    // Verify JWT token (you might want to use Cognito's token verification instead)
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as any

    // Get user from DynamoDB
    const user = await usersDb.get({ id: decoded.userId })

    if (!user) {
      return errorResponse("User not found", 404)
    }

    return successResponse(
      {
        user: {
          id: user.id,
          email: user.email,
          name: user.name,
          role: user.role,
        },
      },
      "Token verified",
    )
  } catch (error: any) {
    console.error("Verify error:", error)
    return errorResponse("Invalid token", 401)
  }
export const refresh: APIGatewayProxyHandler = async (event: import("aws-lambda").APIGatewayProxyEvent) => {
  try {
    const { refreshToken } = JSON.parse(event.body || "{}")
  try {
    const { refreshToken } = JSON.parse(event.body || "{}")

    if (!refreshToken) {
      return errorResponse("Refresh token is required")
    }

    // Implement refresh token logic with Cognito
    // This is a simplified version - you should use Cognito's refresh token flow

    console.error("Refresh error:", error)
    return serverErrorResponse((error as Error).message || "Failed to refresh token")
  }
}
  }
}
