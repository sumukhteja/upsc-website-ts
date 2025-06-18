import type { APIGatewayProxyHandler } from "aws-lambda"
import { successResponse, errorResponse, serverErrorResponse } from "../utils/response"
import { analyticsDb } from "../utils/database"
import { v4 as uuidv4 } from "uuid"

export const getAnalytics: APIGatewayProxyHandler = async (event) => {
  try {
    const { eventType, startDate, endDate, page = "1", limit = "100" } = event.queryStringParameters || {}

    const pageNum = Number.parseInt(page)
    const limitNum = Number.parseInt(limit)

    let filterExpression = ""
    const expressionAttributeValues: any = {}

    if (eventType) {
      filterExpression = "eventType = :eventType"
      expressionAttributeValues[":eventType"] = eventType
    }

    if (startDate && endDate) {
      const startTimestamp = new Date(startDate).getTime()
      const endTimestamp = new Date(endDate).getTime()

      if (filterExpression) filterExpression += " AND "
      filterExpression += "#timestamp BETWEEN :startDate AND :endDate"
      expressionAttributeValues[":startDate"] = startTimestamp
      expressionAttributeValues[":endDate"] = endTimestamp
    }

    const result = await analyticsDb.scan(
      filterExpression || undefined,
      Object.keys(expressionAttributeValues).length > 0 ? expressionAttributeValues : undefined,
      limitNum,
    )

    // Calculate basic analytics
    const analytics = {
      totalEvents: result.count,
      events: result.items,
      eventTypes: [...new Set(result.items.map((item: any) => item.eventType))],
      pagination: {
        page: pageNum,
        limit: limitNum,
        total: result.count,
        totalPages: Math.ceil(result.count / limitNum),
      },
    }

    return successResponse(analytics)
  } catch (error: any) {
    console.error("GetAnalytics error:", error)
    return serverErrorResponse(error.message || "Failed to get analytics")
  }
}

export const createEvent: APIGatewayProxyHandler = async (event) => {
  try {
    const { eventType, userId, data, sessionId } = JSON.parse(event.body || "{}")

    if (!eventType) {
      return errorResponse("Event type is required")
    }

    const eventId = uuidv4()
    const analyticsEvent = {
      id: eventId,
      eventType,
      userId: userId || null,
      data: data || {},
      timestamp: Date.now(),
      sessionId: sessionId || null,
      userAgent: event.headers["User-Agent"] || null,
      ipAddress: event.requestContext.identity?.sourceIp || null,
    }

    await analyticsDb.put(analyticsEvent)

    return successResponse(analyticsEvent, "Analytics event created successfully")
  } catch (error: any) {
    console.error("CreateEvent error:", error)
    return serverErrorResponse(error.message || "Failed to create analytics event")
  }
}
