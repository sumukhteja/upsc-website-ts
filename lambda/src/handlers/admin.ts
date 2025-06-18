import type { APIGatewayProxyHandler } from "aws-lambda"
import { createClient } from "@supabase/supabase-js"
import csv from "csv-parser"
import { Readable } from "stream"

const supabase = createClient(process.env.SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!)

export const handler: APIGatewayProxyHandler = async (event) => {
  const { httpMethod, path, body } = event

  const headers = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "Content-Type,Authorization",
    "Access-Control-Allow-Methods": "GET,POST,PUT,DELETE,OPTIONS",
    "Content-Type": "application/json",
  }

  if (httpMethod === "OPTIONS") {
    return { statusCode: 200, headers, body: "" }
  }

  try {
    const pathSegments = path.split("/").filter(Boolean)
    const action = pathSegments[pathSegments.length - 1]

    switch (action) {
      case "upload":
        return await handleUpload(JSON.parse(body || "{}"), headers)

      case "files":
        return await handleFiles(headers)

      case "maps":
        return await handleMaps(httpMethod, JSON.parse(body || "{}"), headers)

      case "quiz":
        return await handleQuiz(httpMethod, JSON.parse(body || "{}"), headers)

      case "csv-quiz":
        return await handleCSVQuiz(JSON.parse(body || "{}"), headers)

      case "csv-maps":
        return await handleCSVMaps(JSON.parse(body || "{}"), headers)

      default:
        return {
          statusCode: 404,
          headers,
          body: JSON.stringify({ error: "Endpoint not found" }),
        }
    }
  } catch (error) {
    console.error("Admin handler error:", error)
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: "Internal server error" }),
    }
  }
}

async function handleUpload(data: any, headers: any) {
  // Handle file upload logic
  return {
    statusCode: 200,
    headers,
    body: JSON.stringify({ message: "File uploaded successfully" }),
  }
}

async function handleFiles(headers: any) {
  // Get files from database
  const { data, error } = await supabase.from("files").select("*").order("created_at", { ascending: false })

  if (error) {
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: error.message }),
    }
  }

  return {
    statusCode: 200,
    headers,
    body: JSON.stringify({ files: data }),
  }
}

async function handleMaps(method: string, data: any, headers: any) {
  if (method === "GET") {
    const { data: maps, error } = await supabase.from("maps").select("*").order("created_at", { ascending: false })

    if (error) {
      return {
        statusCode: 500,
        headers,
        body: JSON.stringify({ error: error.message }),
      }
    }

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({ maps }),
    }
  }

  if (method === "POST") {
    const { data: newMap, error } = await supabase.from("maps").insert([data]).select()

    if (error) {
      return {
        statusCode: 500,
        headers,
        body: JSON.stringify({ error: error.message }),
      }
    }

    return {
      statusCode: 201,
      headers,
      body: JSON.stringify({ map: newMap[0] }),
    }
  }

  return {
    statusCode: 405,
    headers,
    body: JSON.stringify({ error: "Method not allowed" }),
  }
}

async function handleQuiz(method: string, data: any, headers: any) {
  if (method === "GET") {
    const { data: quizzes, error } = await supabase
      .from("quiz_questions")
      .select("*")
      .order("created_at", { ascending: false })

    if (error) {
      return {
        statusCode: 500,
        headers,
        body: JSON.stringify({ error: error.message }),
      }
    }

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({ quizzes }),
    }
  }

  if (method === "POST") {
    const { data: newQuiz, error } = await supabase.from("quiz_questions").insert([data]).select()

    if (error) {
      return {
        statusCode: 500,
        headers,
        body: JSON.stringify({ error: error.message }),
      }
    }

    return {
      statusCode: 201,
      headers,
      body: JSON.stringify({ quiz: newQuiz[0] }),
    }
  }

  return {
    statusCode: 405,
    headers,
    body: JSON.stringify({ error: "Method not allowed" }),
  }
}

async function handleCSVQuiz(data: any, headers: any) {
  const { csvData } = data

  try {
    const results: any[] = []

    // Parse CSV data
    const stream = Readable.from([csvData])

    await new Promise((resolve, reject) => {
      stream
        .pipe(csv())
        .on("data", (row) => {
          results.push({
            question: row.question,
            option_a: row.option_a,
            option_b: row.option_b,
            option_c: row.option_c,
            option_d: row.option_d,
            correct_answer: row.correct_answer,
            explanation: row.explanation,
            subject: row.subject,
            difficulty: row.difficulty || "medium",
            created_at: new Date().toISOString(),
          })
        })
        .on("end", resolve)
        .on("error", reject)
    })

    // Insert into database
    const { data: insertedData, error } = await supabase.from("quiz_questions").insert(results).select()

    if (error) {
      return {
        statusCode: 500,
        headers,
        body: JSON.stringify({ error: error.message }),
      }
    }

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        message: `Successfully imported ${results.length} quiz questions`,
        data: insertedData,
      }),
    }
  } catch (error) {
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: "Failed to process CSV data" }),
    }
  }
}

async function handleCSVMaps(data: any, headers: any) {
  const { csvData } = data

  try {
    const results: any[] = []

    // Parse CSV data
    const stream = Readable.from([csvData])

    await new Promise((resolve, reject) => {
      stream
        .pipe(csv())
        .on("data", (row) => {
          results.push({
            title: row.title,
            description: row.description,
            category: row.category,
            region: row.region,
            coordinates: row.coordinates,
            importance: row.importance || "medium",
            created_at: new Date().toISOString(),
          })
        })
        .on("end", resolve)
        .on("error", reject)
    })

    // Insert into database
    const { data: insertedData, error } = await supabase.from("maps").insert(results).select()

    if (error) {
      return {
        statusCode: 500,
        headers,
        body: JSON.stringify({ error: error.message }),
      }
    }

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        message: `Successfully imported ${results.length} map entries`,
        data: insertedData,
      }),
    }
  } catch (error) {
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: "Failed to process CSV data" }),
    }
  }
}
