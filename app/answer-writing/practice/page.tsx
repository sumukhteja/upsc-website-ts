"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Clock, Users, Star, Send, Timer, FileText, Target } from "lucide-react"
import Header from "../../components/header"
import Footer from "../../components/footer"

interface Question {
  id: number
  date: string
  subject: string
  question: string
  marks: number
  timeLimit: number
  difficulty: string
  attempts: number
  averageScore: number
}

export default function AnswerWritingPage() {
  const router = useRouter()
  const [question, setQuestion] = useState<Question | null>(null)
  const [userAnswer, setUserAnswer] = useState("")
  const [timeLeft, setTimeLeft] = useState(0)
  const [isTimerActive, setIsTimerActive] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  useEffect(() => {
    // Get question data from localStorage
    const storedQuestion = localStorage.getItem("selectedQuestion")
    if (storedQuestion) {
      const parsedQuestion = JSON.parse(storedQuestion)
      setQuestion(parsedQuestion)
      setTimeLeft(parsedQuestion.timeLimit * 60) // Convert minutes to seconds
    } else {
      // Redirect back if no question selected
      router.push("/community")
    }
  }, [router])

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null
    if (isTimerActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((timeLeft) => timeLeft - 1)
      }, 1000)
    } else if (timeLeft === 0 && isTimerActive) {
      setIsTimerActive(false)
      alert("Time's up! You can still submit your answer.")
    }
    return () => {
      if (interval) clearInterval(interval)
    }
  }, [isTimerActive, timeLeft])

  const startTimer = () => {
    setIsTimerActive(true)
  }

  const pauseTimer = () => {
    setIsTimerActive(false)
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`
  }

  const handleSubmitAnswer = () => {
    if (userAnswer.trim()) {
      setIsSubmitted(true)
      setIsTimerActive(false)
      alert("Answer submitted successfully! You'll receive feedback within 24 hours.")
      // Clear localStorage
      localStorage.removeItem("selectedQuestion")
      // Redirect back to community after a delay
      setTimeout(() => {
        router.push("/community")
      }, 2000)
    }
  }

  const handleGoBack = () => {
    if (userAnswer.trim() && !isSubmitted) {
      const confirmLeave = confirm("You have unsaved changes. Are you sure you want to go back?")
      if (!confirmLeave) return
    }
    localStorage.removeItem("selectedQuestion")
    router.push("/community")
  }

  if (!question) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-black mx-auto mb-4"></div>
          <p className="text-gray-600">Loading question...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="border-b border-gray-200 bg-white sticky top-0 z-50">
        <Header />
      </header>

      {/* Page Header */}
      <section className="py-8 bg-gray-50 border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-4 mb-6">
            <Button
              onClick={handleGoBack}
              variant="outline"
              className="flex items-center gap-2 border-gray-300 hover:border-black"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Community
            </Button>
          </div>

          <div className="text-center">
            <div className="flex items-center justify-center gap-3 mb-4">
              <FileText className="h-8 w-8 text-black" />
              <h1 className="text-3xl font-bold text-gray-900">Answer Writing</h1>
            </div>
            <div className="flex items-center justify-center gap-4 text-sm text-gray-600">
              <Badge variant="secondary" className="bg-black text-white">
                {question.subject}
              </Badge>
              <Badge variant="outline">{question.difficulty}</Badge>
              <div className="flex items-center gap-1">
                <Clock className="h-4 w-4" />
                {question.timeLimit} minutes
              </div>
              <div className="text-sm text-gray-500">{question.marks} marks</div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-4 gap-8">
            {/* Question and Answer Area */}
            <div className="lg:col-span-3 space-y-6">
              {/* Question Card */}
              <Card className="border border-gray-200">
                <CardHeader>
                  <CardTitle className="text-xl leading-relaxed text-gray-900">{question.question}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-4 text-sm text-gray-600">
                    <div className="flex items-center gap-1">
                      <Users className="h-4 w-4" />
                      {question.attempts} attempts
                    </div>
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 text-yellow-500" />
                      Avg: {question.averageScore}/{question.marks}
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Answer Writing Area */}
              <Card className="border border-gray-200">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Target className="h-5 w-5 text-black" />
                    Your Answer
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Textarea
                    placeholder="Start writing your answer here..."
                    value={userAnswer}
                    onChange={(e) => setUserAnswer(e.target.value)}
                    className="min-h-[400px] resize-none"
                    disabled={isSubmitted}
                  />
                  <div className="flex items-center justify-between text-sm text-gray-500">
                    <span>{userAnswer.length} characters</span>
                    <span>Recommended: 200-250 words</span>
                  </div>
                  {!isSubmitted && (
                    <Button
                      onClick={handleSubmitAnswer}
                      className="w-full bg-black hover:bg-gray-800 text-white"
                      disabled={!userAnswer.trim()}
                    >
                      <Send className="h-4 w-4 mr-2" />
                      Submit Answer
                    </Button>
                  )}
                  {isSubmitted && (
                    <div className="text-center py-4">
                      <div className="text-green-600 font-semibold mb-2">✅ Answer Submitted Successfully!</div>
                      <p className="text-sm text-gray-600">You'll receive feedback within 24 hours.</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>

            {/* Timer and Stats Sidebar */}
            <div className="space-y-6">
              {/* Timer Card */}
              <Card className="border border-gray-200 sticky top-24">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <Timer className="h-5 w-5 text-black" />
                    Timer
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="text-center">
                    <div className={`text-3xl font-bold ${timeLeft < 300 ? "text-red-600" : "text-black"}`}>
                      {formatTime(timeLeft)}
                    </div>
                    <div className="text-sm text-gray-500">{question.timeLimit} minutes total</div>
                  </div>
                  <div className="flex gap-2">
                    {!isTimerActive ? (
                      <Button
                        onClick={startTimer}
                        className="flex-1 bg-black hover:bg-gray-800 text-white"
                        disabled={isSubmitted}
                      >
                        Start Timer
                      </Button>
                    ) : (
                      <Button
                        onClick={pauseTimer}
                        variant="outline"
                        className="flex-1 border-gray-300 hover:border-black"
                      >
                        Pause Timer
                      </Button>
                    )}
                  </div>
                  {timeLeft < 300 && timeLeft > 0 && (
                    <div className="text-xs text-red-600 text-center">⚠️ Less than 5 minutes remaining!</div>
                  )}
                </CardContent>
              </Card>

              {/* Tips Card */}
              <Card className="border border-gray-200">
                <CardHeader>
                  <CardTitle className="text-lg">Writing Tips</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm text-gray-600">
                    <li>• Start with a clear introduction</li>
                    <li>• Use relevant examples</li>
                    <li>• Structure your arguments logically</li>
                    <li>• Conclude with key takeaways</li>
                    <li>• Keep within word limit</li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  )
}
