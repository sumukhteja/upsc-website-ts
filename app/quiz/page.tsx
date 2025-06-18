"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Clock, CheckCircle, XCircle, RotateCcw, Home, BookOpen } from "lucide-react"
import Link from "next/link"
import Header from "../components/header"
import Footer from "../components/footer"

// Sample questions for different subjects (expanded for variety)
const questionsBySubject = {
  geography: [
    {
      id: 1,
      question: "Which of the following rivers flows through the Deccan Plateau?",
      options: ["Ganga", "Yamuna", "Godavari", "Brahmaputra"],
      correct: 2,
      explanation: "Godavari is the largest river in the Deccan Plateau and flows eastward into the Bay of Bengal.",
    },
    {
      id: 2,
      question: "The Tropic of Cancer passes through which of these Indian states?",
      options: ["Maharashtra", "Rajasthan", "Karnataka", "Kerala"],
      correct: 1,
      explanation:
        "The Tropic of Cancer passes through Rajasthan, Gujarat, Madhya Pradesh, Chhattisgarh, Jharkhand, West Bengal, Tripura, and Mizoram.",
    },
    {
      id: 3,
      question: "Which mountain range separates Europe from Asia?",
      options: ["Alps", "Ural Mountains", "Caucasus Mountains", "Carpathian Mountains"],
      correct: 1,
      explanation:
        "The Ural Mountains form the traditional boundary between Europe and Asia, extending from the Arctic Ocean to the Ural River.",
    },
    {
      id: 4,
      question: "The Western Ghats are also known as:",
      options: ["Sahyadri", "Nilgiris", "Aravalli", "Vindhya"],
      correct: 0,
      explanation: "The Western Ghats are also known as Sahyadri, running parallel to the western coast of India.",
    },
    {
      id: 5,
      question: "Which is the largest desert in India?",
      options: ["Thar Desert", "Cold Desert", "Kutch Desert", "Deccan Desert"],
      correct: 0,
      explanation: "The Thar Desert, also known as the Great Indian Desert, is the largest desert in India.",
    },
  ],
  history: [
    {
      id: 6,
      question: "Who founded the Mauryan Empire?",
      options: ["Ashoka", "Chandragupta Maurya", "Bindusara", "Bimbisara"],
      correct: 1,
      explanation: "Chandragupta Maurya founded the Mauryan Empire in 321 BCE after overthrowing the Nanda dynasty.",
    },
    {
      id: 7,
      question: "The Battle of Plassey was fought in which year?",
      options: ["1757", "1764", "1761", "1767"],
      correct: 0,
      explanation:
        "The Battle of Plassey was fought on 23 June 1757, marking the beginning of British colonial rule in India.",
    },
    {
      id: 8,
      question: "Who was the first Governor-General of independent India?",
      options: ["Lord Mountbatten", "C. Rajagopalachari", "Warren Hastings", "Lord Curzon"],
      correct: 1,
      explanation: "C. Rajagopalachari was the first and last Governor-General of independent India from 1948-1950.",
    },
    {
      id: 9,
      question: "The Harappan Civilization belonged to which age?",
      options: ["Stone Age", "Bronze Age", "Iron Age", "Copper Age"],
      correct: 1,
      explanation: "The Harappan Civilization belonged to the Bronze Age (3300-1300 BCE).",
    },
    {
      id: 10,
      question: "Who wrote 'Arthashastra'?",
      options: ["Chandragupta", "Kautilya", "Ashoka", "Bindusara"],
      correct: 1,
      explanation: "Arthashastra was written by Kautilya (also known as Chanakya), the advisor to Chandragupta Maurya.",
    },
  ],
  polity: [
    {
      id: 11,
      question: "How many fundamental rights are guaranteed by the Indian Constitution?",
      options: ["Six", "Seven", "Eight", "Nine"],
      correct: 0,
      explanation:
        "The Indian Constitution guarantees six fundamental rights: Right to Equality, Right to Freedom, Right against Exploitation, Right to Freedom of Religion, Cultural and Educational Rights, and Right to Constitutional Remedies.",
    },
    {
      id: 12,
      question: "Who is known as the 'Father of the Indian Constitution'?",
      options: ["Mahatma Gandhi", "Jawaharlal Nehru", "Dr. B.R. Ambedkar", "Sardar Patel"],
      correct: 2,
      explanation:
        "Dr. B.R. Ambedkar is known as the 'Father of the Indian Constitution' for his pivotal role as the Chairman of the Drafting Committee.",
    },
    {
      id: 13,
      question: "The President of India is elected by:",
      options: ["Direct election by people", "Electoral College", "Parliament only", "State Assemblies only"],
      correct: 1,
      explanation:
        "The President of India is elected by an Electoral College consisting of elected members of both Houses of Parliament and elected members of State Legislative Assemblies.",
    },
    {
      id: 14,
      question: "Which article of the Constitution deals with Right to Education?",
      options: ["Article 19", "Article 21A", "Article 25", "Article 32"],
      correct: 1,
      explanation:
        "Article 21A of the Indian Constitution deals with the Right to Education for children aged 6-14 years.",
    },
    {
      id: 15,
      question: "The Rajya Sabha can have a maximum of how many members?",
      options: ["245", "250", "255", "260"],
      correct: 1,
      explanation: "The Rajya Sabha can have a maximum of 250 members, including 12 nominated by the President.",
    },
  ],
  economics: [
    {
      id: 16,
      question: "What does GDP stand for?",
      options: [
        "Gross Domestic Product",
        "General Development Program",
        "Global Development Policy",
        "Gross Development Plan",
      ],
      correct: 0,
      explanation:
        "GDP stands for Gross Domestic Product, which measures the total value of goods and services produced within a country's borders.",
    },
    {
      id: 17,
      question: "The Reserve Bank of India was established in:",
      options: ["1935", "1947", "1950", "1969"],
      correct: 0,
      explanation:
        "The Reserve Bank of India was established on April 1, 1935, under the Reserve Bank of India Act, 1934.",
    },
    {
      id: 18,
      question: "Which of the following is NOT a direct tax?",
      options: ["Income Tax", "Corporate Tax", "GST", "Wealth Tax"],
      correct: 2,
      explanation:
        "GST (Goods and Services Tax) is an indirect tax levied on the supply of goods and services, while the others are direct taxes.",
    },
    {
      id: 19,
      question: "The term 'Fiscal Deficit' refers to:",
      options: [
        "Revenue deficit",
        "Trade deficit",
        "Excess of expenditure over revenue",
        "Excess of imports over exports",
      ],
      correct: 2,
      explanation: "Fiscal Deficit refers to the excess of total government expenditure over total government revenue.",
    },
    {
      id: 20,
      question: "NITI Aayog replaced which planning body?",
      options: ["Finance Commission", "Planning Commission", "Economic Advisory Council", "Cabinet Committee"],
      correct: 1,
      explanation: "NITI Aayog (National Institution for Transforming India) replaced the Planning Commission in 2015.",
    },
  ],
  science: [
    {
      id: 21,
      question: "What is the chemical formula for water?",
      options: ["H2O", "CO2", "NaCl", "CH4"],
      correct: 0,
      explanation: "Water has the chemical formula H2O, consisting of two hydrogen atoms and one oxygen atom.",
    },
    {
      id: 22,
      question: "Which planet is known as the 'Red Planet'?",
      options: ["Venus", "Mars", "Jupiter", "Saturn"],
      correct: 1,
      explanation:
        "Mars is known as the 'Red Planet' due to iron oxide (rust) on its surface, giving it a reddish appearance.",
    },
    {
      id: 23,
      question: "The speed of light in vacuum is approximately:",
      options: ["300,000 km/s", "150,000 km/s", "450,000 km/s", "600,000 km/s"],
      correct: 0,
      explanation:
        "The speed of light in vacuum is approximately 299,792,458 meters per second, commonly rounded to 300,000 km/s.",
    },
    {
      id: 24,
      question: "DNA stands for:",
      options: ["Deoxyribonucleic Acid", "Dinitrogen Acid", "Deoxyribose Nucleotide Acid", "Dehydrated Nucleic Acid"],
      correct: 0,
      explanation: "DNA stands for Deoxyribonucleic Acid, which carries genetic information in living organisms.",
    },
    {
      id: 25,
      question: "Which gas is most abundant in Earth's atmosphere?",
      options: ["Oxygen", "Carbon Dioxide", "Nitrogen", "Argon"],
      correct: 2,
      explanation: "Nitrogen makes up about 78% of Earth's atmosphere, making it the most abundant gas.",
    },
  ],
  currentAffairs: [
    {
      id: 26,
      question: "The G20 Summit 2023 was held in which city?",
      options: ["Mumbai", "New Delhi", "Bangalore", "Chennai"],
      correct: 1,
      explanation: "The G20 Summit 2023 was held in New Delhi, India, under India's presidency of the G20.",
    },
    {
      id: 27,
      question: "Which organization releases the World Happiness Report?",
      options: ["WHO", "UN", "World Bank", "IMF"],
      correct: 1,
      explanation:
        "The World Happiness Report is published by the United Nations Sustainable Development Solutions Network.",
    },
    {
      id: 28,
      question: "The Chandrayaan-3 mission was launched by:",
      options: ["NASA", "ESA", "ISRO", "JAXA"],
      correct: 2,
      explanation:
        "Chandrayaan-3 was launched by ISRO (Indian Space Research Organisation) and successfully landed on the Moon's south pole.",
    },
    {
      id: 29,
      question: "India's UPI system has been adopted by which country recently?",
      options: ["Singapore", "UAE", "France", "All of the above"],
      correct: 3,
      explanation:
        "India's UPI (Unified Payments Interface) has been adopted by Singapore, UAE, and France among others.",
    },
    {
      id: 30,
      question: "The 'One Nation One Election' concept refers to:",
      options: [
        "Presidential election only",
        "Simultaneous Lok Sabha and Assembly elections",
        "Only state elections",
        "Municipal elections",
      ],
      correct: 1,
      explanation:
        "'One Nation One Election' refers to conducting simultaneous elections for Lok Sabha and State Legislative Assemblies.",
    },
  ],
  modernHistory: [
    {
      id: 31,
      question: "The Sepoy Mutiny of 1857 began from which place?",
      options: ["Meerut", "Delhi", "Kanpur", "Lucknow"],
      correct: 0,
      explanation:
        "The Sepoy Mutiny of 1857 began from Meerut on May 10, 1857, when Indian soldiers rebelled against the British.",
    },
  ],
  ancientMedievalHistory: [
    {
      id: 32,
      question: "The Indus Valley Civilization was discovered in which year?",
      options: ["1920", "1921", "1922", "1923"],
      correct: 1,
      explanation: "The Indus Valley Civilization was discovered in 1921 by archaeologists at Harappa.",
    },
  ],
  artCulture: [
    {
      id: 33,
      question: "Bharatanatyam dance form originated in which state?",
      options: ["Kerala", "Tamil Nadu", "Karnataka", "Andhra Pradesh"],
      correct: 1,
      explanation: "Bharatanatyam is a classical dance form that originated in Tamil Nadu.",
    },
  ],
  fullLength: [
    // Use a mix of questions from all subjects for full length test
  ],
  previousYear: [
    {
      id: 34,
      question: "Which of the following is not a Fundamental Right under the Indian Constitution? (UPSC 2019)",
      options: ["Right to Equality", "Right to Property", "Right to Freedom", "Right against Exploitation"],
      correct: 1,
      explanation: "Right to Property was removed as a Fundamental Right by the 44th Amendment in 1978.",
    },
  ],
}

