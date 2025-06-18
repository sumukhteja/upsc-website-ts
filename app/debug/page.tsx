"use client"

import { useSession } from "next-auth/react"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle, XCircle, RefreshCw } from "lucide-react"
import Link from "next/link"

export default function DebugPage() {
  const { data: session, status } = useSession()
  const [envCheck, setEnvCheck] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [mounted, setMounted] = useState(false)

  // Prevent hydration mismatch
  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (!mounted) return

    // Check environment variables via API route
    fetch("/api/debug/env")
      .then((res) => res.json())
      .then((data) => {
        setEnvCheck(data)
        setLoading(false)
      })
      .catch((err) => {
        console.error("Failed to check env vars:", err)
        setLoading(false)
      })
  }, [mounted])

  const handleRefresh = () => {
    setLoading(true)
    window.location.reload()
  }

  // Don't render anything until mounted to prevent hydration mismatch
  if (!mounted) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#FF2D20] mx-auto mb-2"></div>
          <div className="text-gray-500">Loading debug page...</div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">NextAuth Debug Page</h1>
          <p className="text-gray-600">Check your authentication configuration</p>
          <Button onClick={handleRefresh} variant="outline" size="sm" className="mt-2">
            <RefreshCw className="h-4 w-4 mr-2" />
            Refresh
          </Button>
        </div>

        {/* Environment Variables */}
        <Card>
          <CardHeader>
            <CardTitle>Environment Variables Status</CardTitle>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="text-center py-4">
                <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-[#FF2D20] mx-auto mb-2"></div>
                <p className="text-gray-600">Checking environment variables...</p>
              </div>
            ) : envCheck ? (
              <div className="space-y-3">
                {Object.entries(envCheck).map(([key, value]: [string, any]) => (
                  <div key={key} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <span className="font-medium">{key}:</span>
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-sm">{value.status}</span>
                      {value.exists ? (
                        <CheckCircle className="h-4 w-4 text-green-500" />
                      ) : (
                        <XCircle className="h-4 w-4 text-red-500" />
                      )}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-4 text-red-600">
                <XCircle className="h-6 w-6 mx-auto mb-2" />
                <p>Failed to check environment variables</p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* .env.local File Check */}
        <Card>
          <CardHeader>
            <CardTitle>Your .env.local File Should Contain:</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-sm overflow-x-auto">
              <div className="space-y-1">
                <div># NextAuth.js Configuration</div>
                <div>NEXTAUTH_URL=http://localhost:3000</div>
                <div>
                  NEXTAUTH_SECRET=upsc-master-nextauth-secret-key-2024-super-long-random-string-for-jwt-encryption-12345
                </div>
                <div></div>
                <div># Google OAuth Configuration</div>
                <div>GOOGLE_CLIENT_ID=1772030354-kas0qhft71t733k68ordhfltalimgbqp.apps.googleusercontent.com</div>
                <div>GOOGLE_CLIENT_SECRET=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</div>
                <div></div>
                <div># Google Maps API Key</div>
                <div>GOOGLE_MAPS_API_KEY=AIzaSyBb0cDXHqoApwmZhvFeoNfgFkq-TCM7eRU</div>
              </div>
            </div>
            <div className="mt-4 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
              <p className="text-sm text-yellow-800">
                <strong>Important:</strong> Make sure this file is in your project root (same level as package.json) and
                restart your development server after making changes.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Session Status */}
        <Card>
          <CardHeader>
            <CardTitle>Session Status</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <span className="font-medium">Status:</span>
                <span
                  className={`font-semibold ${
                    status === "authenticated"
                      ? "text-green-600"
                      : status === "loading"
                        ? "text-yellow-600"
                        : "text-red-600"
                  }`}
                >
                  {status}
                </span>
              </div>
              {session && (
                <div className="space-y-2">
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <span className="font-medium">User:</span>
                    <span>{session.user?.name || "No name"}</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <span className="font-medium">Email:</span>
                    <span>{session.user?.email || "No email"}</span>
                  </div>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Test Links */}
        <Card>
          <CardHeader>
            <CardTitle>Test Authentication</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <Link href="/auth/signin">
                <Button className="w-full bg-[#FF2D20] hover:bg-red-600">Test Sign In Page</Button>
              </Link>
              <Link href="/api/auth/providers">
                <Button variant="outline" className="w-full">
                  Check Auth Providers API
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>

        {/* Troubleshooting */}
        <Card>
          <CardHeader>
            <CardTitle>🔧 Troubleshooting Steps</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                <h4 className="font-semibold text-red-900 mb-2">If environment variables show "Not set ✗":</h4>
                <ol className="list-decimal list-inside space-y-2 text-sm text-red-800">
                  <li>Check that .env.local file exists in your project root</li>
                  <li>Verify the file contains all the variables shown above</li>
                  <li>Stop your development server (Ctrl+C)</li>
                  <li>
                    Restart with: <code className="bg-white px-1 rounded">npm run dev</code>
                  </li>
                  <li>Refresh this page</li>
                </ol>
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <h4 className="font-semibold text-blue-900 mb-2">Google Console Settings:</h4>
                <p className="text-sm text-blue-800 mb-2">Make sure your redirect URI is exactly:</p>
                <code className="text-sm bg-white p-2 rounded border block">
                  http://localhost:3000/api/auth/callback/google
                </code>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
