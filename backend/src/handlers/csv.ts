import type { APIGatewayProxyHandler } from "aws-lambda"
import { successResponse, errorResponse, serverErrorResponse } from "../utils/response"
import { quizDb, mapsDb } from "../utils/database"
import { v4 as uuidv4 } from "uuid"
import * as csv from "csv-parser"
import { Readable } from "stream"

export const uploadQuiz: APIGatewayProxyHandler = async (event) => {
  try {
    const body = event.isBase64Encoded ? Buffer.from(event.body!, "base64") : event.body!

    if (!body) {
      return errorResponse("CSV data is required")
    }

    const results: any[] = []
    const stream = Readable.from(body)

    await new Promise((resolve, reject) => {
      stream
        .pipe(csv())
        .on("data", (data) => results.push(data))
        .on("end", resolve)
        .on("error", reject)
    })

    if (results.length === 0) {
      return errorResponse("No valid data found in CSV")
    }

    const quizzes = results.map((row) => {
      const options = [row.option1, row.option2, row.option3, row.option4].filter(Boolean)

      return {
        id: uuidv4(),
        question: row.question,
        options,
        correctAnswer: Number.parseInt(row.correctAnswer) || 0,
        explanation: row.explanation || "",
        subject: row.subject || "General",
        difficulty: row.difficulty || "medium",
        tags: row.tags ? row.tags.split(",").map((tag: string) => tag.trim()) : [],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        createdBy: event.requestContext.authorizer?.claims?.sub || "csv-import",
      }
    })

    // Batch write to DynamoDB
    await quizDb.batchWrite(quizzes)

    return successResponse(
      {
        imported: quizzes.length,
        quizzes: quizzes.slice(0, 5), // Return first 5 as sample
      },
      `Successfully imported ${quizzes.length} quiz questions`,
    )
  } catch (error: any) {
    console.error("CSV Quiz Upload error:", error)
    return serverErrorResponse(error.message || "Failed to upload quiz CSV")
  }
}

export const uploadMaps: APIGatewayProxyHandler = async (event) => {
  try {
    const body = event.isBase64Encoded ? Buffer.from(event.body!, "base64") : event.body!

    if (!body) {
      return errorResponse("CSV data is required")
    }

    const results: any[] = []
    const stream = Readable.from(body)

    await new Promise((resolve, reject) => {
      stream
        .pipe(csv())
        .on("data", (data) => results.push(data))
        .on("end", resolve)
        .on("error", reject)
    })

    if (results.length === 0) {
      return errorResponse("No valid data found in CSV")
    }

    const maps = results.map((row) => {
      const markers = []

      // Parse markers if they exist
      if (row.markers) {
        try {
          const markerData = JSON.parse(row.markers)
          if (Array.isArray(markerData)) {
            markers.push(...markerData)
          }
        } catch (e) {
          // If JSON parsing fails, create a single marker from the main coordinates
          markers.push({
            id: uuidv4(),
            title: row.title,
            description: row.description || "",
            coordinates: {
              lat: Number.parseFloat(row.lat),
              lng: Number.parseFloat(row.lng),
            },
            type: "default",
          })
        }
      }

      return {
        id: uuidv4(),
        title: row.title,
        description: row.description || "",
        category: row.category || "General",
        region: row.region || "India",
        coordinates: {
          lat: Number.parseFloat(row.lat),
          lng: Number.parseFloat(row.lng),
        },
        zoom: Number.parseInt(row.zoom) || 10,
        markers,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        createdBy: event.requestContext.authorizer?.claims?.sub || "csv-import",
      }
    })

    // Batch write to DynamoDB
    await mapsDb.batchWrite(maps)

    return successResponse(
      {
        imported: maps.length,
        maps: maps.slice(0, 5), // Return first 5 as sample
      },
      `Successfully imported ${maps.length} maps`,
    )
  } catch (error: any) {
    console.error("CSV Maps Upload error:", error)
    return serverErrorResponse(error.message || "Failed to upload maps CSV")
  }
}
