import { NextResponse } from "next/server"

export async function GET() {
  const envVars = {
    NEXTAUTH_URL: {
      exists: !!process.env.NEXTAUTH_URL,
      status: process.env.NEXTAUTH_URL ? `Set: ${process.env.NEXTAUTH_URL}` : "Not set ✗",
    },
    NEXTAUTH_SECRET: {
      exists: !!process.env.NEXTAUTH_SECRET,
      status: process.env.NEXTAUTH_SECRET ? "Set ✓" : "Not set ✗",
    },
    GOOGLE_CLIENT_ID: {
      exists: !!process.env.GOOGLE_CLIENT_ID,
      status: process.env.GOOGLE_CLIENT_ID ? "Set ✓" : "Not set ✗",
    },
    GOOGLE_CLIENT_SECRET: {
      exists: !!process.env.GOOGLE_CLIENT_SECRET,
      status: process.env.GOOGLE_CLIENT_SECRET ? "Set ✓" : "Not set ✗",
    },
  }

  return NextResponse.json(envVars)
}
