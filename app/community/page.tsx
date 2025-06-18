"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import {
  Users,
  PenTool,
  FileText,
  Calendar,
  Clock,
  ThumbsUp,
  MessageCircle,
  Star,
  Trophy,
  Target,
  Lock,
} from "lucide-react"
import Header from "../components/header"
import Footer from "../components/footer"
import { useRouter } from "next/navigation"
import { useSession } from "next-auth/react"

// Sample daily questions
const dailyQuestions = {
  answerWriting: [
    {
      id: 1,
      date: "2024-01-15",
      subject: "Polity",
      question:
        "Discuss the significance of the 73rd Constitutional Amendment Act in strengthening grassroots democracy in India. Analyze its impact on rural governance.",
      marks: 15,
      timeLimit: 20,
      difficulty: "Medium",
      attempts: 234,
      averageScore: 8.5,
    },
    {
      id: 2,
      date: "2024-01-14",
      subject: "Geography",
      question:
        "Examine the role of monsoons in Indian agriculture. How do variations in monsoon patterns affect food security in the country?",
      marks: 15,
      timeLimit: 20,
      difficulty: "Medium",
      attempts: 189,
      averageScore: 9.2,
    },
    {
      id: 3,
      date: "2024-01-13",
      subject: "Economics",
      question:
        "Analyze the impact of digital payment systems on financial inclusion in India. Discuss the challenges and opportunities.",
      marks: 15,
      timeLimit: 20,
      difficulty: "Hard",
      attempts: 156,
      averageScore: 7.8,
    },
  ],
  essays: [
    {
      id: 1,
      date: "2024-01-15",
      topic: "Technology and Human Values",
      description:
        "In an age of rapid technological advancement, discuss how we can preserve human values while embracing innovation.",
      wordLimit: 1000,
      timeLimit: 90,
      difficulty: "Medium",
      attempts: 145,
      averageScore: 112,
    },
    {
      id: 2,
      date: "2024-01-14",
      topic: "Climate Change and Sustainable Development",
      description:
        "Examine the relationship between climate change mitigation and sustainable development goals. How can developing nations balance growth with environmental protection?",
      wordLimit: 1000,
      timeLimit: 90,
      difficulty: "Hard",
      attempts: 98,
      averageScore: 108,
    },
    {
      id: 3,
      date: "2024-01-13",
      topic: "Education and Social Transformation",
      description:
        "Education is the most powerful weapon which you can use to change the world. Discuss this statement in the context of India's development journey.",
      wordLimit: 1000,
      timeLimit: 90,
      difficulty: "Medium",
      attempts: 167,
      averageScore: 115,
    },
  ],
}

// Sample user submissions
const sampleSubmissions = [
  {
    id: 1,
    user: "Priya S.",
    question: "73rd Constitutional Amendment Act",
    score: 12,
    maxScore: 15,
    feedback: "Good analysis of grassroots democracy. Could improve on specific examples.",
    likes: 23,
    comments: 8,
    timeAgo: "2 hours ago",
  },
  {
    id: 2,
    user: "Rahul K.",
    question: "Monsoons in Indian Agriculture",
    score: 13,
    maxScore: 15,
    feedback: "Excellent coverage of monsoon patterns. Strong conclusion.",
    likes: 31,
    comments: 12,
    timeAgo: "4 hours ago",
  },
]

