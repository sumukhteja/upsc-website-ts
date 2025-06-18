"use client"

import { useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { AlertCircle, RefreshCw, Home } from "lucide-react"
import Link from "next/link"

export default function AuthErrorPage() {
  const searchParams = useSearchParams()
  const error = searchParams.get("error")

  const getErrorMessage = (error: string | null) => {
    switch (error) {
      case "invalid_credentials":
        return "Invalid email or password. Please check your credentials and try again."
      case "user_not_found":
        return "No account found with this email address."
      case "user_not_confirmed":
        return "Please check your email and confirm your account before signing in."
      case "password_reset_required":
        return "Password reset is required. Please check your email for instructions."
      case "user_disabled":
        return "Your account has been disabled. Please contact support."
      case "too_many_attempts":
        return "Too many failed attempts. Please try again later."
      case "network_error":
        return "Network error. Please check your connection and try again."
      case "signup_failed":
        return "Failed to create account. Please try again."
      case "verification_failed":
        return "Email verification failed. Please try again."
      case "token_expired":
        return "Your session has expired. Please sign in again."
      default:
        return "An error occurred during authentication. Please try again."
    }
  }

  const getErrorTitle = (error: string | null) => {
    switch (error) {
      case "invalid_credentials":
      case "user_not_found":
        return "Sign In Failed"
      case "user_not_confirmed":
        return "Account Not Verified"
      case "signup_failed":
        return "Sign Up Failed"
      case "verification_failed":
        return "Verification Failed"
      case "token_expired":
        return "Session Expired"
      default:
        return "Authentication Error"
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-6">
        <div className="text-center space-y-2">
          <Link href="/" className="inline-block">
            <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              UPSC Master
            </h1>
          </Link>
        </div>

        <Card className="shadow-xl border-0 bg-white/80 backdrop-blur-sm">
          <CardHeader className="text-center">
            <div className="mx-auto w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mb-4">
              <AlertCircle className="w-6 h-6 text-red-600" />
            </div>
            <CardTitle className="text-xl text-gray-800">{getErrorTitle(error)}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="text-center">
              <p className="text-gray-600 mb-4">{getErrorMessage(error)}</p>

              {error === "user_not_confirmed" && (
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mb-4">
                  <p className="text-sm text-blue-700">
                    Check your email inbox (including spam folder) for a verification link from AWS Cognito.
                  </p>
                </div>
              )}

              {error === "too_many_attempts" && (
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 mb-4">
                  <p className="text-sm text-yellow-700">
                    Please wait a few minutes before trying again, or reset your password if you've forgotten it.
                  </p>
                </div>
              )}
            </div>

            <div className="space-y-3">
              {error === "user_not_confirmed" ? (
                <Link href="/auth/signup">
                  <Button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                    <RefreshCw className="w-4 h-4 mr-2" />
                    Resend Verification
                  </Button>
                </Link>
              ) : (
                <Link href="/auth/signin">
                  <Button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                    <RefreshCw className="w-4 h-4 mr-2" />
                    Try Again
                  </Button>
                </Link>
              )}

              <Link href="/">
                <Button variant="outline" className="w-full border-gray-300 hover:bg-gray-50">
                  <Home className="w-4 h-4 mr-2" />
                  Back to Home
                </Button>
              </Link>
            </div>

            <div className="text-center pt-4 border-t border-gray-200">
              <p className="text-sm text-gray-600">
                Need help?{" "}
                <Link href="/contact" className="text-blue-600 hover:underline font-medium">
                  Contact Support
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