const subjects = [
  { key: "geography", name: "Geography", description: "Physical and Human Geography" },
  { key: "modernHistory", name: "Modern History", description: "British Period & Freedom Struggle" },
  {
    key: "ancientMedievalHistory",
    name: "Ancient & Medieval History",
    description: "Ancient Civilizations & Medieval Period",
  },
  { key: "polity", name: "Polity", description: "Indian Constitution & Governance" },
  { key: "economics", name: "Economics", description: "Indian Economy & Development" },
  { key: "science", name: "Science & Technology", description: "General Science & Current Tech" },
  { key: "artCulture", name: "Art & Culture", description: "Indian Art, Culture & Heritage" },
  { key: "currentAffairs", name: "Current Affairs", description: "Recent Events & Updates" },
  { key: "fullLength", name: "Full Length Test", description: "Complete UPSC Prelims Mock Test" },
  { key: "previousYear", name: "Previous Year Questions", description: "UPSC Previous Year Papers" },
]

type QuizState = "setup" | "config" | "active" | "completed"

export default function QuizPage() {
  const [quizState, setQuizState] = useState<QuizState>("setup")
  const [selectedSubject, setSelectedSubject] = useState<string>("")
  const [numberOfQuestions, setNumberOfQuestions] = useState<number>(10)
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [selectedAnswers, setSelectedAnswers] = useState<number[]>([])
  const [timeLeft, setTimeLeft] = useState(0)
  const [totalTime, setTotalTime] = useState(0)
  const [score, setScore] = useState(0)
  const [currentQuestions, setCurrentQuestions] = useState<any[]>([])

  // Timer effect
  useEffect(() => {
    if (quizState === "active" && timeLeft > 0) {
      const timer = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            setQuizState("completed")
            return 0
          }
          return prev - 1
        })
      }, 1000)
      return () => clearInterval(timer)
    }
  }, [quizState, timeLeft])

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, "0")}`
  }

  const calculateTime = (questions: number) => {
    // 120 minutes for 100 questions = 1.2 minutes per question
    return Math.round(questions * 1.2 * 60) // Convert to seconds
  }

  const selectSubject = (subjectKey: string) => {
    setSelectedSubject(subjectKey)
    setQuizState("config")
  }

  const startQuiz = () => {
    const allQuestions = questionsBySubject[selectedSubject as keyof typeof questionsBySubject]

    // Shuffle and select required number of questions
    const shuffledQuestions = [...allQuestions].sort(() => Math.random() - 0.5)
    const selectedQuestions = shuffledQuestions.slice(0, Math.min(numberOfQuestions, allQuestions.length))

    // If we need more questions than available, repeat questions
    while (selectedQuestions.length < numberOfQuestions) {
      const remainingNeeded = numberOfQuestions - selectedQuestions.length
      const additionalQuestions = shuffledQuestions.slice(0, remainingNeeded)
      selectedQuestions.push(...additionalQuestions)
    }

    const calculatedTime = calculateTime(numberOfQuestions)
    setTotalTime(calculatedTime)
    setTimeLeft(calculatedTime)
    setQuizState("active")
    setCurrentQuestion(0)
    setSelectedAnswers([])
    setScore(0)
    setCurrentQuestions(selectedQuestions)
  }

  const selectAnswer = (answerIndex: number) => {
    const newAnswers = [...selectedAnswers]
    newAnswers[currentQuestion] = answerIndex
    setSelectedAnswers(newAnswers)
  }

  const nextQuestion = () => {
    if (currentQuestion < currentQuestions.length - 1) {
      setCurrentQuestion((prev) => prev + 1)
    } else {
      completeQuiz()
    }
  }

  const completeQuiz = () => {
    let correctCount = 0
    selectedAnswers.forEach((answer, index) => {
      if (answer === currentQuestions[index].correct) {
        correctCount++
      }
    })
    setScore(correctCount)
    setQuizState("completed")
  }

  const resetQuiz = () => {
    setQuizState("setup")
    setSelectedSubject("")
    setNumberOfQuestions(10)
    setCurrentQuestion(0)
    setSelectedAnswers([])
    setScore(0)
    setCurrentQuestions([])
  }

  if (quizState === "setup") {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        {/* Page Header */}
        <section className="py-8 bg-gray-50 border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <div className="flex items-center justify-center gap-3 mb-4">
                <BookOpen className="h-8 w-8 text-black" />
                <h1 className="text-3xl font-bold text-gray-900">Mock Tests</h1>
              </div>
              <p className="text-lg text-gray-600">Choose your subject and customize your quiz experience</p>
            </div>
          </div>
        </section>

        {/* Main Content */}
        <div className="flex items-center justify-center min-h-[calc(100vh-12rem)] p-4">
          <Card className="w-full max-w-4xl">
            <CardHeader className="text-center">
              <CardTitle className="text-3xl font-bold text-gray-900 mb-4"></CardTitle>
              <p className="text-gray-600 text-lg">Choose your subject and customize your quiz experience</p>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="text-center">
                <h3 className="text-lg font-semibold text-gray-900 mb-6">Select Subject</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {subjects.map((subject) => (
                    <Button
                      key={subject.key}
                      onClick={() => selectSubject(subject.key)}
                      className="bg-white hover:bg-gray-50 text-gray-900 border border-gray-200 p-6 h-auto flex flex-col items-center justify-center space-y-2"
                      variant="outline"
                    >
                      <BookOpen className="h-8 w-8 mb-2 text-black" />
                      <span className="text-lg font-bold">{subject.name}</span>
                      <span className="text-sm text-gray-600 text-center">{subject.description}</span>
                    </Button>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  if (quizState === "config") {
    const subject = subjects.find((s) => s.key === selectedSubject)
    const availableQuestions = questionsBySubject[selectedSubject as keyof typeof questionsBySubject].length
    const estimatedTime = Math.round(numberOfQuestions * 1.2)

    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        {/* Page Header */}
        <section className="py-8 bg-gray-50 border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <div className="flex items-center justify-center gap-3 mb-4">
                <BookOpen className="h-8 w-8 text-black" />
                <h1 className="text-3xl font-bold text-gray-900">Mock Tests</h1>
              </div>
              <p className="text-lg text-gray-600">Choose your subject and customize your quiz experience</p>
            </div>
          </div>
        </section>
        <div className="flex items-center justify-center min-h-[calc(100vh-12rem)] p-4">
          <Card className="w-full max-w-2xl">
            <CardHeader className="text-center">
              <CardTitle className="text-3xl font-bold text-gray-900 mb-4">{subject?.name} Quiz</CardTitle>
              <p className="text-gray-600 text-lg">{subject?.description}</p>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-6">
                <div className="text-center">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Number of Questions</h3>
                  <div className="flex items-center justify-center space-x-4">
                    <Button
                      onClick={() => setNumberOfQuestions(Math.max(10, numberOfQuestions - 10))}
                      variant="outline"
                      disabled={numberOfQuestions <= 10}
                    >
                      -10
                    </Button>
                    <div className="bg-gray-100 px-6 py-3 rounded-lg">
                      <span className="text-2xl font-bold text-gray-900">{numberOfQuestions}</span>
                    </div>
                    <Button
                      onClick={() => setNumberOfQuestions(Math.min(100, numberOfQuestions + 10))}
                      variant="outline"
                      disabled={numberOfQuestions >= 100}
                    >
                      +10
                    </Button>
                  </div>
                  <div className="mt-4 space-y-2">
                    <div className="flex justify-center space-x-2">
                      {[10, 25, 50, 75, 100].map((num) => (
                        <Button
                          key={num}
                          onClick={() => setNumberOfQuestions(num)}
                          variant={numberOfQuestions === num ? "default" : "outline"}
                          size="sm"
                          className={numberOfQuestions === num ? "bg-black text-white" : ""}
                        >
                          {num}
                        </Button>
                      ))}
                    </div>
                    <p className="text-sm text-gray-500">
                      Available questions: {availableQuestions} (questions will repeat if needed)
                    </p>
                  </div>
                </div>

                <div className="bg-gray-50 rounded-lg p-6">
                  <h4 className="font-semibold text-gray-900 mb-3">Quiz Information:</h4>
                  <ul className="space-y-2 text-gray-600">
                    <li>• {numberOfQuestions} multiple choice questions</li>
                    <li>• Subject: {subject?.name}</li>
                    <li>• Estimated time: {estimatedTime} minutes</li>
                    <li>• Detailed explanations for each answer</li>
                  </ul>
                </div>

                <div className="flex justify-center space-x-4">
                  <Button
                    onClick={() => setQuizState("setup")}
                    variant="outline"
                    className="text-gray-600 hover:text-gray-900"
                  >
                    ← Back to Subjects
                  </Button>
                  <Button onClick={startQuiz} className="bg-black hover:bg-gray-800 text-white">
                    Start Quiz
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  if (quizState === "active") {
    const progress = ((currentQuestion + 1) / currentQuestions.length) * 100
    const question = currentQuestions[currentQuestion]

    return (
      <div className="min-h-screen bg-gray-50">
        {/* Quiz Header */}
        <header className="border-b border-gray-200 bg-white sticky top-0 z-50">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              <div className="flex items-center space-x-4">
                <span className="text-lg font-semibold text-gray-900">
                  Question {currentQuestion + 1} of {currentQuestions.length}
                </span>
                <span className="text-sm text-gray-500">{subjects.find((s) => s.key === selectedSubject)?.name}</span>
              </div>
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2 text-black">
                  <Clock className="h-5 w-5" />
                  <span className="text-lg font-bold">{formatTime(timeLeft)}</span>
                </div>
              </div>
            </div>
            <div className="pb-2">
              <Progress value={progress} className="h-2" />
            </div>
          </div>
        </header>

        {/* Question Content */}
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Card>
            <CardHeader>
              <CardTitle className="text-xl text-gray-900">{question.question}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-3">
                {question.options.map((option: string, index: number) => (
                  <Button
                    key={index}
                    variant={selectedAnswers[currentQuestion] === index ? "default" : "outline"}
                    className={`p-4 h-auto text-left justify-start ${
                      selectedAnswers[currentQuestion] === index
                        ? "bg-black hover:bg-gray-800 text-white"
                        : "border-gray-300 text-gray-700 hover:bg-gray-50"
                    }`}
                    onClick={() => selectAnswer(index)}
                  >
                    <span className="mr-3 font-bold">{String.fromCharCode(65 + index)}.</span>
                    {option}
                  </Button>
                ))}
              </div>

              <div className="flex justify-between pt-6">
                <Button
                  variant="outline"
                  onClick={() => setCurrentQuestion(Math.max(0, currentQuestion - 1))}
                  disabled={currentQuestion === 0}
                >
                  Previous
                </Button>
                <Button
                  onClick={nextQuestion}
                  disabled={selectedAnswers[currentQuestion] === undefined}
                  className="bg-black hover:bg-gray-800 text-white"
                >
                  {currentQuestion === currentQuestions.length - 1 ? "Finish Quiz" : "Next Question"}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  // Results screen
  const subject = subjects.find((s) => s.key === selectedSubject)
  const timeTaken = totalTime - timeLeft
  const timeTakenMinutes = Math.floor(timeTaken / 60)
  const timeTakenSeconds = timeTaken % 60

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      {/* Page Header */}
      <section className="py-8 bg-gray-50 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex items-center justify-center gap-3 mb-4">
              <BookOpen className="h-8 w-8 text-black" />
              <h1 className="text-3xl font-bold text-gray-900">Mock Tests</h1>
            </div>
            <p className="text-lg text-gray-600">Choose your subject and customize your quiz experience</p>
          </div>
        </div>
      </section>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Card className="mb-8">
          <CardHeader className="text-center">
            <CardTitle className="text-3xl font-bold text-gray-900 mb-4">Quiz Completed!</CardTitle>
            <p className="text-lg text-gray-600 mb-2">Subject: {subject?.name}</p>
            <p className="text-sm text-gray-500 mb-4">
              Time taken: {timeTakenMinutes}m {timeTakenSeconds}s
            </p>
            <div className="text-6xl font-bold text-black mb-2">
              {score}/{currentQuestions.length}
            </div>
            <p className="text-xl text-gray-600">You scored {Math.round((score / currentQuestions.length) * 100)}%</p>
          </CardHeader>
          <CardContent className="text-center space-y-4">
            <div className="flex justify-center space-x-4">
              <Button onClick={resetQuiz} className="bg-black hover:bg-gray-800 text-white">
                <RotateCcw className="h-4 w-4 mr-2" />
                Take Another Quiz
              </Button>
              <Link href="/">
                <Button variant="outline">
                  <Home className="h-4 w-4 mr-2" />
                  Back to Home
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>

        {/* Answer Review */}
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-gray-900">Answer Review</h2>
          {currentQuestions.map((question, index) => {
            const userAnswer = selectedAnswers[index]
            const isCorrect = userAnswer === question.correct

            return (
              <Card key={question.id} className="border-l-4 border-l-gray-300">
                <CardHeader>
                  <CardTitle className="flex items-center gap-3 text-lg">
                    {isCorrect ? (
                      <CheckCircle className="h-6 w-6 text-black" />
                    ) : (
                      <XCircle className="h-6 w-6 text-gray-600" />
                    )}
                    Question {index + 1}
                  </CardTitle>
                  <p className="text-gray-700">{question.question}</p>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-4">
                    <div className="space-y-3">
                      <div className="flex items-start gap-3">
                        <span className="text-sm font-medium text-gray-500 min-w-[100px]">Your Answer:</span>
                        <span
                          className={`font-medium ${userAnswer === question.correct ? "text-black" : "text-gray-600"}`}
                        >
                          {userAnswer !== undefined
                            ? `${String.fromCharCode(65 + userAnswer)}. ${question.options[userAnswer]}`
                            : "No answer selected"}
                          {userAnswer === question.correct && <span className="ml-2 text-black">✓</span>}
                          {userAnswer !== question.correct && userAnswer !== undefined && (
                            <span className="ml-2 text-gray-600">✗</span>
                          )}
                        </span>
                      </div>

                      {userAnswer !== question.correct && (
                        <div className="flex items-start gap-3">
                          <span className="text-sm font-medium text-gray-500 min-w-[100px]">Correct Answer:</span>
                          <span className="font-medium text-black">
                            {String.fromCharCode(65 + question.correct)}. {question.options[question.correct]} ✓
                          </span>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="mt-6 pt-4 border-t border-gray-200">
                    <p className="text-sm font-medium text-gray-500 mb-2">EXPLANATION</p>
                    <p className="text-gray-800 text-base leading-7">{question.explanation}</p>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>
      <Footer />
    </div>
  )
}