export default function CommunityPage() {
  const [selectedTab, setSelectedTab] = useState("answer-writing")
  const [selectedQuestion, setSelectedQuestion] = useState<number | null>(null)
  const { data: session, status } = useSession()

  const router = useRouter()

  const handleAnswerQuestion = (questionId: number) => {
    if (!session) {
      // Redirect to login if not authenticated
      router.push("/auth/signin?callbackUrl=/community")
      return
    }

    const question = dailyQuestions.answerWriting.find((q) => q.id === questionId)
    if (question) {
      // Store question data in localStorage for the answer page
      localStorage.setItem("selectedQuestion", JSON.stringify(question))
      router.push("/community/answer-writing")
    }
  }

  const handleEssayWriting = (essayId: number) => {
    if (!session) {
      // Redirect to login if not authenticated
      router.push("/auth/signin?callbackUrl=/community")
      return
    }

    // Handle essay writing logic here
    console.log("Essay writing for ID:", essayId)
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="border-b border-gray-200 bg-white sticky top-0 z-50">
        <Header />
      </header>

      {/* Page Header */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex items-center justify-center gap-3 mb-4">
              <Users className="h-10 w-10 text-black" />
              <h1 className="text-4xl lg:text-5xl font-bold text-gray-900">
                UPSC <span className="text-black">Community</span>
              </h1>
            </div>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Practice daily answer writing and essay writing with fellow aspirants. Get feedback, share knowledge, and
              improve together.
            </p>
          </div>
        </div>
      </section>

      {/* Community Stats */}
      <section className="py-8 bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-6 text-center">
            <div className="flex items-center justify-center gap-3">
              <div className="bg-black p-2 rounded-lg">
                <Users className="h-6 w-6 text-white" />
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-900">2,500+</div>
                <div className="text-sm text-gray-600">Active Members</div>
              </div>
            </div>
            <div className="flex items-center justify-center gap-3">
              <div className="bg-black p-2 rounded-lg">
                <PenTool className="h-6 w-6 text-white" />
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-900">1,200+</div>
                <div className="text-sm text-gray-600">Daily Answers</div>
              </div>
            </div>
            <div className="flex items-center justify-center gap-3">
              <div className="bg-black p-2 rounded-lg">
                <FileText className="h-6 w-6 text-white" />
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-900">800+</div>
                <div className="text-sm text-gray-600">Essays Written</div>
              </div>
            </div>
            <div className="flex items-center justify-center gap-3">
              <div className="bg-black p-2 rounded-lg">
                <Trophy className="h-6 w-6 text-white" />
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-900">95%</div>
                <div className="text-sm text-gray-600">Improvement Rate</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Tabs value={selectedTab} onValueChange={setSelectedTab} className="space-y-8">
            <TabsList className="grid w-full grid-cols-2 max-w-md mx-auto">
              <TabsTrigger value="answer-writing" className="flex items-center gap-2">
                <PenTool className="h-4 w-4" />
                Answer Writing
              </TabsTrigger>
              <TabsTrigger value="essay-writing" className="flex items-center gap-2">
                <FileText className="h-4 w-4" />
                Essay Writing
              </TabsTrigger>
            </TabsList>

            {/* Answer Writing Tab */}
            <TabsContent value="answer-writing" className="space-y-8">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">Daily Answer Writing Practice</h2>
                <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                  Practice with daily questions from all GS papers. Get expert feedback and improve your writing skills.
                </p>
              </div>

              <div className="grid lg:grid-cols-3 gap-8">
                {/* Daily Questions */}
                <div className="lg:col-span-2 space-y-6">
                  <h3 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                    <Calendar className="h-6 w-6 text-black" />
                    Today's Questions
                  </h3>

                  {dailyQuestions.answerWriting.map((question) => (
                    <Card
                      key={question.id}
                      className={`border transition-colors cursor-pointer ${
                        selectedQuestion === question.id
                          ? "border-black bg-gray-50"
                          : "border-gray-200 hover:border-black"
                      }`}
                      onClick={() => setSelectedQuestion(question.id)}
                    >
                      <CardHeader>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <Badge variant="secondary" className="bg-black text-white">
                              {question.subject}
                            </Badge>
                            <Badge variant="outline">{question.difficulty}</Badge>
                          </div>
                          <div className="text-sm text-gray-500">{question.marks} marks</div>
                        </div>
                        <CardTitle className="text-lg leading-relaxed">{question.question}</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="flex items-center justify-between text-sm text-gray-600">
                          <div className="flex items-center gap-4">
                            <div className="flex items-center gap-1">
                              <Clock className="h-4 w-4" />
                              {question.timeLimit} mins
                            </div>
                            <div className="flex items-center gap-1">
                              <Users className="h-4 w-4" />
                              {question.attempts} attempts
                            </div>
                          </div>
                          <div className="flex items-center gap-1">
                            <Star className="h-4 w-4 text-yellow-500" />
                            Avg: {question.averageScore}/{question.marks}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                {/* Answer Writing Area */}
                <div className="space-y-6">
                  <Card className="sticky top-24">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Target className="h-5 w-5 text-black" />
                        Write Your Answer
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {selectedQuestion ? (
                        <div className="text-center py-8">
                          {!session ? (
                            <>
                              <Lock className="h-12 w-12 mx-auto mb-4 text-gray-400" />
                              <p className="text-gray-600 mb-4">Please login to write your answer</p>
                              <Button
                                onClick={() => handleAnswerQuestion(selectedQuestion)}
                                className="bg-black hover:bg-gray-800 text-white"
                              >
                                Login to Start Writing
                              </Button>
                            </>
                          ) : (
                            <>
                              <PenTool className="h-12 w-12 mx-auto mb-4 text-black" />
                              <p className="text-gray-600 mb-4">Ready to write your answer?</p>
                              <Button
                                onClick={() => handleAnswerQuestion(selectedQuestion)}
                                className="bg-black hover:bg-gray-800 text-white"
                              >
                                Start Writing
                              </Button>
                            </>
                          )}
                        </div>
                      ) : (
                        <div className="text-center py-8 text-gray-500">
                          <PenTool className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                          <p>Select a question to start writing your answer</p>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </div>
              </div>

              {/* Recent Submissions */}
              <div className="space-y-6">
                <h3 className="text-2xl font-bold text-gray-900">Recent Community Submissions</h3>
                <div className="grid md:grid-cols-2 gap-6">
                  {sampleSubmissions.map((submission) => (
                    <Card key={submission.id} className="border border-gray-200">
                      <CardHeader>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 bg-black rounded-full flex items-center justify-center text-white font-bold text-sm">
                              {submission.user.charAt(0)}
                            </div>
                            <div>
                              <div className="font-semibold">{submission.user}</div>
                              <div className="text-sm text-gray-500">{submission.timeAgo}</div>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="text-lg font-bold text-black">
                              {submission.score}/{submission.maxScore}
                            </div>
                            <div className="text-xs text-gray-500">Score</div>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent className="space-y-3">
                        <div className="text-sm font-medium text-gray-900">{submission.question}</div>
                        <div className="text-sm text-gray-600">{submission.feedback}</div>
                        <div className="flex items-center gap-4 text-sm text-gray-500">
                          <div className="flex items-center gap-1">
                            <ThumbsUp className="h-4 w-4" />
                            {submission.likes}
                          </div>
                          <div className="flex items-center gap-1">
                            <MessageCircle className="h-4 w-4" />
                            {submission.comments}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </TabsContent>

            {/* Essay Writing Tab */}
            <TabsContent value="essay-writing" className="space-y-8">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">Daily Essay Writing Practice</h2>
                <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                  Practice essay writing with diverse topics. Develop your analytical and creative writing skills for
                  the UPSC Mains examination.
                </p>
              </div>

              <div className="grid lg:grid-cols-3 gap-8">
                {/* Essay Topics */}
                <div className="lg:col-span-2 space-y-6">
                  <h3 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                    <Calendar className="h-6 w-6 text-black" />
                    Today's Essay Topics
                  </h3>

                  {dailyQuestions.essays.map((essay) => (
                    <Card
                      key={essay.id}
                      className={`border transition-colors cursor-pointer ${
                        selectedQuestion === essay.id ? "border-black bg-gray-50" : "border-gray-200 hover:border-black"
                      }`}
                      onClick={() => setSelectedQuestion(essay.id)}
                    >
                      <CardHeader>
                        <div className="flex items-center justify-between">
                          <Badge variant="outline">{essay.difficulty}</Badge>
                          <div className="text-sm text-gray-500">{essay.wordLimit} words</div>
                        </div>
                        <CardTitle className="text-xl">{essay.topic}</CardTitle>
                        <p className="text-gray-600">{essay.description}</p>
                      </CardHeader>
                      <CardContent>
                        <div className="flex items-center justify-between text-sm text-gray-600">
                          <div className="flex items-center gap-4">
                            <div className="flex items-center gap-1">
                              <Clock className="h-4 w-4" />
                              {essay.timeLimit} mins
                            </div>
                            <div className="flex items-center gap-1">
                              <Users className="h-4 w-4" />
                              {essay.attempts} attempts
                            </div>
                          </div>
                          <div className="flex items-center gap-1">
                            <Star className="h-4 w-4 text-yellow-500" />
                            Avg: {essay.averageScore}/{essay.wordLimit}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                {/* Essay Writing Area */}
                <div className="space-y-6">
                  <Card className="sticky top-24">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <FileText className="h-5 w-5 text-black" />
                        Write Your Essay
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {selectedQuestion ? (
                        <div className="text-center py-8">
                          {!session ? (
                            <>
                              <Lock className="h-12 w-12 mx-auto mb-4 text-gray-400" />
                              <p className="text-gray-600 mb-4">Please login to write your essay</p>
                              <Button
                                onClick={() => handleEssayWriting(selectedQuestion)}
                                className="bg-black hover:bg-gray-800 text-white"
                              >
                                Login to Start Writing
                              </Button>
                            </>
                          ) : (
                            <>
                              <FileText className="h-12 w-12 mx-auto mb-4 text-black" />
                              <p className="text-gray-600 mb-4">Ready to write your essay?</p>
                              <Button
                                onClick={() => handleEssayWriting(selectedQuestion)}
                                className="bg-black hover:bg-gray-800 text-white"
                              >
                                Start Writing
                              </Button>
                            </>
                          )}
                        </div>
                      ) : (
                        <div className="text-center py-8 text-gray-500">
                          <FileText className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                          <p>Select an essay topic to start writing</p>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </div>
              </div>

              {/* Essay Writing Tips */}
              <Card className="bg-blue-50 border-blue-200">
                <CardHeader>
                  <CardTitle className="text-xl text-blue-900">Essay Writing Tips</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-6 text-blue-800">
                    <div>
                      <h4 className="font-semibold mb-2">Structure</h4>
                      <ul className="space-y-1 text-sm">
                        <li>• Clear introduction with thesis statement</li>
                        <li>• Well-organized body paragraphs</li>
                        <li>• Strong conclusion with key takeaways</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-2">Content</h4>
                      <ul className="space-y-1 text-sm">
                        <li>• Use relevant examples and case studies</li>
                        <li>• Present multiple perspectives</li>
                        <li>• Maintain logical flow of ideas</li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  )
}
