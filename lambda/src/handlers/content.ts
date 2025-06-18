import type { APIGatewayProxyHandler } from "aws-lambda"
import { createClient } from "@supabase/supabase-js"

const supabase = createClient(process.env.SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!)

export const handler: APIGatewayProxyHandler = async (event) => {
  const { httpMethod, path } = event

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
    const resource = pathSegments[pathSegments.length - 1]

    switch (resource) {
      case "maps":
        return await handleMapsContent(headers)

      case "quiz":
        return await handleQuizContent(headers)

      default:
        return {
          statusCode: 404,
          headers,
          body: JSON.stringify({ error: "Resource not found" }),
        }
    }
  } catch (error) {
    console.error("Content handler error:", error)
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: "Internal server error" }),
    }
  }
}

async function handleMapsContent(headers: any) {
  const { data, error } = await supabase.from("maps").select("*").order("created_at", { ascending: false }).limit(50)

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
    body: JSON.stringify({ maps: data }),
  }
}

async function handleQuizContent(headers: any) {
  const { data, error } = await supabase
    .from("quiz_questions")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(50)

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
    body: JSON.stringify({ questions: data }),
  }
}
