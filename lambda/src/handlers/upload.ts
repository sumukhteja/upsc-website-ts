import type { APIGatewayProxyHandler } from "aws-lambda"
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3"
import { v4 as uuidv4 } from "uuid"

const s3Client = new S3Client({ region: process.env.AWS_REGION || "us-east-1" })
const BUCKET_NAME = `upsc-master-files-${process.env.STAGE || "dev"}`

export const handler: APIGatewayProxyHandler = async (event) => {
  const headers = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "Content-Type,Authorization",
    "Access-Control-Allow-Methods": "POST,OPTIONS",
    "Content-Type": "application/json",
  }

  if (event.httpMethod === "OPTIONS") {
    return { statusCode: 200, headers, body: "" }
  }

  try {
    const { fileName, fileContent, contentType } = JSON.parse(event.body || "{}")

    if (!fileName || !fileContent) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ error: "Missing fileName or fileContent" }),
      }
    }

    const fileId = uuidv4()
    const key = `uploads/${fileId}-${fileName}`

    // Convert base64 to buffer
    const buffer = Buffer.from(fileContent, "base64")

    const command = new PutObjectCommand({
      Bucket: BUCKET_NAME,
      Key: key,
      Body: buffer,
      ContentType: contentType || "application/octet-stream",
    })

    await s3Client.send(command)

    const fileUrl = `https://${BUCKET_NAME}.s3.amazonaws.com/${key}`

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        message: "File uploaded successfully",
        fileUrl,
        fileId,
        key,
      }),
    }
  } catch (error) {
    console.error("Upload handler error:", error)
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: "Failed to upload file" }),
    }
  }
}
