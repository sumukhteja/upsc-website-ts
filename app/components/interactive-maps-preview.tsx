"use client"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { MapPin, Mountain, Waves, Building, Globe, History, ArrowRight } from "lucide-react"
import Link from "next/link"

const previewTopics = [
  {
    id: "indian-states",
    title: "Indian States",
    icon: <Building className="h-5 w-5" />,
    description: "28 States & 8 UTs",
    count: "36 locations",
  },
  {
    id: "rivers",
    title: "Major Rivers",
    icon: <Waves className="h-5 w-5" />,
    description: "River systems",
    count: "25 rivers",
  },
  {
    id: "mountains",
    title: "Mountains",
    icon: <Mountain className="h-5 w-5" />,
    description: "Peaks & ranges",
    count: "15 peaks",
  },
  {
    id: "world",
    title: "World Geography",
    icon: <Globe className="h-5 w-5" />,
    description: "Global locations",
    count: "50+ countries",
  },
  {
    id: "historical",
    title: "Historical Sites",
    icon: <History className="h-5 w-5" />,
    description: "UNESCO sites",
    count: "30+ monuments",
  },
]

export default function InteractiveMapsPreview() {
  return (
    <div className="space-y-8">
      {/* Preview Cards */}
      

      {/* Sample Map Preview */}
      <Card className="border-2 border-gray-200">
        
        <CardContent>
          {/* Simplified Map Preview */}
          <div className="relative w-full h-64 bg-gradient-to-br from-blue-50 to-green-50 rounded-lg border-2 border-gray-200 overflow-hidden">
            {/* Simulated Map Background */}
            <div className="absolute inset-0 opacity-20">
              <div className="w-full h-full bg-gradient-to-br from-green-200 via-blue-200 to-yellow-200"></div>
              <div
                className="absolute inset-0"
                style={{
                  backgroundImage: `
                    linear-gradient(rgba(0,0,0,0.1) 1px, transparent 1px),
                    linear-gradient(90deg, rgba(0,0,0,0.1) 1px, transparent 1px)
                  `,
                  backgroundSize: "20px 20px",
                }}
              ></div>
            </div>

            {/* Sample Markers */}
            <div className="absolute inset-0">
              {[
                { x: 30, y: 25, name: "Delhi" },
                { x: 20, y: 45, name: "Mumbai" },
                { x: 75, y: 60, name: "Chennai" },
                { x: 80, y: 40, name: "Kolkata" },
                { x: 65, y: 70, name: "Bangalore" },
              ].map((marker, index) => (
                <div
                  key={index}
                  className="absolute transform -translate-x-1/2 -translate-y-1/2 group cursor-pointer"
                  style={{
                    left: `${marker.x}%`,
                    top: `${marker.y}%`,
                  }}
                >
                  <MapPin className="h-5 w-5 text-[#FF2D20] drop-shadow-lg group-hover:scale-125 transition-transform" />
                  <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="bg-gray-900 text-white text-xs rounded px-2 py-1 whitespace-nowrap">
                      {marker.name}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Preview Overlay */}
            <div className="absolute inset-0 bg-black/10 flex items-center justify-center">
              <Link href="/maps">
                <Button className="bg-[#FF2D20] hover:bg-red-600 text-white">Explore Interactive Maps</Button>
              </Link>
            </div>
          </div>

          <div className="mt-4 text-center text-sm text-gray-600">
            Click markers to explore detailed information about each location
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
