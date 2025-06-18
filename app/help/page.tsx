"use client"
import { HelpCircle } from "lucide-react"
import Link from "next/link"
import Header from "../components/header"
import Footer from "../components/footer"

export default function HelpPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <Header />

      {/* Page Header */}
      <section className="py-8 bg-gray-50 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex items-center justify-center gap-3 mb-4">
              <HelpCircle className="h-10 w-10 text-black" />
              <h1 className="text-4xl lg:text-5xl font-bold text-gray-900">
                Help <span className="text-black">Center</span>
              </h1>
            </div>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Get answers to your questions and learn how to use UPSC Master effectively
            </p>
          </div>
        </div>
      </section>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-gray-50 rounded-lg p-8 text-left">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h2>

          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">How do I start using UPSC Master?</h3>
              <p className="text-gray-600">
                Begin with our Practice Quiz to assess your knowledge, then explore Interactive Maps for geography
                preparation.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Are the materials free?</h3>
              <p className="text-gray-600">
                Yes! All our core features including quizzes, maps, and study materials are completely free.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">How can I contact support?</h3>
              <p className="text-gray-600">
                Visit our{" "}
                <Link href="/contact" className="text-black hover:underline">
                  Contact Us
                </Link>{" "}
                page or email us at support@upscmaster.com
              </p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}
