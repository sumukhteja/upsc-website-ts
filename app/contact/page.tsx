"use client"

import { Button } from "@/components/ui/button"
import { Mail, Phone, MapPin } from "lucide-react"
import Link from "next/link"
import Header from "../components/header"
import Footer from "../components/footer"

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <Header />

      {/* Page Header */}
      <section className="py-8 bg-gray-50 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex items-center justify-center gap-3 mb-4">
              <Mail className="h-10 w-10 text-black" />
              <h1 className="text-4xl lg:text-5xl font-bold text-gray-900">
                Contact <span className="text-black">Us</span>
              </h1>
            </div>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Have questions or need support? We're here to help you succeed in your UPSC journey
            </p>
          </div>
        </div>
      </section>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-3 gap-8">
          <div className="text-center p-6 bg-gray-50 rounded-lg">
            <Mail className="h-8 w-8 text-black mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Email Support</h3>
            <p className="text-gray-600 mb-2">Get help via email</p>
            <p className="text-black font-semibold">support@upscmaster.com</p>
          </div>

          <div className="text-center p-6 bg-gray-50 rounded-lg">
            <Phone className="h-8 w-8 text-black mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Phone Support</h3>
            <p className="text-gray-600 mb-2">Speak with our experts</p>
            <p className="text-black font-semibold">+91-XXXX-XXXXXX</p>
          </div>

          <div className="text-center p-6 bg-gray-50 rounded-lg">
            <MapPin className="h-8 w-8 text-black mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Visit Us</h3>
            <p className="text-gray-600 mb-2">Our office location</p>
            <p className="text-black font-semibold">New Delhi, India</p>
          </div>
        </div>

        <div className="mt-12 text-center">
          <div className="bg-red-50 border border-red-200 rounded-lg p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-2">Need Immediate Help?</h3>
            <p className="text-gray-600 mb-4">Check out our Help Center for quick answers to common questions.</p>
            <Link href="/help">
              <Button className="bg-black hover:bg-gray-800 text-white">Visit Help Center</Button>
            </Link>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}
