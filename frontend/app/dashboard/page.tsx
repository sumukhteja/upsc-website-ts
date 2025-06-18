"use client"

import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { User, BookOpen, Target, Trophy, Clock, Map, LogOut, Settings, Brain, FileText, Play } from "lucide-react"
import Link from "next/link"
import { useAuth } from "../providers/auth-provider"

// Mock data for demonstration
const mockUserStats = {
  totalQuizzes: 47,
  averageScore: 78,
  studyHours: 156,
  currentStreak: 12,
  totalAnswers: 234,
  correctAnswers: 182,
  weeklyGoal: 5,
  weeklyCompleted: 3,
  rank: 156,
  totalUsers: 2847,
  badges: [
    { name: "Quiz Master", icon: "🏆", description: "Completed 50+ quizzes", earned: false, progress: 94 },
    { name: "Geography Expert", icon: "🗺️", description: "Perfect score in geography", earned: true },
    { name: "Consistent Learner", icon: "🔥", description: "7-day study streak", earned: true },
    { name: "Answer Writer", icon: "✍️", description: "Submitted 100+ answers", earned: false, progress: 67 },
  ],
  recentActivity: [
    { type: "quiz", subject: "History", score: 85, date: "2 hours ago" },
    { type: "answer", subject: "Polity", score: 12, maxScore: 15, date: "1 day ago" },
    { type: "quiz", subject: "Geography", score: 92, date: "2 days ago" },
    { type: "essay", subject: "Ethics", score: 118, maxScore: 150, date: "3 days ago" },
  ],
  subjectProgress: [
    { subject: "History", completed: 85, total: 120, percentage: 71 },
    { subject: "Geography", completed: 92, total: 100, percentage: 92 },
    { subject: "Polity", completed: 67, total: 110, percentage: 61 },
    { subject: "Economics", completed: 45, total: 90, percentage: 50 },
    { subject: "Science & Tech", completed: 38, total: 80, percentage: 48 },
    { subject: "Environment", completed: 28, total: 60, percentage: 47 },
  ],
  weeklyProgress: [
    { day: "Mon", quizzes: 2, hours: 3.5 },
    { day: "Tue", quizzes: 1, hours: 2.0 },
    { day: "Wed", quizzes: 3, hours: 4.2 },
    { day: "Thu", quizzes: 0, hours: 0 },
    { day: "Fri", quizzes: 2, hours: 3.8 },
    { day: "Sat", quizzes: 1, hours: 2.5 },
    { day: "Sun", quizzes: 0, hours: 0 },
  ],
}

