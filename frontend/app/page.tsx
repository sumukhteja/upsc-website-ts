import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { BookOpen, Map, PenTool, BarChart3, Users, Award } from "lucide-react"

export default function HomePage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-[#FF2D20] to-[#FF6B4A] text-white py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">Master Your UPSC Journey</h1>
            <p className="text-xl md:text-2xl mb-8 opacity-90">
              Complete preparation platform with interactive quizzes, maps, and answer writing practice
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" variant="secondary" className="text-[#FF2D20]">
                <Link href="/auth/signup">Start Learning Free</Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="text-white border-white hover:bg-white hover:text-[#FF2D20]"
              >
                <Link href="/test-api">Test Platform</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Everything You Need for UPSC Success</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Comprehensive tools and resources designed for serious UPSC aspirants
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="mx-auto w-12 h-12 bg-[#FF2D20] rounded-lg flex items-center justify-center mb-4">
                  <BookOpen className="h-6 w-6 text-white" />
                </div>
                <CardTitle className="text-2xl text-[#FF2D20]">Interactive Quizzes</CardTitle>
                <CardDescription>Practice with thousands of questions across all UPSC subjects</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">
                  Test your knowledge with our comprehensive question bank covering Prelims and Mains syllabus.
                </p>
                <Button asChild className="w-full">
                  <Link href="/quiz">Start Quiz</Link>
                </Button>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="mx-auto w-12 h-12 bg-[#FF2D20] rounded-lg flex items-center justify-center mb-4">
                  <Map className="h-6 w-6 text-white" />
                </div>
                <CardTitle className="text-2xl text-[#FF2D20]">Interactive Maps</CardTitle>
                <CardDescription>Master geography with our interactive mapping tools</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">
                  Learn Indian and world geography through interactive maps and location-based quizzes.
                </p>
                <Button asChild className="w-full">
                  <Link href="/maps">Explore Maps</Link>
                </Button>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="mx-auto w-12 h-12 bg-[#FF2D20] rounded-lg flex items-center justify-center mb-4">
                  <PenTool className="h-6 w-6 text-white" />
                </div>
                <CardTitle className="text-2xl text-[#FF2D20]">Answer Writing</CardTitle>
                <CardDescription>Perfect your answer writing skills for Mains</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">Practice answer writing with AI-powered feedback and evaluation.</p>
                <Button asChild className="w-full">
                  <Link href="/answer-writing">Practice Writing</Link>
                </Button>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="mx-auto w-12 h-12 bg-[#FF2D20] rounded-lg flex items-center justify-center mb-4">
                  <BarChart3 className="h-6 w-6 text-white" />
                </div>
                <CardTitle className="text-2xl text-[#FF2D20]">Performance Analytics</CardTitle>
                <CardDescription>Track your progress with detailed analytics</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">
                  Monitor your performance, identify weak areas, and track improvement over time.
                </p>
                <Button asChild className="w-full">
                  <Link href="/analytics">View Analytics</Link>
                </Button>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="mx-auto w-12 h-12 bg-[#FF2D20] rounded-lg flex items-center justify-center mb-4">
                  <Users className="h-6 w-6 text-white" />
                </div>
                <CardTitle className="text-2xl text-[#FF2D20]">Study Groups</CardTitle>
                <CardDescription>Connect with fellow UPSC aspirants</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">
                  Join study groups, participate in discussions, and learn from peers.
                </p>
                <Button asChild className="w-full">
                  <Link href="/groups">Join Groups</Link>
                </Button>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="mx-auto w-12 h-12 bg-[#FF2D20] rounded-lg flex items-center justify-center mb-4">
                  <Award className="h-6 w-6 text-white" />
                </div>
                <CardTitle className="text-2xl text-[#FF2D20]">Mock Tests</CardTitle>
                <CardDescription>Full-length mock tests with detailed analysis</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">
                  Take full-length mock tests that simulate the actual UPSC exam experience.
                </p>
                <Button asChild className="w-full">
                  <Link href="/mock-tests">Take Mock Test</Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-[#FF2D20] mb-2">10,000+</div>
              <div className="text-gray-600">Practice Questions</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-[#FF2D20] mb-2">5,000+</div>
              <div className="text-gray-600">Active Students</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-[#FF2D20] mb-2">500+</div>
              <div className="text-gray-600">Success Stories</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-[#FF2D20] mb-2">95%</div>
              <div className="text-gray-600">Success Rate</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-gray-900 to-gray-800 text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Start Your UPSC Journey?</h2>
          <p className="text-xl mb-8 opacity-90">Join thousands of successful UPSC aspirants who trust our platform</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="bg-[#FF2D20] hover:bg-[#E02617]">
              <Link href="/auth/signup">Get Started Free</Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="text-white border-white hover:bg-white hover:text-gray-900"
            >
              <Link href="/test-api">Test Our API</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
