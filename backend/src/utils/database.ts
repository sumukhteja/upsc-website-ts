import { DynamoDBClient } from "@aws-sdk/client-dynamodb"
import {
  DynamoDBDocumentClient,
  GetCommand,
  PutCommand,
  UpdateCommand,
  DeleteCommand,
  ScanCommand,
  QueryCommand,
} from "@aws-sdk/lib-dynamodb"

const client = new DynamoDBClient({ region: process.env.REGION })
const docClient = DynamoDBDocumentClient.from(client)

export class DatabaseService {
  private tableName: string

  constructor(tableName: string) {
    this.tableName = tableName
  }

  async get(key: Record<string, any>) {
    try {
      const command = new GetCommand({
        TableName: this.tableName,
        Key: key,
      })
      const result = await docClient.send(command)
      return result.Item
    } catch (error) {
      console.error("Database get error:", error)
      throw error
    }
  }

  async put(item: Record<string, any>) {
    try {
      const command = new PutCommand({
        TableName: this.tableName,
        Item: item,
      })
      await docClient.send(command)
      return item
    } catch (error) {
      console.error("Database put error:", error)
      throw error
    }
  }

  async update(
    key: Record<string, any>,
    updateExpression: string,
    expressionAttributeValues: Record<string, any>,
    expressionAttributeNames?: Record<string, string>,
  ) {
    try {
      const command = new UpdateCommand({
        TableName: this.tableName,
        Key: key,
        UpdateExpression: updateExpression,
        ExpressionAttributeValues: expressionAttributeValues,
        ExpressionAttributeNames: expressionAttributeNames,
        ReturnValues: "ALL_NEW",
      })
      const result = await docClient.send(command)
      return result.Attributes
    } catch (error) {
      console.error("Database update error:", error)
      throw error
    }
  }

  async delete(key: Record<string, any>) {
    try {
      const command = new DeleteCommand({
        TableName: this.tableName,
        Key: key,
      })
      await docClient.send(command)
      return true
    } catch (error) {
      console.error("Database delete error:", error)
      throw error
    }
  }

  async scan(filterExpression?: string, expressionAttributeValues?: Record<string, any>, limit?: number) {
    try {
      const command = new ScanCommand({
        TableName: this.tableName,
        FilterExpression: filterExpression,
        ExpressionAttributeValues: expressionAttributeValues,
        Limit: limit,
      })
      const result = await docClient.send(command)
      return {
        items: result.Items || [],
        lastEvaluatedKey: result.LastEvaluatedKey,
        count: result.Count || 0,
      }
    } catch (error) {
      console.error("Database scan error:", error)
      throw error
    }
  }

  async query(
    keyConditionExpression: string,
    expressionAttributeValues: Record<string, any>,
    indexName?: string,
    limit?: number,
  ) {
    try {
      const command = new QueryCommand({
        TableName: this.tableName,
        KeyConditionExpression: keyConditionExpression,
        ExpressionAttributeValues: expressionAttributeValues,
        IndexName: indexName,
        Limit: limit,
      })
      const result = await docClient.send(command)
      return {
        items: result.Items || [],
        lastEvaluatedKey: result.LastEvaluatedKey,
        count: result.Count || 0,
      }
    } catch (error) {
      console.error("Database query error:", error)
      throw error
    }
  }

  async batchWrite(items: Record<string, any>[], operation: "PUT" | "DELETE" = "PUT") {
    try {
      const chunks = this.chunkArray(items, 25) // DynamoDB batch limit is 25

      for (const chunk of chunks) {
        const requestItems = chunk.map((item) => ({
          [operation]: operation === "PUT" ? { Item: item } : { Key: item },
        }))

        await docClient.send({
          RequestItems: {
            [this.tableName]: requestItems,
          },
        } as any)
      }

      return true
    } catch (error) {
      console.error("Database batch write error:", error)
      throw error
    }
  }

  private chunkArray<T>(array: T[], size: number): T[][] {
    const chunks: T[][] = []
    for (let i = 0; i < array.length; i += size) {
      chunks.push(array.slice(i, i + size))
    }
    return chunks
  }
}

// Pre-configured database services
export const usersDb = new DatabaseService(process.env.USERS_TABLE!)
export const quizDb = new DatabaseService(process.env.QUIZ_TABLE!)
export const mapsDb = new DatabaseService(process.env.MAPS_TABLE!)
export const filesDb = new DatabaseService(process.env.FILES_TABLE!)
export const analyticsDb = new DatabaseService(process.env.ANALYTICS_TABLE!)
