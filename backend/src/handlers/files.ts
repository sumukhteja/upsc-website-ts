import type { APIGatewayProxyHandler } from "aws-lambda"
import { successResponse, errorResponse, serverErrorResponse, notFoundResponse } from "../utils/response"
import { filesDb } from "../utils/database"
import { s3Service } from "../utils/s3"
import { v4 as uuidv4 } from "uuid"

export const uploadFile: APIGatewayProxyHandler = async (event) => {
  try {
    const contentType = event.headers["content-type"] || event.headers["Content-Type"]

    if (!contentType || !contentType.includes("multipart/form-data")) {
      return errorResponse("Content-Type must be multipart/form-data")
    }

    // Parse multipart form data (simplified - you might want to use a proper parser)
    const body = event.isBase64Encoded ? Buffer.from(event.body!, "base64") : Buffer.from(event.body!, "utf8")

    // This is a simplified file upload - in production, use proper multipart parsing
    const filename = `upload-${Date.now()}.bin`
    const mimeType = "application/octet-stream"
    const isPublic = event.queryStringParameters?.public === "true"

    // Upload to S3
    const s3Key = await s3Service.uploadFile(body, filename, mimeType, isPublic)

    // Save file record to DynamoDB
    const fileId = uuidv4()
    const fileRecord = {
      id: fileId,
      filename,
      originalName: filename,
      mimeType,
      size: body.length,
      s3Key,
      uploadedBy: event.requestContext.authorizer?.claims?.sub || "anonymous",
      createdAt: new Date().toISOString(),
      isPublic,
    }

    await filesDb.put(fileRecord)

    // Generate URL for access
    const url = isPublic ? s3Service.getPublicUrl(s3Key) : await s3Service.getSignedUrl(s3Key)

    return successResponse(
      {
        file: fileRecord,
        url,
      },
      "File uploaded successfully",
    )
  } catch (error: any) {
    console.error("UploadFile error:", error)
    return serverErrorResponse(error.message || "Failed to upload file")
  }
}

export const getFiles: APIGatewayProxyHandler = async (event) => {
  try {
    const { page = "1", limit = "20", public: isPublic } = event.queryStringParameters || {}

    const pageNum = Number.parseInt(page)
    const limitNum = Number.parseInt(limit)

    let filterExpression = ""
    const expressionAttributeValues: any = {}

    if (isPublic !== undefined) {
      filterExpression = "isPublic = :isPublic"
      expressionAttributeValues[":isPublic"] = isPublic === "true"
    }

    const result = await filesDb.scan(
      filterExpression || undefined,
      Object.keys(expressionAttributeValues).length > 0 ? expressionAttributeValues : undefined,
      limitNum,
    )

    // Generate URLs for files
    const filesWithUrls = await Promise.all(
      result.items.map(async (file: any) => {
        const url = file.isPublic ? s3Service.getPublicUrl(file.s3Key) : await s3Service.getSignedUrl(file.s3Key)

        return { ...file, url }
      }),
    )

    return successResponse({
      files: filesWithUrls,
      pagination: {
        page: pageNum,
        limit: limitNum,
        total: result.count,
        totalPages: Math.ceil(result.count / limitNum),
      },
    })
  } catch (error: any) {
    console.error("GetFiles error:", error)
    return serverErrorResponse(error.message || "Failed to get files")
  }
}

export const deleteFile: APIGatewayProxyHandler = async (event) => {
  try {
    const { id } = event.pathParameters || {}

    if (!id) {
      return errorResponse("File ID is required")
    }

    const file = await filesDb.get({ id })
    if (!file) {
      return notFoundResponse("File not found")
    }

    // Delete from S3
    await s3Service.deleteFile(file.s3Key)

    // Delete from DynamoDB
    await filesDb.delete({ id })

    return successResponse({ id }, "File deleted successfully")
  } catch (error: any) {
    console.error("DeleteFile error:", error)
    return serverErrorResponse(error.message || "Failed to delete file")
  }
}
