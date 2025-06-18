"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { signIn, getSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { ArrowLeft, Eye, EyeOff, Mail, Lock, AlertCircle, CheckCircle, Chrome } from "lucide-react"
import Link from "next/link"
import Header from "../../components/header"
import Footer from "../../components/footer"

export default function SignUpPage() {
  const [formData, setFormData] = useState<{
    email: string
    password: string
    confirmPassword: string
  }>({
    email: "",
    password: "",
    confirmPassword: "",
  })
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [agreeToTerms, setAgreeToTerms] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")
  const router = useRouter()

  useEffect(() => {
    // Check if user is already signed in
    const checkSession = async () => {
      const session = await getSession()
      if (session) {
        router.push("/dashboard")
      }
    }
    checkSession()
  }, [router])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    setError("")
  }

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")
    setSuccess("")

    // Validation
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords don't match")
      setIsLoading(false)
      return
    }

    if (formData.password.length < 6) {
      setError("Password must be at least 6 characters")
      setIsLoading(false)
      return
    }

    if (!agreeToTerms) {
      setError("Please agree to the terms and conditions")
      setIsLoading(false)
      return
    }

    try {
      // Simulate account creation
      await new Promise((resolve) => setTimeout(resolve, 2000))

      setSuccess("Account created successfully! You can now sign in.")

      // Redirect to sign in page after 2 seconds
      setTimeout(() => {
        router.push("/auth/login")
      }, 2000)
    } catch (error) {
      setError("Failed to create account. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  const handleGoogleSignUp = async () => {
    setIsLoading(true)
    setError("")

    try {
      await signIn("google", {
        callbackUrl: "/dashboard",
      })
    } catch (error) {
      setError("Google sign up failed. Please try again.")
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
              <CardTitle className="text-3xl font-bold text-gray-900 mb-2">Create Account</CardTitle>
              <p className="text-gray-600 text-lg">Start your UPSC preparation journey</p>
            </CardHeader>
            <CardContent className="space-y-8 px-8 pb-8">
              {/* Error/Success Messages */}
              {error && (
                <div className="bg-orange-50 border border-orange-200 rounded-lg p-4 flex items-center gap-3">
                  <AlertCircle className="h-5 w-5 text-orange-600" />
                  <span className="text-sm text-orange-700">{error}</span>
                </div>
              )}

              {success && (
                <div className="bg-green-50 border border-green-200 rounded-lg p-4 flex items-center gap-3">
                  <CheckCircle className="h-5 w-5 text-green-600" />
                  <span className="text-sm text-green-700">{success}</span>
                </div>
              )}

              {/* Google Sign Up */}
              <Button
                onClick={handleGoogleSignUp}
                disabled={isLoading}
                variant="outline"
                className="w-full border-gray-300 hover:bg-gray-50 h-12 text-base"
              >
                <Chrome className="h-5 w-5 mr-3" />
                Continue with Google
              </Button>

              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300" />
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-4 bg-white text-gray-500">Or continue with email</span>
                </div>
              </div>

              {/* Sign Up Form */}
              <form onSubmit={handleSignUp} className="space-y-6">
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-3">
                    Email Address
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="Enter your email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="pl-12 border-gray-300 focus:border-black focus:ring-black h-12 text-base"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-3">
                    Password
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <Input
                      id="password"
                      name="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Create a password"
                      value={formData.password}
                      onChange={handleInputChange}
                      className="pl-12 pr-12 border-gray-300 focus:border-black focus:ring-black h-12 text-base"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                      {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                    </button>
                  </div>
                </div>

                <div>
                  <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-3">
                    Confirm Password
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <Input
                      id="confirmPassword"
                      name="confirmPassword"
                      type={showConfirmPassword ? "text" : "password"}
                      placeholder="Confirm your password"
                      value={formData.confirmPassword}
                      onChange={handleInputChange}
                      className="pl-12 pr-12 border-gray-300 focus:border-black focus:ring-black h-12 text-base"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                      {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                    </button>
                  </div>
                </div>

                    onCheckedChange={(checked: boolean | "indeterminate") => setAgreeToTerms(!!checked)}
                  <Checkbox
                    id="terms"
                    checked={agreeToTerms}
                    onCheckedChange={(checked) => setAgreeToTerms(checked as boolean)}
                    className="mt-1"
                  />
                  <label htmlFor="terms" className="text-sm text-gray-700 leading-relaxed">
                    I agree to the{" "}
                    <Link href="/privacy" className="text-black hover:underline font-medium">
                      Terms of Service
                    </Link>{" "}
                    and{" "}
                    <Link href="/privacy" className="text-black hover:underline font-medium">
                      Privacy Policy
                    </Link>
                  </label>
                </div>

                <Button
                  type="submit"
                  disabled={isLoading || !agreeToTerms}
                  className="w-full bg-black hover:bg-gray-800 text-white h-12 text-base font-medium"
                >
                  {isLoading ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-3" />
                      Creating account...
                    </>
                  ) : (
                    "Create Account"
                  )}
                </Button>
              </form>

              {/* Sign In Link */}
              <div className="text-center pt-4 border-t border-gray-200">
                <p className="text-gray-600">
                  Already have an account?{" "}
                  <Link href="/auth/login" className="text-black hover:underline font-medium">
                    Sign in
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
