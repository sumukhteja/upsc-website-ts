"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { BookOpen, Clock, Star, Play } from "lucide-react"
import Header from "../components/header"
import Footer from "../components/footer"

// Sample topper data
const topperTalks = [
  {
    id: 1,
    name: "Priya Sharma",
    rank: "AIR 1, 2023",
    service: "IAS",
    image: "/placeholder.svg?height=100&width=100",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    duration: "45 mins",
    topics: ["Strategy", "Time Management", "Optional Subject"],
    description:
      "Learn from AIR 1 about her comprehensive preparation strategy, daily routine, and how she balanced prelims and mains preparation effectively.",
    keyTips: [
      "Start with NCERT books for building strong foundation",
      "Make concise notes and revise them regularly",
      "Practice answer writing from day one",
      "Stay updated with current affairs daily",
    ],
  },
  {
    id: 2,
    name: "Rajesh Kumar",
    rank: "AIR 5, 2023",
    service: "IPS",
    image: "/placeholder.svg?height=100&width=100",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    duration: "38 mins",
    topics: ["Mock Tests", "Interview Prep", "Psychology Optional"],
    description:
      "Discover how consistent mock test practice and structured interview preparation helped secure a top rank in the civil services examination.",
    keyTips: [
      "Take at least 2-3 mock tests every week",
      "Analyze your mistakes thoroughly",
      "Practice interview questions with peers",
      "Maintain calm and confidence during the exam",
    ],
  },
  {
    id: 3,
    name: "Anita Verma",
    rank: "AIR 12, 2022",
    service: "IFS",
    image: "/placeholder.svg?height=100&width=100",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    duration: "52 mins",
    topics: ["Geography Optional", "Essay Writing", "Work-Life Balance"],
    description:
      "Learn about balancing preparation with work commitments and how to excel in geography optional and essay writing.",
    keyTips: [
      "Create a realistic study schedule",
      "Focus on quality over quantity",
      "Use maps and diagrams for geography",
      "Practice essay writing regularly",
    ],
  },
]

export default function ResourcesPage() {
  const [selectedTopper, setSelectedTopper] = useState<number | null>(null)

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <Header />

      {/* Page Header */}
      <section className="py-8 bg-gray-50 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex items-center justify-center gap-3 mb-4">
              <BookOpen className="h-8 w-8 text-black" />
              <h1 className="text-3xl font-bold text-gray-900">Topper Talks</h1>
            </div>
            <p className="text-lg text-gray-600">Learn from the past achievers.</p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-8">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Learn from UPSC Toppers</h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Get insights, strategies, and motivation from successful UPSC candidates who have achieved their dreams.
              </p>
            </div>

            <div className="grid lg:grid-cols-3 gap-8">
              {topperTalks.map((topper) => (
                <Card
                  key={topper.id}
                  className="border border-gray-200 hover:border-black transition-colors cursor-pointer"
                  onClick={() => setSelectedTopper(topper.id)}
                >
                  <CardHeader>
                    <div className="flex items-center gap-4">
                      <img
                        src={topper.image || "/placeholder.svg"}
                        alt={topper.name}
                        className="w-16 h-16 rounded-full object-cover border-2 border-black"
                      />
                      <div>
                        <CardTitle className="text-lg">{topper.name}</CardTitle>
                        <div className="flex items-center gap-2 mt-1">
                          <Badge variant="secondary" className="bg-black text-white">
                            {topper.rank}
                          </Badge>
                          <Badge variant="outline">{topper.service}</Badge>
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-gray-600 text-sm">{topper.description}</p>

                    <div className="flex items-center gap-4 text-sm text-gray-500">
                      <div className="flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        {topper.duration}
                      </div>
                      <div className="flex items-center gap-1">
                        <Play className="h-4 w-4" />
                        Video
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      {topper.topics.map((topic, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {topic}
                        </Badge>
                      ))}
                    </div>

                    <Button className="w-full bg-black hover:bg-gray-800 text-white">
                      <Play className="h-4 w-4 mr-2" />
                      Watch Interview
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Selected Topper Detail */}
            {selectedTopper && (
              <Card className="border-2 border-black">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-2xl">
                      {topperTalks.find((t) => t.id === selectedTopper)?.name} - Success Strategy
                    </CardTitle>
                    <Button variant="outline" onClick={() => setSelectedTopper(null)}>
                      Close
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="aspect-video bg-gray-100 rounded-lg overflow-hidden">
                    <iframe
                      width="100%"
                      height="100%"
                      src={topperTalks.find((t) => t.id === selectedTopper)?.videoUrl}
                      title="Topper Interview"
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    ></iframe>
                  </div>

                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-4">Key Success Tips</h3>
                    <ul className="space-y-2">
                      {topperTalks
                        .find((t) => t.id === selectedTopper)
                        ?.keyTips.map((tip, index) => (
                          <li key={index} className="flex items-start gap-3">
                            <Star className="h-5 w-5 text-black mt-0.5 flex-shrink-0" />
                            <span className="text-gray-700">{tip}</span>
                          </li>
                        ))}
                    </ul>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  )
}
