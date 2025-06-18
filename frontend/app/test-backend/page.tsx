"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useToast } from "@/hooks/use-toast"

export default function TestBackendPage() {
  const [results, setResults] = useState<any>({})
  const [loading, setLoading] = useState<string | null>(null)
  const [authToken, setAuthToken] = useState("")
  const { toast } = useToast()

  const apiCall = async (endpoint: string, method: string, body?: any, requiresAuth = false) => {
    const testKey = `${method} ${endpoint}`
    setLoading(testKey)

    try {
      const headers: any = {
        "Content-Type": "application/json",
      }

      if (requiresAuth && authToken) {
        headers.Authorization = `Bearer ${authToken}`
      }

      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}${endpoint}`, {
        method,
        headers,
        body: body ? JSON.stringify(body) : undefined,
      })

      const data = await response.json()

      setResults((prev: any) => ({
        ...prev,
        [testKey]: {
          status: response.status,
          statusText: response.statusText,
          data,
          timestamp: new Date().toLocaleTimeString(),
        },
      }))

      toast({
        title: `${method} ${endpoint}`,
        description: `Status: ${response.status} ${response.statusText}`,
        variant: response.ok ? "default" : "destructive",
      })
    } catch (error: any) {
      setResults((prev: any) => ({
        ...prev,
        [testKey]: {
          status: "ERROR",
          data: { error: error.message },
          timestamp: new Date().toLocaleTimeString(),
        },
      }))

      toast({
        title: "Request Failed",
        description: error.message,
        variant: "destructive",
      })
    } finally {
      setLoading(null)
    }
  }

  const testAuth = async () => {
    // Test signup first
    await apiCall("/api/auth/signup", "POST", {
      email: "test@example.com",
      password: "TestPass123!",
      name: "Test User",
    })

    // Test signin
    await apiCall("/api/auth/signin", "POST", {
      email: "demo@upscmaster.com",
      password: "demo123",
    })
  }

  const testQuiz = async () => {
    // GET all quizzes
    await apiCall("/api/quiz", "GET")

    // POST new quiz
    await apiCall(
      "/api/quiz",
      "POST",
      {
        question: "What is the capital of India?",
        options: ["Mumbai", "Delhi", "Kolkata", "Chennai"],
        correctAnswer: 1,
        subject: "Geography",
        difficulty: "easy",
        explanation: "Delhi is the capital of India.",
      },
      true,
    )
  }

  const testMaps = async () => {
    // GET all maps
    await apiCall("/api/maps", "GET")

    // POST new map
    await apiCall(
      "/api/maps",
      "POST",
      {
        title: "India Political Map",
        description: "Political boundaries of India",
        category: "political",
        region: "india",
        imageUrl: "https://example.com/india-map.jpg",
        metadata: {
          states: 28,
          unionTerritories: 8,
        },
      },
      true,
    )
  }

  const testUsers = async () => {
    // GET all users (admin only)
    await apiCall("/api/users", "GET", null, true)

    // POST new user
    await apiCall(
      "/api/users",
      "POST",
      {
        email: "newuser@example.com",
        name: "New User",
        password: "NewPass123!",
        role: "user",
      },
      true,
    )
  }

  const testAnalytics = async () => {
    // GET analytics
    await apiCall("/api/analytics", "GET", null, true)

    // POST analytics event
    await apiCall(
      "/api/analytics/event",
      "POST",
      {
        eventType: "quiz_completed",
        userId: "test-user-id",
        metadata: {
          quizId: "test-quiz-id",
          score: 85,
          timeSpent: 300,
        },
      },
      true,
    )
  }

  const testFiles = async () => {
    // GET all files
    await apiCall("/api/files", "GET", null, true)
  }

  const clearResults = () => {
    setResults({})
    toast({
      title: "Results Cleared",
      description: "All test results have been cleared",
    })
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Backend API Testing</h1>

        {/* Auth Token Input */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Authentication</CardTitle>
            <CardDescription>Enter your JWT token for authenticated requests</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex gap-4">
              <div className="flex-1">
                <Label htmlFor="token">JWT Token (Optional)</Label>
                <Input
                  id="token"
                  type="password"
                  placeholder="Enter JWT token from sign-in response..."
                  value={authToken}
                  onChange={(e) => setAuthToken(e.target.value)}
                />
              </div>
              <div className="flex items-end">
                <Button onClick={testAuth} disabled={loading !== null}>
                  {loading?.includes("auth") ? "Testing..." : "Test Auth"}
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Test Categories */}
        <div className="grid gap-6 md:grid-cols-2">
          {/* Authentication Tests */}
          <Card>
            <CardHeader>
              <CardTitle>🔐 Authentication API</CardTitle>
              <CardDescription>Test user authentication endpoints</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button
                onClick={() =>
                  apiCall("/api/auth/signup", "POST", {
                    email: `test${Date.now()}@example.com`,
                    password: "TestPass123!",
                    name: "Test User",
                  })
                }
                disabled={loading !== null}
                variant="outline"
                className="w-full"
              >
                POST /api/auth/signup
              </Button>
              <Button
                onClick={() =>
                  apiCall("/api/auth/signin", "POST", {
                    email: "demo@upscmaster.com",
                    password: "demo123",
                  })
                }
                disabled={loading !== null}
                variant="outline"
                className="w-full"
              >
                POST /api/auth/signin
              </Button>
              <Button
                onClick={() =>
                  apiCall("/api/auth/verify", "POST", {
                    token: authToken || "sample-token",
                  })
                }
                disabled={loading !== null}
                variant="outline"
                className="w-full"
              >
                POST /api/auth/verify
              </Button>
            </CardContent>
          </Card>

          {/* Quiz Tests */}
          <Card>
            <CardHeader>
              <CardTitle>📝 Quiz API</CardTitle>
              <CardDescription>Test quiz management endpoints</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button
                onClick={() => apiCall("/api/quiz", "GET")}
                disabled={loading !== null}
                variant="outline"
                className="w-full"
              >
                GET /api/quiz
              </Button>
              <Button
                onClick={() =>
                  apiCall(
                    "/api/quiz",
                    "POST",
                    {
                      question: "What is the capital of India?",
                      options: ["Mumbai", "Delhi", "Kolkata", "Chennai"],
                      correctAnswer: 1,
                      subject: "Geography",
                      difficulty: "easy",
                    },
                    true,
                  )
                }
                disabled={loading !== null}
                variant="outline"
                className="w-full"
              >
                POST /api/quiz
              </Button>
              <Button
                onClick={() => apiCall("/api/quiz?subject=Geography", "GET")}
                disabled={loading !== null}
                variant="outline"
                className="w-full"
              >
                GET /api/quiz?subject=Geography
              </Button>
            </CardContent>
          </Card>

          {/* Maps Tests */}
          <Card>
            <CardHeader>
              <CardTitle>🗺️ Maps API</CardTitle>
              <CardDescription>Test maps management endpoints</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button
                onClick={() => apiCall("/api/maps", "GET")}
                disabled={loading !== null}
                variant="outline"
                className="w-full"
              >
                GET /api/maps
              </Button>
              <Button
                onClick={() =>
                  apiCall(
                    "/api/maps",
                    "POST",
                    {
                      title: "India Political Map",
                      description: "Political boundaries of India",
                      category: "political",
                      region: "india",
                    },
                    true,
                  )
                }
                disabled={loading !== null}
                variant="outline"
                className="w-full"
              >
                POST /api/maps
              </Button>
              <Button
                onClick={() => apiCall("/api/maps?category=political", "GET")}
                disabled={loading !== null}
                variant="outline"
                className="w-full"
              >
                GET /api/maps?category=political
              </Button>
            </CardContent>
          </Card>

          {/* Users Tests */}
          <Card>
            <CardHeader>
              <CardTitle>👥 Users API</CardTitle>
              <CardDescription>Test user management endpoints (Admin)</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button
                onClick={() => apiCall("/api/users", "GET", null, true)}
                disabled={loading !== null}
                variant="outline"
                className="w-full"
              >
                GET /api/users
              </Button>
              <Button
                onClick={() =>
                  apiCall(
                    "/api/users",
                    "POST",
                    {
                      email: `newuser${Date.now()}@example.com`,
                      name: "New User",
                      password: "NewPass123!",
                      role: "user",
                    },
                    true,
                  )
                }
                disabled={loading !== null}
                variant="outline"
                className="w-full"
              >
                POST /api/users
              </Button>
              <Button
                onClick={() => apiCall("/api/users?role=admin", "GET", null, true)}
                disabled={loading !== null}
                variant="outline"
                className="w-full"
              >
                GET /api/users?role=admin
              </Button>
            </CardContent>
          </Card>

          {/* Analytics Tests */}
          <Card>
            <CardHeader>
              <CardTitle>📊 Analytics API</CardTitle>
              <CardDescription>Test analytics endpoints</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button
                onClick={() => apiCall("/api/analytics", "GET", null, true)}
                disabled={loading !== null}
                variant="outline"
                className="w-full"
              >
                GET /api/analytics
              </Button>
              <Button
                onClick={() =>
                  apiCall(
                    "/api/analytics/event",
                    "POST",
                    {
                      eventType: "quiz_completed",
                      userId: "test-user-id",
                      metadata: { score: 85, timeSpent: 300 },
                    },
                    true,
                  )
                }
                disabled={loading !== null}
                variant="outline"
                className="w-full"
              >
                POST /api/analytics/event
              </Button>
            </CardContent>
          </Card>

          {/* Files Tests */}
          <Card>
            <CardHeader>
              <CardTitle>📁 Files API</CardTitle>
              <CardDescription>Test file management endpoints</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button
                onClick={() => apiCall("/api/files", "GET", null, true)}
                disabled={loading !== null}
                variant="outline"
                className="w-full"
              >
                GET /api/files
              </Button>
              <Button
                onClick={() =>
                  toast({
                    title: "File Upload",
                    description: "File upload requires form data - use a separate test",
                  })
                }
                disabled={loading !== null}
                variant="outline"
                className="w-full"
              >
                POST /api/files/upload (Form Data)
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Bulk Test Actions */}
        <Card className="mt-6">
          <CardHeader>
            <CardTitle>🚀 Bulk Tests</CardTitle>
            <CardDescription>Run multiple tests at once</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex gap-4 flex-wrap">
              <Button onClick={testAuth} disabled={loading !== null}>
                Test All Auth
              </Button>
              <Button onClick={testQuiz} disabled={loading !== null}>
                Test All Quiz
              </Button>
              <Button onClick={testMaps} disabled={loading !== null}>
                Test All Maps
              </Button>
              <Button onClick={testUsers} disabled={loading !== null}>
                Test All Users
              </Button>
              <Button onClick={testAnalytics} disabled={loading !== null}>
                Test All Analytics
              </Button>
              <Button onClick={clearResults} variant="destructive">
                Clear Results
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Results Display */}
        <Card className="mt-6">
          <CardHeader>
            <CardTitle>📋 Test Results</CardTitle>
            <CardDescription>API response results and status codes</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4 max-h-96 overflow-auto">
              {Object.keys(results).length === 0 ? (
                <p className="text-gray-500 text-center py-8">
                  No tests run yet. Click any test button above to start.
                </p>
              ) : (
                Object.entries(results).map(([key, result]: [string, any]) => (
                  <div key={key} className="border rounded-lg p-4">
                    <div className="flex justify-between items-center mb-2">
                      <h4 className="font-semibold">{key}</h4>
                      <div className="flex gap-2 text-sm">
                        <span
                          className={`px-2 py-1 rounded ${
                            result.status === 200 || result.status === 201
                              ? "bg-green-100 text-green-800"
                              : result.status === "ERROR"
                                ? "bg-red-100 text-red-800"
                                : "bg-yellow-100 text-yellow-800"
                          }`}
                        >
                          {result.status} {result.statusText}
                        </span>
                        <span className="text-gray-500">{result.timestamp}</span>
                      </div>
                    </div>
                    <pre className="bg-gray-50 p-3 rounded text-xs overflow-auto">
                      {JSON.stringify(result.data, null, 2)}
                    </pre>
                  </div>
                ))
              )}
            </div>
          </CardContent>
        </Card>

        {/* Environment Info */}
        <Card className="mt-6">
          <CardHeader>
            <CardTitle>⚙️ Configuration</CardTitle>
            <CardDescription>Current environment settings</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-2 text-sm">
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
  )
}
