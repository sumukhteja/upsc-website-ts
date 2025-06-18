"use client"

import { useSession, signOut } from "next-auth/react"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  User,
  BookOpen,
  Target,
  Trophy,
  Clock,
  TrendingUp,
  Map,
  LogOut,
  Settings,
  Calendar,
  Award,
  Brain,
  FileText,
  BarChart3,
  Activity,
  ChevronRight,
  Play,
  CheckCircle,
  BookMarked,
} from "lucide-react"
import Link from "next/link"

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
  const { data: session, status } = useSession()
  const router = useRouter()
  const [activeTab, setActiveTab] = useState("overview")

  useEffect(() => {
    if (status === "loading") return
    if (status === "unauthenticated") {
      router.push("/auth/signin")
    }
  }, [status, router])

  const handleSignOut = async () => {
    await signOut({ callbackUrl: "/" })
  }

  if (status === "loading") {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-black mx-auto mb-4"></div>
          <p className="text-gray-600">Loading your dashboard...</p>
        </div>
      </div>
    )
  }

  if (!session) {
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
                {session.user?.image ? (
                  <img
                    src={session.user.image || "/placeholder.svg"}
                    alt={session.user.name || "User"}
                    className="w-8 h-8 rounded-full border-2 border-black"
                  />
                ) : (
                  <div className="w-8 h-8 bg-black rounded-full flex items-center justify-center">
                    <User className="h-4 w-4 text-white" />
                  </div>
                )}
                <div className="hidden md:block">
                  <p className="text-sm font-medium text-gray-900">{session.user?.name}</p>
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
                Your <span className="text-black">Dashboard</span>
              </h1>
            </div>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Track your progress and continue your UPSC preparation journey
            </p>
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

            {/* Weekly Goal Progress */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="h-5 w-5 text-black" />
                  Weekly Goal Progress
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">
                      Quiz Goal: {mockUserStats.weeklyCompleted}/{mockUserStats.weeklyGoal} completed
                    </span>
                    <span className="text-sm text-gray-500">
                      {mockUserStats.weeklyGoal - mockUserStats.weeklyCompleted} remaining
                    </span>
                  </div>
                  <Progress value={(mockUserStats.weeklyCompleted / mockUserStats.weeklyGoal) * 100} className="h-3" />
                  <div className="grid grid-cols-7 gap-2">
                    {mockUserStats.weeklyProgress.map((day, index) => (
                      <div key={day.day} className="text-center">
                        <div
                          className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-medium mb-1 ${
                            day.quizzes > 0 ? "bg-black text-white" : "bg-gray-200 text-gray-500"
                          }`}
                        >
                          {day.quizzes}
                        </div>
                        <p className="text-xs text-gray-600">{day.day}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

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

          {/* Progress Tab */}
          <TabsContent value="progress" className="space-y-6">
            <div className="grid lg:grid-cols-2 gap-6">
              {/* Subject-wise Progress */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BarChart3 className="h-5 w-5 text-black" />
                    Subject Progress
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {mockUserStats.subjectProgress.map((subject) => (
                    <div key={subject.subject} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">{subject.subject}</span>
                        <span className="text-sm text-gray-500">
                          {subject.completed}/{subject.total}
                        </span>
                      </div>
                      <Progress value={subject.percentage} className="h-2" />
                      <div className="text-xs text-gray-500 text-right">{subject.percentage}% complete</div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Performance Chart */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="h-5 w-5 text-black" />
                    Weekly Performance
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="grid grid-cols-7 gap-2 h-32">
                      {mockUserStats.weeklyProgress.map((day, index) => (
                        <div key={day.day} className="flex flex-col items-center justify-end">
                          <div className="w-6 bg-black rounded-t" style={{ height: `${(day.hours / 5) * 100}%` }}></div>
                          <p className="text-xs text-gray-600 mt-2">{day.day}</p>
                          <p className="text-xs text-gray-500">{day.hours}h</p>
                        </div>
                      ))}
                    </div>
                    <div className="text-center text-sm text-gray-600">Study hours per day this week</div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Detailed Stats */}
            <Card>
              <CardHeader>
                <CardTitle>Detailed Statistics</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-3 gap-6">
                  <div className="text-center p-4 bg-blue-50 rounded-lg">
                    <div className="text-2xl font-bold text-blue-600 mb-1">
                      {Math.round((mockUserStats.correctAnswers / mockUserStats.totalAnswers) * 100)}%
                    </div>
                    <div className="text-sm text-blue-700">Overall Accuracy</div>
                    <div className="text-xs text-blue-600 mt-1">
                      {mockUserStats.correctAnswers} correct out of {mockUserStats.totalAnswers}
                    </div>
                  </div>

                  <div className="text-center p-4 bg-green-50 rounded-lg">
                    <div className="text-2xl font-bold text-green-600 mb-1">
                      {(mockUserStats.studyHours / 30).toFixed(1)}h
                    </div>
                    <div className="text-sm text-green-700">Daily Average</div>
                    <div className="text-xs text-green-600 mt-1">Based on last 30 days</div>
                  </div>

                  <div className="text-center p-4 bg-purple-50 rounded-lg">
                    <div className="text-2xl font-bold text-purple-600 mb-1">{mockUserStats.currentStreak}</div>
                    <div className="text-sm text-purple-700">Current Streak</div>
                    <div className="text-xs text-purple-600 mt-1">Keep it up! 🔥</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Activity Tab */}
          <TabsContent value="activity" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Activity className="h-5 w-5 text-black" />
                  Recent Activity
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockUserStats.recentActivity.map((activity, index) => (
                    <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-10 h-10 rounded-full flex items-center justify-center ${
                            activity.type === "quiz"
                              ? "bg-blue-100"
                              : activity.type === "answer"
                                ? "bg-green-100"
                                : "bg-purple-100"
                          }`}
                        >
                          {activity.type === "quiz" && <Target className="h-5 w-5 text-blue-600" />}
                          {activity.type === "answer" && <FileText className="h-5 w-5 text-green-600" />}
                          {activity.type === "essay" && <BookMarked className="h-5 w-5 text-purple-600" />}
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">
                            {activity.type === "quiz" && "Quiz Completed"}
                            {activity.type === "answer" && "Answer Submitted"}
                            {activity.type === "essay" && "Essay Written"}
                          </p>
                          <p className="text-sm text-gray-600">{activity.subject}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold text-gray-900">
                          {activity.type === "quiz"
                            ? `${activity.score}%`
                            : `${activity.score}${activity.maxScore ? `/${activity.maxScore}` : ""}`}
                        </p>
                        <p className="text-xs text-gray-500">{activity.date}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Achievements Tab */}
          <TabsContent value="achievements" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Award className="h-5 w-5 text-black" />
                  Badges & Achievements
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-4">
                  {mockUserStats.badges.map((badge, index) => (
                    <div
                      key={index}
                      className={`p-4 rounded-lg border-2 ${
                        badge.earned ? "border-green-200 bg-green-50" : "border-gray-200 bg-gray-50"
                      }`}
                    >
                      <div className="flex items-center gap-3 mb-2">
                        <div className="text-2xl">{badge.icon}</div>
                        <div>
                          <h3 className={`font-semibold ${badge.earned ? "text-green-800" : "text-gray-700"}`}>
                            {badge.name}
                          </h3>
                          <p className={`text-sm ${badge.earned ? "text-green-600" : "text-gray-600"}`}>
                            {badge.description}
                          </p>
                        </div>
                        {badge.earned && <CheckCircle className="h-5 w-5 text-green-500 ml-auto" />}
                      </div>
                      {!badge.earned && badge.progress && (
                        <div className="space-y-1">
                          <Progress value={badge.progress} className="h-2" />
                          <p className="text-xs text-gray-500">{badge.progress}% complete</p>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Leaderboard Preview */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Trophy className="h-5 w-5 text-black" />
                    Your Ranking
                  </div>
                  <Button variant="outline" size="sm">
                    View Full Leaderboard
                    <ChevronRight className="h-4 w-4 ml-1" />
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center p-6 bg-gradient-to-r from-black to-gray-800 text-white rounded-lg">
                  <div className="text-3xl font-bold mb-2">#{mockUserStats.rank}</div>
                  <div className="text-lg mb-1">Your Current Rank</div>
                  <div className="text-sm opacity-90">Out of {mockUserStats.totalUsers.toLocaleString()} students</div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}