export default function DashboardPage() {
  const { user, loading, signOut, isAuthenticated } = useAuth()
  const router = useRouter()
  const [activeTab, setActiveTab] = useState("overview")

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      router.push("/auth/login")
    }
  }, [loading, isAuthenticated, router])

  const handleSignOut = () => {
    signOut()
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-black mx-auto mb-4"></div>
          <p className="text-gray-600">Loading your dashboard...</p>
        </div>
      </div>
    )
  }

  if (!user) {
    return null
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <Link href="/" className="text-2xl font-bold text-black">
                UPSC Master
              </Link>
              <span className="text-gray-400">|</span>
              <span className="text-gray-700 font-medium">Dashboard</span>
            </div>

            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-black rounded-full flex items-center justify-center">
                  <User className="h-4 w-4 text-white" />
                </div>
                <div className="hidden md:block">
                  <p className="text-sm font-medium text-gray-900">{user.name}</p>
                  <p className="text-xs text-gray-500">Rank #{mockUserStats.rank}</p>
                </div>
              </div>

              <Link href="/profile">
                <Button variant="outline" size="sm">
                  <Settings className="h-4 w-4 mr-2" />
                  Profile
                </Button>
              </Link>

              <Button variant="outline" size="sm" onClick={handleSignOut}>
                <LogOut className="h-4 w-4 mr-2" />
                Sign Out
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Page Header */}
      <section className="py-8 bg-gray-50 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex items-center justify-center gap-3 mb-4">
              <User className="h-10 w-10 text-black" />
              <h1 className="text-4xl lg:text-5xl font-bold text-gray-900">
                Welcome back, <span className="text-black">{user.name}</span>
              </h1>
            </div>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">Continue your UPSC preparation journey</p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 max-w-2xl">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="progress">Progress</TabsTrigger>
            <TabsTrigger value="activity">Activity</TabsTrigger>
            <TabsTrigger value="achievements">Achievements</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            {/* Quick Stats */}
            <div className="grid md:grid-cols-4 gap-6">
              <Card className="border-l-4 border-l-black">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Quizzes Taken</p>
                      <p className="text-3xl font-bold text-gray-900">{mockUserStats.totalQuizzes}</p>
                      <p className="text-xs text-green-600 mt-1">+3 this week</p>
                    </div>
                    <Target className="h-8 w-8 text-black" />
                  </div>
                </CardContent>
              </Card>

              <Card className="border-l-4 border-l-green-500">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Average Score</p>
                      <p className="text-3xl font-bold text-gray-900">{mockUserStats.averageScore}%</p>
                      <p className="text-xs text-green-600 mt-1">+2% from last week</p>
                    </div>
                    <Trophy className="h-8 w-8 text-green-500" />
                  </div>
                </CardContent>
              </Card>

              <Card className="border-l-4 border-l-blue-500">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Study Hours</p>
                      <p className="text-3xl font-bold text-gray-900">{mockUserStats.studyHours}h</p>
                      <p className="text-xs text-blue-600 mt-1">16h this month</p>
                    </div>
                    <Clock className="h-8 w-8 text-blue-500" />
                  </div>
                </CardContent>
              </Card>

              <Card className="border-l-4 border-l-purple-500">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Accuracy</p>
                      <p className="text-3xl font-bold text-gray-900">
                        {Math.round((mockUserStats.correctAnswers / mockUserStats.totalAnswers) * 100)}%
                      </p>
                      <p className="text-xs text-purple-600 mt-1">
                        {mockUserStats.correctAnswers}/{mockUserStats.totalAnswers} correct
                      </p>
                    </div>
                    <Brain className="h-8 w-8 text-purple-500" />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Quick Actions */}
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Link href="/quiz">
                <Card className="hover:shadow-md transition-all cursor-pointer border-2 hover:border-black group">
                  <CardContent className="p-6 text-center">
                    <div className="w-12 h-12 bg-black rounded-lg flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                      <Play className="h-6 w-6 text-white" />
                    </div>
                    <h3 className="font-bold text-gray-900 mb-2">Take Quiz</h3>
                    <p className="text-sm text-gray-600">Continue your practice</p>
                  </CardContent>
                </Card>
              </Link>

              <Link href="/maps">
                <Card className="hover:shadow-md transition-all cursor-pointer border-2 hover:border-black group">
                  <CardContent className="p-6 text-center">
                    <div className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                      <Map className="h-6 w-6 text-white" />
                    </div>
                    <h3 className="font-bold text-gray-900 mb-2">Explore Maps</h3>
                    <p className="text-sm text-gray-600">Interactive geography</p>
                  </CardContent>
                </Card>
              </Link>

              <Link href="/community">
                <Card className="hover:shadow-md transition-all cursor-pointer border-2 hover:border-black group">
                  <CardContent className="p-6 text-center">
                    <div className="w-12 h-12 bg-green-500 rounded-lg flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                      <FileText className="h-6 w-6 text-white" />
                    </div>
                    <h3 className="font-bold text-gray-900 mb-2">Answer Writing</h3>
                    <p className="text-sm text-gray-600">Daily practice</p>
                  </CardContent>
                </Card>
              </Link>

              <Link href="/resources">
                <Card className="hover:shadow-md transition-all cursor-pointer border-2 hover:border-black group">
                  <CardContent className="p-6 text-center">
                    <div className="w-12 h-12 bg-purple-500 rounded-lg flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                      <BookOpen className="h-6 w-6 text-white" />
                    </div>
                    <h3 className="font-bold text-gray-900 mb-2">Resources</h3>
                    <p className="text-sm text-gray-600">Study materials</p>
                  </CardContent>
                </Card>
              </Link>
            </div>
          </TabsContent>

          {/* Other tabs remain the same... */}
          <TabsContent value="progress">
            <Card>
              <CardHeader>
                <CardTitle>Progress tracking coming soon...</CardTitle>
              </CardHeader>
            </Card>
          </TabsContent>

          <TabsContent value="activity">
            <Card>
              <CardHeader>
                <CardTitle>Activity feed coming soon...</CardTitle>
              </CardHeader>
            </Card>
          </TabsContent>

          <TabsContent value="achievements">
            <Card>
              <CardHeader>
                <CardTitle>Achievements coming soon...</CardTitle>
              </CardHeader>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}
