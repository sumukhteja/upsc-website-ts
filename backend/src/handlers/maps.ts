import type { APIGatewayProxyHandler } from "aws-lambda"
import { successResponse, errorResponse, serverErrorResponse, notFoundResponse } from "../utils/response"
import { mapsDb } from "../utils/database"
import { v4 as uuidv4 } from "uuid"

export const getMaps: APIGatewayProxyHandler = async (event) => {
  try {
    const { category, region, page = "1", limit = "20" } = event.queryStringParameters || {}

    const pageNum = Number.parseInt(page)
    const limitNum = Number.parseInt(limit)

    let result

    if (category) {
      result = await mapsDb.query("category = :category", { ":category": category }, "CategoryIndex", limitNum)
    } else if (region) {
      result = await mapsDb.query("region = :region", { ":region": region }, "RegionIndex", limitNum)
    } else {
      result = await mapsDb.scan(undefined, undefined, limitNum)
    }

    return successResponse({
      maps: result.items,
      pagination: {
        page: pageNum,
        limit: limitNum,
        total: result.count,
        totalPages: Math.ceil(result.count / limitNum),
      },
    })
  } catch (error: any) {
    console.error("GetMaps error:", error)
    return serverErrorResponse(error.message || "Failed to get maps")
  }
}

export const createMap: APIGatewayProxyHandler = async (event) => {
  try {
    const { title, description, category, region, coordinates, zoom, markers } = JSON.parse(event.body || "{}")

    if (!title || !category || !region || !coordinates) {
      return errorResponse("Title, category, region, and coordinates are required")
    }

    if (!coordinates.lat || !coordinates.lng) {
      return errorResponse("Coordinates must include lat and lng")
    }

    const mapId = uuidv4()
    const map = {
      id: mapId,
      title,
      description: description || "",
      category,
      region,
      coordinates,
      zoom: zoom || 10,
      markers: markers || [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      createdBy: event.requestContext.authorizer?.claims?.sub || "system",
    }

    await mapsDb.put(map)

    return successResponse(map, "Map created successfully")
  } catch (error: any) {
    console.error("CreateMap error:", error)
    return serverErrorResponse(error.message || "Failed to create map")
  }
}

export const updateMap: APIGatewayProxyHandler = async (event) => {
  try {
    const { id } = event.pathParameters || {}
    const { title, description, category, region, coordinates, zoom, markers } = JSON.parse(event.body || "{}")

    if (!id) {
      return errorResponse("Map ID is required")
    }

    const map = await mapsDb.get({ id })
    if (!map) {
      return notFoundResponse("Map not found")
    }

    const updateExpression = []
    const expressionAttributeValues: any = {}

    if (title) {
      updateExpression.push("title = :title")
      expressionAttributeValues[":title"] = title
    }

    if (description !== undefined) {
      updateExpression.push("description = :description")
      expressionAttributeValues[":description"] = description
    }

    if (category) {
      updateExpression.push("category = :category")
      expressionAttributeValues[":category"] = category
    }

    if (region) {
      updateExpression.push("region = :region")
      expressionAttributeValues[":region"] = region
    }

    if (coordinates) {
      if (!coordinates.lat || !coordinates.lng) {
        return errorResponse("Coordinates must include lat and lng")
      }
      updateExpression.push("coordinates = :coordinates")
      expressionAttributeValues[":coordinates"] = coordinates
    }

    if (zoom !== undefined) {
      updateExpression.push("zoom = :zoom")
      expressionAttributeValues[":zoom"] = zoom
    }

    if (markers) {
      updateExpression.push("markers = :markers")
      expressionAttributeValues[":markers"] = markers
    }

    updateExpression.push("updatedAt = :updatedAt")
    expressionAttributeValues[":updatedAt"] = new Date().toISOString()

    const updatedMap = await mapsDb.update({ id }, `SET ${updateExpression.join(", ")}`, expressionAttributeValues)

    return successResponse(updatedMap, "Map updated successfully")
  } catch (error: any) {
    console.error("UpdateMap error:", error)
    return serverErrorResponse(error.message || "Failed to update map")
  }
}

export const deleteMap: APIGatewayProxyHandler = async (event) => {
  try {
    const { id } = event.pathParameters || {}

    if (!id) {
      return errorResponse("Map ID is required")
    }

    const map = await mapsDb.get({ id })
    if (!map) {
      return notFoundResponse("Map not found")
    }

    await mapsDb.delete({ id })

    return successResponse({ id }, "Map deleted successfully")
  } catch (error: any) {
    console.error("DeleteMap error:", error)
    return serverErrorResponse(error.message || "Failed to delete map")
  }
}
