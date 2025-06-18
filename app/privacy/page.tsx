"use client"
import { Shield } from "lucide-react"
import Link from "next/link"
import Header from "../components/header"
import Footer from "../components/footer"

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <Header />

      {/* Page Header */}
      <section className="py-8 bg-gray-50 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex items-center justify-center gap-3 mb-4">
              <Shield className="h-10 w-10 text-black" />
              <h1 className="text-4xl lg:text-5xl font-bold text-gray-900">
                Privacy <span className="text-black">Policy</span>
              </h1>
            </div>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Your privacy is important to us. Learn how we protect your personal information
            </p>
            <p className="text-sm text-gray-500 mt-2">Last updated: January 15, 2024</p>
          </div>
        </div>
      </section>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="prose prose-lg max-w-none">
          <div className="bg-gray-50 rounded-lg p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Information We Collect</h2>
            <p className="text-gray-600 mb-4">
              We collect information you provide directly to us, such as when you create an account, take quizzes, or
              contact us for support.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mb-4 mt-8">How We Use Your Information</h2>
            <p className="text-gray-600 mb-4">
              We use your information to provide and improve our UPSC preparation services, track your progress, and
              provide customer support.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mb-4 mt-8">Data Security</h2>
            <p className="text-gray-600 mb-4">
              We implement appropriate security measures to protect your personal information against unauthorized
              access, alteration, disclosure, or destruction.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mb-4 mt-8">Contact Us</h2>
            <p className="text-gray-600">
              If you have questions about this Privacy Policy, please contact us at{" "}
              <Link href="/contact" className="text-black hover:underline">
                our contact page
              </Link>{" "}
              or email privacy@upscmaster.com
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}
