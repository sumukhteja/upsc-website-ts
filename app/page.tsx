"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { BookOpen, Users, Target, Map, Globe } from "lucide-react"
import Link from "next/link"
import InteractiveMapsPreview from "./components/interactive-maps-preview"
import Header from "./components/header"
import Footer from "./components/footer"

export default function UPSCWebsite() {
  const [searchQuery, setSearchQuery] = useState("")

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <Header />

      {/* Hero Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="border-l-4 border-black pl-6 mb-8 inline-block text-left">
              <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 leading-tight mb-6">
                Prepare and excel with
                <br />
                <span className="text-black">tools crafted for acing UPSC</span>
              </h1>
            </div>

            <p className="text-xl text-gray-600 mb-8 leading-relaxed max-w-4xl mx-auto">
              UPSC Master provides a complete ecosystem for civil services aspirants. Our comprehensive study materials,
              interactive Google Maps, mock tests, and expert guidance offer everything you need to prepare, practice,
              and succeed in UPSC examinations.
            </p>

            <div className="relative max-w-4xl mx-auto">
              <div className="bg-white rounded-2xl overflow-hidden shadow-2xl border border-gray-200">
                <div className="aspect-video">
                  <img
                    src="/images/rickroll-upsc.gif"
                    alt="UPSC Master Platform Features"
                    className="w-full h-full object-cover rounded-2xl"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Maps Preview */}
      <section id="maps-preview" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="flex items-center justify-center gap-3 mb-4">
              <Map className="h-8 w-8 text-black" />
              <h2 className="text-4xl font-bold text-gray-900">
                Interactive <span className="text-black">Geography Maps</span>
              </h2>
            </div>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
              Explore comprehensive geographical knowledge through Google Maps integration. Perfect for UPSC Geography
              preparation.
            </p>
            <Link href="/maps"></Link>
          </div>

          <InteractiveMapsPreview />
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Everything you need for <span className="text-black">UPSC success</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              From comprehensive study materials to personalized mentorship, we provide all the tools and resources
              needed for your civil services journey.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Link href="/quiz" className="group">
              <div className="bg-white rounded-lg p-8 shadow-sm border border-gray-200 hover:shadow-md transition-all group-hover:border-black">
                <div className="bg-black w-12 h-12 rounded-lg flex items-center justify-center mb-6">
                  <Target className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Practice Quiz</h3>
                <p className="text-gray-600">
                  Test your knowledge with timed quizzes covering all UPSC subjects. Track your progress and identify
                  areas for improvement.
                </p>
              </div>
            </Link>

            <Link href="/maps" className="group">
              <div className="bg-white rounded-lg p-8 shadow-sm border border-gray-200 hover:shadow-md transition-all group-hover:border-black">
                <div className="bg-black w-12 h-12 rounded-lg flex items-center justify-center mb-6">
                  <Globe className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Interactive Maps</h3>
                <p className="text-gray-600">
                  Explore India and world geography through Google Maps with detailed information essential for UPSC
                  preparation.
                </p>
              </div>
            </Link>

            <Link href="/resources" className="group">
              <div className="bg-white rounded-lg p-8 shadow-sm border border-gray-200 hover:shadow-md transition-all group-hover:border-black">
                <div className="bg-black w-12 h-12 rounded-lg flex items-center justify-center mb-6">
                  <BookOpen className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Resources</h3>
                <p className="text-gray-600">
                  Complete syllabus, topper talks, study materials, and expert guidance from successful UPSC candidates.
                </p>
              </div>
            </Link>

            <Link href="/community" className="group">
              <div className="bg-white rounded-lg p-8 shadow-sm border border-gray-200 hover:shadow-md transition-all group-hover:border-black">
                <div className="bg-black w-12 h-12 rounded-lg flex items-center justify-center mb-6">
                  <Users className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Community</h3>
                <p className="text-gray-600">
                  Daily answer writing practice, essay writing, and connect with fellow UPSC aspirants for peer
                  learning.
                </p>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-black mb-2">500+</div>
              <div className="text-gray-600 font-medium">Successful Candidates</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-black mb-2">10K+</div>
              <div className="text-gray-600 font-medium">Active Students</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-black mb-2">95%</div>
              <div className="text-gray-600 font-medium">Success Rate</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-black mb-2">24/7</div>
              <div className="text-gray-600 font-medium">Support Available</div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Simple, <span className="text-black">transparent pricing</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Choose the plan that works best for your UPSC preparation journey. All plans include full access to our
              comprehensive study materials.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* Monthly Plan */}
            <div className="bg-white rounded-2xl border-2 border-gray-200 p-8 hover:border-black transition-all duration-300 hover:shadow-lg">
              <div className="text-center">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Monthly Plan</h3>
                <div className="mb-6">
                  <span className="text-5xl font-bold text-black">₹200</span>
                  <span className="text-gray-600 ml-2">/month</span>
                </div>
                <ul className="text-left space-y-4 mb-8">
                  <li className="flex items-center">
                    <div className="w-5 h-5 bg-black rounded-full flex items-center justify-center mr-3">
                      <span className="text-white text-sm">✓</span>
                    </div>
                    <span className="text-gray-700">Unlimited Practice Quizzes</span>
                  </li>
                  <li className="flex items-center">
                    <div className="w-5 h-5 bg-black rounded-full flex items-center justify-center mr-3">
                      <span className="text-white text-sm">✓</span>
                    </div>
                    <span className="text-gray-700">Interactive Geography Maps</span>
                  </li>
                  <li className="flex items-center">
                    <div className="w-5 h-5 bg-black rounded-full flex items-center justify-center mr-3">
                      <span className="text-white text-sm">✓</span>
                    </div>
                    <span className="text-gray-700">Complete Study Resources</span>
                  </li>
                  <li className="flex items-center">
                    <div className="w-5 h-5 bg-black rounded-full flex items-center justify-center mr-3">
                      <span className="text-white text-sm">✓</span>
                    </div>
                    <span className="text-gray-700">Community Access</span>
                  </li>
                  <li className="flex items-center">
                    <div className="w-5 h-5 bg-black rounded-full flex items-center justify-center mr-3">
                      <span className="text-white text-sm">✓</span>
                    </div>
                    <span className="text-gray-700">Progress Tracking</span>
                  </li>
                </ul>
                <Link href="/pricing?plan=monthly">
                  <Button className="w-full bg-gray-900 hover:bg-gray-800 text-white py-3 text-lg">
                    Start Monthly Plan
                  </Button>
                </Link>
              </div>
            </div>

            {/* Yearly Plan */}
            <div className="bg-gradient-to-br from-black to-gray-800 rounded-2xl p-8 text-white relative overflow-hidden hover:shadow-2xl transition-all duration-300">
              <div className="absolute top-4 right-4 bg-white text-black px-3 py-1 rounded-full text-sm font-semibold">
                Save 67%
              </div>
              <div className="text-center">
                <h3 className="text-2xl font-bold mb-2">Yearly Plan</h3>
                <div className="mb-6">
                  <span className="text-5xl font-bold">₹800</span>
                  <span className="text-gray-100 ml-2">/year</span>
                  <div className="text-sm text-gray-100 mt-1">
                    <span className="line-through">₹2,400</span> - You save ₹1,600
                  </div>
                </div>
                <ul className="text-left space-y-4 mb-8">
                  <li className="flex items-center">
                    <div className="w-5 h-5 bg-white bg-opacity-20 rounded-full flex items-center justify-center mr-3">
                      <span className="text-white text-sm">✓</span>
                    </div>
                    <span>Unlimited Practice Quizzes</span>
                  </li>
                  <li className="flex items-center">
                    <div className="w-5 h-5 bg-white bg-opacity-20 rounded-full flex items-center justify-center mr-3">
                      <span className="text-white text-sm">✓</span>
                    </div>
                    <span>Interactive Geography Maps</span>
                  </li>
                  <li className="flex items-center">
                    <div className="w-5 h-5 bg-white bg-opacity-20 rounded-full flex items-center justify-center mr-3">
                      <span className="text-white text-sm">✓</span>
                    </div>
                    <span>Complete Study Resources</span>
                  </li>
                  <li className="flex items-center">
                    <div className="w-5 h-5 bg-white bg-opacity-20 rounded-full flex items-center justify-center mr-3">
                      <span className="text-white text-sm">✓</span>
                    </div>
                    <span>Community Access</span>
                  </li>
                  <li className="flex items-center">
                    <div className="w-5 h-5 bg-white bg-opacity-20 rounded-full flex items-center justify-center mr-3">
                      <span className="text-white text-sm">✓</span>
                    </div>
                    <span>Progress Tracking</span>
                  </li>
                  <li className="flex items-center">
                    <div className="w-5 h-5 bg-white bg-opacity-20 rounded-full flex items-center justify-center mr-3">
                      <span className="text-white text-sm">✓</span>
                    </div>
                    <span className="font-semibold">Priority Support</span>
                  </li>
                </ul>
                <Link href="/pricing?plan=yearly">
                  <Button className="w-full bg-white text-black hover:bg-gray-100 py-3 text-lg font-semibold">
                    Start Yearly Plan
                  </Button>
                </Link>
              </div>
            </div>
          </div>

          <div className="text-center mt-12">
            <p className="text-gray-600 mb-4">🔒 Secure payment • 💰 30-day money-back guarantee • 📞 24/7 support</p>
            <p className="text-sm text-gray-500">Cancel anytime with no hidden fees.</p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  )
}
