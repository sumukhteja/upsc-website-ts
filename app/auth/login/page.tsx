"use client"

import React, { useState } from "react"
import { signIn } from "next-auth/react"
import { useRouter } from "next/navigation"
// import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { ArrowLeft, Eye, EyeOff, Chrome, AlertCircle, CheckCircle } from "lucide-react"
import Link from "next/link"
import Header from "../../components/header"
import Footer from "../../components/footer"

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  })
  const router = useRouter()
  // const router = useRouter()
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev: typeof formData) => ({ ...prev, [name]: value }))
    setError("")
    setSuccess("")
  }
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")
    setSuccess("")

    try {
      const result = await signIn("credentials", {
        email: formData.email,
        password: formData.password,
        redirect: false,
      })

      if (result?.error) {
        setError("Invalid credentials. Please check your email and password.")
      } else if (result?.ok) {
        setSuccess("Login successful! Redirecting...")
        // Use window.location for more reliable redirect
        window.location.href = "/dashboard"
      } else {
        setError("Login failed. Please try again.")
      }
    } catch (error) {
      console.error("Login error:", error)
      setError("An unexpected error occurred. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  const handleGoogleLogin = async () => {
    setIsLoading(true)
    setError("")

    try {
      await signIn("google", {
        callbackUrl: "/dashboard",
      })
    } catch (error) {
      console.error("Google login error:", error)
      setError("Google login failed. Please try again.")
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="border-b border-gray-200 bg-white sticky top-0 z-50">
        <Header />
      </header>

      {/* Main Content */}
      <section className="py-16 flex items-center justify-center min-h-[calc(100vh-200px)]">
        <div className="w-full max-w-lg px-4 sm:px-6 lg:px-8">
          <Card className="border-2 border-gray-200 shadow-xl">
            <CardHeader className="text-center pb-8 pt-8">
              <CardTitle className="text-3xl font-bold text-gray-900 mb-2">Welcome Back</CardTitle>
              <p className="text-gray-600 text-lg">Access your UPSC preparation dashboard</p>
            </CardHeader>
            <CardContent className="space-y-8 px-8 pb-8">
              {/* Error Message */}
              {error && (
                <div className="bg-orange-50 border border-orange-200 rounded-lg p-4 flex items-center gap-3">
                  <AlertCircle className="h-5 w-5 text-orange-600 flex-shrink-0" />
                  <span className="text-sm text-orange-700">{error}</span>
                </div>
              )}

              {/* Success Message */}
              {success && (
                <div className="bg-green-50 border border-green-200 rounded-lg p-4 flex items-center gap-3">
                  <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0" />
                  <span className="text-sm text-green-700">{success}</span>
                </div>
              )}

              {/* Google Login */}
              <Button
                onClick={handleGoogleLogin}
                disabled={isLoading}
                variant="outline"
                className="w-full border-gray-300 hover:bg-gray-50 h-12 text-base"
              >
                <Chrome className="h-5 w-5 mr-3" />
                {isLoading ? "Connecting..." : "Continue with Google"}
              </Button>

              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300" />
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-4 bg-white text-gray-500">Or continue with email</span>
                </div>
              </div>

              {/* Login Form */}
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-3">
                    Email Address
                  </label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={handleInputChange}
                    className="border-gray-300 focus:border-black focus:ring-black h-12 text-base"
                    placeholder="Enter your email"
                  />
                </div>

                <div>
                  <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-3">
                    Password
                  </label>
                  <div className="relative">
                    <Input
                      id="password"
                      name="password"
                      type={showPassword ? "text" : "password"}
                      required
                      value={formData.password}
                      onChange={handleInputChange}
                      className="border-gray-300 focus:border-black focus:ring-black pr-12 h-12 text-base"
                      placeholder="Enter your password"
                    />
                    <button
                      type="button"
                      className="absolute inset-y-0 right-0 pr-4 flex items-center"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? (
                        <EyeOff className="h-5 w-5 text-gray-400" />
                      ) : (
                        <Eye className="h-5 w-5 text-gray-400" />
                      )}
                    </button>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <input
                      id="remember-me"
                      name="remember-me"
                      type="checkbox"
                      className="h-4 w-4 text-black focus:ring-black border-gray-300 rounded"
                    />
                    <label htmlFor="remember-me" className="ml-3 block text-sm text-gray-700">
                      Remember me
                    </label>
                  </div>

                  <Link href="/auth/forgot-password" className="text-sm text-black hover:underline font-medium">
                    Forgot password?
                  </Link>
                </div>

                <Button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-black hover:bg-gray-800 text-white h-12 text-base font-medium"
                >
                  {isLoading ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-3"></div>
                      Signing in...
                    </>
                  ) : (
                    "Sign In"
                  )}
                </Button>
              </form>

              {/* Sign Up Link */}
              <div className="text-center pt-4 border-t border-gray-200">
                <p className="text-gray-600">
                  Don't have an account?{" "}
                  <Link href="/auth/signup" className="text-black hover:underline font-medium">
                    Sign up for free
                  </Link>
                </p>
              </div>

              {/* Back to Home */}
              <div className="text-center">
                <Link href="/" className="inline-flex items-center text-gray-500 hover:text-gray-700 text-sm">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to Home
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  )
}
