"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ExternalLink, Copy, CheckCircle, ArrowRight } from "lucide-react"
import { useState } from "react"
import Link from "next/link"

export default function SetupGuidePage() {
  const [copiedStep, setCopiedStep] = useState<number | null>(null)

  const copyToClipboard = (text: string, step: number) => {
    navigator.clipboard.writeText(text)
    setCopiedStep(step)
    setTimeout(() => setCopiedStep(null), 2000)
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Google OAuth Setup Guide</h1>
          <p className="text-gray-600">Follow these steps to set up Google authentication</p>
        </div>

        {/* Step 1 */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <div className="w-8 h-8 bg-[#FF2D20] text-white rounded-full flex items-center justify-center font-bold">
                1
              </div>
              Go to Google Cloud Console
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="mb-4">Open the Google Cloud Console and sign in with your Google account.</p>
            <a
              href="https://console.cloud.google.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
            >
              <ExternalLink className="h-4 w-4" />
              Open Google Cloud Console
            </a>
          </CardContent>
        </Card>

        {/* Step 2 */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <div className="w-8 h-8 bg-[#FF2D20] text-white rounded-full flex items-center justify-center font-bold">
                2
              </div>
              Create or Select Project
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="mb-4">Create a new project or select an existing one from the dropdown at the top.</p>
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
              <p className="text-sm text-blue-700">💡 Tip: Name your project something like "UPSC Master App"</p>
            </div>
          </CardContent>
        </Card>

        {/* Step 3 */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <div className="w-8 h-8 bg-[#FF2D20] text-white rounded-full flex items-center justify-center font-bold">
                3
              </div>
              Enable Google+ API
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="mb-4">Navigate to APIs & Services → Library and enable the Google+ API.</p>
            <a
              href="https://console.cloud.google.com/apis/library/plus.googleapis.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
            >
              <ExternalLink className="h-4 w-4" />
              Enable Google+ API
            </a>
          </CardContent>
        </Card>

        {/* Step 4 */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <div className="w-8 h-8 bg-[#FF2D20] text-white rounded-full flex items-center justify-center font-bold">
                4
              </div>
              Configure OAuth Consent Screen
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <p>Go to APIs & Services → OAuth consent screen and configure:</p>
              <div className="bg-gray-50 rounded-lg p-4 space-y-2">
                <div>
                  <strong>User Type:</strong> External
                </div>
                <div>
                  <strong>App name:</strong> UPSC Master
                </div>
                <div>
                  <strong>User support email:</strong> Your email
                </div>
                <div>
                  <strong>Developer contact:</strong> Your email
                </div>
              </div>
              <a
                href="https://console.cloud.google.com/apis/credentials/consent"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
              >
                <ExternalLink className="h-4 w-4" />
                Configure Consent Screen
              </a>
            </div>
          </CardContent>
        </Card>

        {/* Step 5 */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <div className="w-8 h-8 bg-[#FF2D20] text-white rounded-full flex items-center justify-center font-bold">
                5
              </div>
              Create OAuth Credentials
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <p>Go to APIs & Services → Credentials → Create Credentials → OAuth client ID</p>

              <div className="bg-gray-50 rounded-lg p-4 space-y-3">
                <div>
                  <strong>Application type:</strong> Web application
                </div>
                <div>
                  <strong>Name:</strong> UPSC Master Web Client
                </div>

                <div>
                  <strong>Authorized JavaScript origins:</strong>
                  <div className="flex items-center gap-2 mt-1">
                    <code className="bg-white px-2 py-1 rounded border text-sm">http://localhost:3000</code>
                    <Button variant="outline" size="sm" onClick={() => copyToClipboard("http://localhost:3000", 1)}>
                      {copiedStep === 1 ? <CheckCircle className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                    </Button>
                  </div>
                </div>

                <div>
                  <strong>Authorized redirect URIs:</strong>
                  <div className="flex items-center gap-2 mt-1">
                    <code className="bg-white px-2 py-1 rounded border text-sm">
                      http://localhost:3000/api/auth/callback/google
                    </code>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => copyToClipboard("http://localhost:3000/api/auth/callback/google", 2)}
                    >
                      {copiedStep === 2 ? <CheckCircle className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                    </Button>
                  </div>
                </div>
              </div>

              <a
                href="https://console.cloud.google.com/apis/credentials"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
              >
                <ExternalLink className="h-4 w-4" />
                Create OAuth Credentials
              </a>
            </div>
          </CardContent>
        </Card>

        {/* Step 6 */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <div className="w-8 h-8 bg-[#FF2D20] text-white rounded-full flex items-center justify-center font-bold">
                6
              </div>
              Copy Your Credentials
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <p>After creating the OAuth client, copy your Client ID and Client Secret.</p>

              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <p className="text-sm text-yellow-800">
                  <strong>Important:</strong> Replace the credentials in your .env.local file with your own Client ID
                  and Client Secret.
                </p>
              </div>

              <div className="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-sm">
                <div>GOOGLE_CLIENT_ID=your-actual-client-id-here</div>
                <div>GOOGLE_CLIENT_SECRET=your-actual-client-secret-here</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Test */}
        <Card className="border-2 border-green-200 bg-green-50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-green-800">
              <CheckCircle className="h-6 w-6" />
              Test Your Setup
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-green-700 mb-4">Once you've completed all steps, test your Google authentication:</p>
            <div className="flex gap-4">
              <Link href="/auth/signin">
                <Button className="bg-[#FF2D20] hover:bg-red-600">
                  <ArrowRight className="h-4 w-4 mr-2" />
                  Test Google Sign In
                </Button>
              </Link>
              <Link href="/debug">
                <Button variant="outline">Check Debug Page</Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
