"use client"
import { Map } from "lucide-react"
import InteractiveMaps from "../components/interactive-maps"
import Header from "../components/header"
import Footer from "../components/footer"

export default function MapsPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <Header />

      {/* Page Header */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex items-center justify-center gap-3 mb-4">
              <Map className="h-8 w-8 text-[#FF2D20]" />
              <h1 className="text-3xl font-bold text-gray-900">
                Interactive <span className="text-[#FF2D20]">Maps</span>
              </h1>
            </div>
            <p className="text-lg text-gray-600">Master geographical locations with interactive visual learning</p>
          </div>
        </div>
      </section>

      {/* Maps Content */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <InteractiveMaps />
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  )
}
