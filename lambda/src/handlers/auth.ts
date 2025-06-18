import type { APIGatewayProxyHandler } from "aws-lambda"
import { createClient } from "@supabase/supabase-js"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"

const supabase = createClient(process.env.SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!)

export const handler: APIGatewayProxyHandler = async (event) => {
  const { httpMethod, path, body } = event

  // CORS headers
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
      case "signin":
        return await handleSignIn(JSON.parse(body || "{}"), headers)

      case "signup":
        return await handleSignUp(JSON.parse(body || "{}"), headers)

      case "verify":
        return await handleVerifyToken(event.headers.authorization, headers)

      default:
        return {
          statusCode: 404,
          headers,
          body: JSON.stringify({ error: "Endpoint not found" }),
        }
    }
  } catch (error) {
    console.error("Auth handler error:", error)
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: "Internal server error" }),
    }
  }
}

async function handleSignIn(data: any, headers: any) {
  const { email, password } = data

  // Demo users for testing
  const demoUsers = [
    {
      id: "1",
      email: "demo@upscmaster.com",
      password: "demo123",
      name: "Demo User",
    },
    {
      id: "2",
      email: "student@upscmaster.com",
      password: "student123",
      name: "UPSC Student",
    },
  ]

  const user = demoUsers.find((u) => u.email === email && u.password === password)

  if (user) {
    const token = jwt.sign({ id: user.id, email: user.email }, process.env.NEXTAUTH_SECRET!, { expiresIn: "30d" })

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        user: { id: user.id, email: user.email, name: user.name },
        token,
      }),
    }
  }

  return {
    statusCode: 401,
    headers,
    body: JSON.stringify({ error: "Invalid credentials" }),
  }
}

async function handleSignUp(data: any, headers: any) {
  const { email, password, name } = data

  // Hash password
  const hashedPassword = await bcrypt.hash(password, 12)

  // In a real app, save to database
  // For now, return success
  return {
    statusCode: 201,
    headers,
    body: JSON.stringify({ message: "User created successfully" }),
  }
}

async function handleVerifyToken(authHeader: string | undefined, headers: any) {
  if (!authHeader) {
    return {
      statusCode: 401,
      headers,
      body: JSON.stringify({ error: "No token provided" }),
    }
  }

  const token = authHeader.replace("Bearer ", "")

  try {
    const decoded = jwt.verify(token, process.env.NEXTAUTH_SECRET!)
    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({ user: decoded }),
    }
  } catch (error) {
    return {
      statusCode: 401,
      headers,
      body: JSON.stringify({ error: "Invalid token" }),
    }
  }
}
