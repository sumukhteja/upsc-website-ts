"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function TestAPIPage() {
  const [results, setResults] = useState<any>({})
  const [loading, setLoading] = useState<string | null>(null)

  const testEndpoint = async (endpoint: string, method = "GET", body?: any) => {
    setLoading(endpoint)
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}${endpoint}`, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: body ? JSON.stringify(body) : undefined,
      })

      const data = await response.json()
      setResults((prev: any) => ({
        ...prev,
        [endpoint]: {
          status: response.status,
          data,
        },
      }))
    } catch (error) {
      setResults((prev: any) => ({
        ...prev,
        [endpoint]: {
          status: "error",
          data: error,
        },
      }))
    } finally {
      setLoading(null)
    }
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">API Connection Test</h1>

        <div className="grid gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Backend Connection</CardTitle>
              <CardDescription>Test your AWS Lambda backend endpoints</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Button onClick={() => testEndpoint("/api/quiz")} disabled={loading === "/api/quiz"} variant="outline">
                  {loading === "/api/quiz" ? "Testing..." : "Test Quiz API"}
                </Button>

                <Button onClick={() => testEndpoint("/api/maps")} disabled={loading === "/api/maps"} variant="outline">
                  {loading === "/api/maps" ? "Testing..." : "Test Maps API"}
                </Button>

                <Button
                  onClick={() => testEndpoint("/api/users")}
                  disabled={loading === "/api/users"}
                  variant="outline"
                >
                  {loading === "/api/users" ? "Testing..." : "Test Users API"}
                </Button>

                <Button
                  onClick={() => testEndpoint("/api/analytics")}
                  disabled={loading === "/api/analytics"}
                  variant="outline"
                >
                  {loading === "/api/analytics" ? "Testing..." : "Test Analytics API"}
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Test Results</CardTitle>
              <CardDescription>API response results will appear here</CardDescription>
            </CardHeader>
            <CardContent>
              <pre className="bg-gray-100 p-4 rounded-lg overflow-auto text-sm">{JSON.stringify(results, null, 2)}</pre>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Environment Variables</CardTitle>
              <CardDescription>Check your configuration</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 text-sm">
                <div>
                  <strong>API URL:</strong> {process.env.NEXT_PUBLIC_API_URL || "Not configured"}
                </div>
                <div>
                  <strong>AWS Region:</strong> {process.env.NEXT_PUBLIC_AWS_REGION || "Not configured"}
                </div>
                <div>
                  <strong>Cognito User Pool:</strong> {process.env.NEXT_PUBLIC_COGNITO_USER_POOL_ID || "Not configured"}
                </div>
                <div>
                  <strong>Cognito Client:</strong> {process.env.NEXT_PUBLIC_COGNITO_CLIENT_ID || "Not configured"}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
