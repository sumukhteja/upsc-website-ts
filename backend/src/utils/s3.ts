import {
  S3Client,
  PutObjectCommand,
  GetObjectCommand,
  DeleteObjectCommand,
  ListObjectsV2Command,
} from "@aws-sdk/client-s3"
import { getSignedUrl } from "@aws-sdk/s3-request-presigner"
import { v4 as uuidv4 } from "uuid"

const s3Client = new S3Client({ region: process.env.REGION })
const bucketName = process.env.S3_BUCKET!

export class S3Service {
  async uploadFile(file: Buffer, filename: string, mimeType: string, isPublic = false): Promise<string> {
    try {
      const key = `${isPublic ? "public" : "private"}/${uuidv4()}-${filename}`

      const command = new PutObjectCommand({
        Bucket: bucketName,
        Key: key,
        Body: file,
        ContentType: mimeType,
        ACL: isPublic ? "public-read" : "private",
      })

      await s3Client.send(command)
      return key
    } catch (error) {
      console.error("S3 upload error:", error)
      throw error
    }
  }

  async getSignedUrl(key: string, expiresIn = 3600): Promise<string> {
    try {
      const command = new GetObjectCommand({
        Bucket: bucketName,
        Key: key,
      })

      const signedUrl = await getSignedUrl(s3Client, command, { expiresIn })
      return signedUrl
    } catch (error) {
      console.error("S3 signed URL error:", error)
      throw error
    }
  }

  async deleteFile(key: string): Promise<boolean> {
    try {
      const command = new DeleteObjectCommand({
        Bucket: bucketName,
        Key: key,
      })

      await s3Client.send(command)
      return true
    } catch (error) {
      console.error("S3 delete error:", error)
      throw error
    }
  }

  async listFiles(prefix?: string, maxKeys?: number): Promise<any[]> {
    try {
      const command = new ListObjectsV2Command({
        Bucket: bucketName,
        Prefix: prefix,
        MaxKeys: maxKeys,
      })

      const result = await s3Client.send(command)
      return result.Contents || []
    } catch (error) {
      console.error("S3 list error:", error)
      throw error
    }
  }

  getPublicUrl(key: string): string {
    return `https://${bucketName}.s3.${process.env.REGION}.amazonaws.com/${key}`
  }
}

export const s3Service = new S3Service()
