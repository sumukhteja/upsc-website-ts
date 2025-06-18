"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { BookOpen, ChevronLeft, ChevronRight, ChevronDown, LogIn } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import Header from "@/app/components/header"
import Footer from "@/app/components/footer"

interface FlashCard {
  id: number
  question: string
  answer: string
  subject: string
}

const flashCardData: Record<string, FlashCard[]> = {
  "All Subjects": [
    {
      id: 1,
      question: "How many Fundamental Rights are guaranteed by the Indian Constitution?",
      answer:
        "The Indian Constitution guarantees 6 Fundamental Rights: Right to Equality, Right to Freedom, Right against Exploitation, Right to Freedom of Religion, Cultural and Educational Rights, and Right to Constitutional Remedies.",
      subject: "Polity",
    },
    {
      id: 2,
      question: "Which river is known as the 'Sorrow of Bengal'?",
      answer:
        "The Damodar River is known as the 'Sorrow of Bengal' due to its frequent flooding. However, after the construction of dams, it's now called the 'River of Bengal'.",
      subject: "Geography",
    },
    {
      id: 3,
      question: "Who was the last Mughal Emperor of India?",
      answer:
        "Bahadur Shah Zafar II (1837-1857) was the last Mughal Emperor. He was exiled to Rangoon (Myanmar) by the British after the 1857 revolt.",
      subject: "History",
    },
    {
      id: 4,
      question: "What does GDP at Factor Cost mean?",
      answer:
        "GDP at Factor Cost is the sum of value added by all producers in the economy. It excludes indirect taxes and includes subsidies. GDP at Market Price = GDP at Factor Cost + Indirect Taxes - Subsidies.",
      subject: "Economics",
    },
    {
      id: 5,
      question: "What is Article 356 of the Indian Constitution?",
      answer:
        "Article 356 deals with President's Rule or Constitutional Emergency. It allows the President to dismiss a state government and impose central rule when the constitutional machinery in a state fails.",
      subject: "Polity",
    },
  ],
  Polity: [
    {
      id: 1,
      question: "How many Fundamental Rights are guaranteed by the Indian Constitution?",
      answer:
        "The Indian Constitution guarantees 6 Fundamental Rights: Right to Equality, Right to Freedom, Right against Exploitation, Right to Freedom of Religion, Cultural and Educational Rights, and Right to Constitutional Remedies.",
      subject: "Polity",
    },
    {
      id: 2,
      question: "What is Article 356 of the Indian Constitution?",
      answer:
        "Article 356 deals with President's Rule or Constitutional Emergency. It allows the President to dismiss a state government and impose central rule when the constitutional machinery in a state fails.",
      subject: "Polity",
    },
    {
      id: 3,
      question: "What is the difference between Fundamental Rights and Directive Principles?",
      answer:
        "Fundamental Rights are justiciable (enforceable by courts) and negative obligations on the state, while Directive Principles are non-justiciable, positive obligations that guide state policy.",
      subject: "Polity",
    },
  ],
  Geography: [
    {
      id: 1,
      question: "Which river is known as the 'Sorrow of Bengal'?",
      answer:
        "The Damodar River is known as the 'Sorrow of Bengal' due to its frequent flooding. However, after the construction of dams, it's now called the 'River of Bengal'.",
      subject: "Geography",
    },
    {
      id: 2,
      question: "What is the highest peak in the Western Ghats?",
      answer: "Anamudi (2,695 meters) in Kerala is the highest peak in the Western Ghats and South India.",
      subject: "Geography",
    },
    {
      id: 3,
      question: "Which Indian state has the longest coastline?",
      answer: "Gujarat has the longest coastline in India, stretching approximately 1,600 km along the Arabian Sea.",
      subject: "Geography",
    },
  ],
  History: [
    {
      id: 1,
      question: "Who was the last Mughal Emperor of India?",
      answer:
        "Bahadur Shah Zafar II (1837-1857) was the last Mughal Emperor. He was exiled to Rangoon (Myanmar) by the British after the 1857 revolt.",
      subject: "History",
    },
    {
      id: 2,
      question: "When was the Battle of Plassey fought?",
      answer:
        "The Battle of Plassey was fought on June 23, 1757, between the British East India Company and the Nawab of Bengal, Siraj-ud-Daulah.",
      subject: "History",
    },
    {
      id: 3,
      question: "Who founded the Mauryan Empire?",
      answer:
        "Chandragupta Maurya founded the Mauryan Empire in 321 BCE with the help of his mentor Chanakya (Kautilya).",
      subject: "History",
    },
  ],
  Economics: [
    {
      id: 1,
      question: "What does GDP at Factor Cost mean?",
      answer:
        "GDP at Factor Cost is the sum of value added by all producers in the economy. It excludes indirect taxes and includes subsidies. GDP at Market Price = GDP at Factor Cost + Indirect Taxes - Subsidies.",
      subject: "Economics",
    },
    {
      id: 2,
      question: "What is the difference between Fiscal Deficit and Revenue Deficit?",
      answer:
        "Fiscal Deficit = Total Expenditure - Total Revenue. Revenue Deficit = Revenue Expenditure - Revenue Receipts. Fiscal deficit includes capital expenditure while revenue deficit doesn't.",
      subject: "Economics",
    },
    {
      id: 3,
      question: "What is the repo rate?",
      answer:
        "Repo rate is the rate at which the Reserve Bank of India lends money to commercial banks. It's a key monetary policy tool to control inflation and money supply.",
      subject: "Economics",
    },
  ],
}

const subjects = Object.keys(flashCardData)
const FREE_CARD_LIMIT = 5

export default function FlashCardsPage() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [selectedSubject, setSelectedSubject] = useState("All Subjects")
  const [currentCardIndex, setCurrentCardIndex] = useState(0)
  const [isFlipped, setIsFlipped] = useState(false)
  const [touchStart, setTouchStart] = useState<number | null>(null)
  const [touchEnd, setTouchEnd] = useState<number | null>(null)
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const [cardsStudied, setCardsStudied] = useState(0)
  const [sessionCardsViewed, setSessionCardsViewed] = useState(0)
  const [showLoginPrompt, setShowLoginPrompt] = useState(false)
  const [isAnimating, setIsAnimating] = useState(false)
  const [swipeDirection, setSwipeDirection] = useState<"left" | "right" | null>(null)

  // Load cards studied from localStorage if logged in
  useEffect(() => {
    if (session?.user?.email) {
      const stored = localStorage.getItem(`flashcards_${session.user.email}`)
      if (stored) {
        setCardsStudied(Number.parseInt(stored))
      }
    }
  }, [session])

  // Save cards studied to localStorage if logged in
  const updateCardsStudied = (count: number) => {
    if (session?.user?.email) {
      localStorage.setItem(`flashcards_${session.user.email}`, count.toString())
      setCardsStudied(count)
    }
  }

  const currentCards = flashCardData[selectedSubject]
  const currentCard = currentCards[currentCardIndex]
  const totalCards = currentCards.length

  // Reset when subject changes
  useEffect(() => {
    setCurrentCardIndex(0)
    setIsFlipped(false)
  }, [selectedSubject])

  const nextCard = () => {
    if (isAnimating) return

    setIsAnimating(true)
    setSwipeDirection("left")

    // For logged in users, increment their saved counter
    if (session?.user?.email) {
      updateCardsStudied(cardsStudied + 1)
    }

    // For all users, increment session counter
    const newSessionCount = sessionCardsViewed + 1
    setSessionCardsViewed(newSessionCount)

    // Check if we need to show login prompt
    if (!session && newSessionCount >= FREE_CARD_LIMIT) {
      setShowLoginPrompt(true)
      return
    }

    setTimeout(() => {
      // Move to next card, loop back to start if at end
      if (currentCardIndex < totalCards - 1) {
        setCurrentCardIndex(currentCardIndex + 1)
      } else {
        setCurrentCardIndex(0) // Loop back to first card
      }
      setIsFlipped(false)
      setSwipeDirection(null)
      setIsAnimating(false)
    }, 300)
  }

  const prevCard = () => {
    if (isAnimating) return

    setIsAnimating(true)
    setSwipeDirection("right")

    setTimeout(() => {
      if (currentCardIndex > 0) {
        setCurrentCardIndex(currentCardIndex - 1)
      } else {
        setCurrentCardIndex(totalCards - 1) // Loop to last card
      }
      setIsFlipped(false)
      setSwipeDirection(null)
      setIsAnimating(false)
    }, 300)
  }

  const toggleCard = () => {
    if (isAnimating) return
    setIsFlipped(!isFlipped)
  }

  // Touch handlers for swipe with improved animation
  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null)
    setTouchStart(e.targetTouches[0].clientX)
  }

  const onTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX)
  }

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return

    const distance = touchStart - touchEnd
    const isLeftSwipe = distance > 50
    const isRightSwipe = distance < -50

    if (isLeftSwipe) {
      nextCard()
    }
    if (isRightSwipe) {
      prevCard()
    }
  }

  const handleSubjectChange = (subject: string) => {
    setSelectedSubject(subject)
    setIsDropdownOpen(false)
  }

  // Loading state
  if (status === "loading") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading your flashcards...</p>
        </div>
      </div>
    )
  }

  // Login prompt overlay
  if (showLoginPrompt) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center p-4">
        <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl p-8 text-center max-w-md w-full border border-white/40">
          <div className="w-20 h-20 bg-gradient-to-r from-blue-100 to-purple-100 rounded-full flex items-center justify-center mx-auto mb-6 border border-white/40">
            <LogIn className="h-10 w-10 text-blue-600" />
          </div>
          <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
            Ready for more?
          </h2>
          <p className="text-gray-600 mb-6">
            You've viewed {FREE_CARD_LIMIT} flashcards. Sign in to track your progress and access unlimited cards!
          </p>
          <div className="space-y-3">
            <Link href="/auth/signin?callbackUrl=/revision">
              <Button className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white py-3 rounded-xl">
                <LogIn className="h-4 w-4 mr-2" />
                Sign in to Continue
              </Button>
            </Link>
            <Button
              onClick={() => {
                setShowLoginPrompt(false)
                setSessionCardsViewed(0) // Reset counter to allow 5 more cards
              }}
              variant="outline"
              className="w-full py-3 rounded-xl border-gray-300"
            >
              View 5 More Cards
            </Button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <>
      <Header />
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
        {/* Page Header - Consistent with answer writing */}
        <section className="py-6 bg-gray-50 border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <div className="flex items-center justify-center gap-3 mb-4">
                <BookOpen className="h-8 w-8 text-black" />
                <h1 className="text-3xl font-bold text-gray-900">Flash Cards</h1>
              </div>
              <p className="text-lg text-gray-600">Master UPSC concepts with interactive flashcards.</p>
            </div>
          </div>
        </section>

        {/* Controls Bar */}
        <div className="bg-white/70 backdrop-blur-xl border-b border-white/20 sticky top-12 z-10">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex items-center justify-center">
              {/* Cards Counter - Only show if logged in */}
              {session && (
                <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-4 py-2 rounded-full text-sm font-medium shadow-lg">
                  <span className="opacity-90">Cards Studied:</span> <span className="font-bold">{cardsStudied}</span>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Free Card Counter for non-logged in users */}
          {!session && (
            <div className="mb-4 text-center">
              <div className="inline-block bg-white/70 backdrop-blur-sm rounded-full px-4 py-2 text-sm text-gray-600 border border-white/30">
                <span className="font-medium">{sessionCardsViewed}</span> of {FREE_CARD_LIMIT} free cards viewed
              </div>
            </div>
          )}

          {/* Subject Selection - Above Cards */}
          <div className="flex justify-end mb-6">
            <div className="relative">
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="flex items-center space-x-2 px-4 py-2 bg-white/80 backdrop-blur-sm border border-white/30 rounded-xl hover:bg-white/90 transition-all shadow-sm"
              >
                <span className="text-sm font-medium text-gray-700">{selectedSubject}</span>
                <ChevronDown
                  className={`h-4 w-4 text-gray-500 transition-transform ${isDropdownOpen ? "rotate-180" : ""}`}
                />
              </button>

              {isDropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white/90 backdrop-blur-xl border border-white/30 rounded-xl shadow-xl z-20">
                  {subjects.map((subject) => (
                    <button
                      key={subject}
                      onClick={() => handleSubjectChange(subject)}
                      className={`w-full text-left px-4 py-3 text-sm hover:bg-blue-50/80 first:rounded-t-xl last:rounded-b-xl transition-colors ${
                        selectedSubject === subject
                          ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white hover:from-blue-600 hover:to-purple-700"
                          : "text-gray-700"
                      }`}
                    >
                      {subject}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Main Card with Anki-style animation */}
          <div className="flex justify-center mb-8">
            <div
              className="relative w-full max-w-4xl h-[500px] cursor-pointer perspective-1000"
              onTouchStart={onTouchStart}
              onTouchMove={onTouchMove}
              onTouchEnd={onTouchEnd}
              onClick={toggleCard}
            >
              <div
                className={`absolute inset-0 w-full h-full transition-all duration-700 transform-style-preserve-3d ${
                  isFlipped ? "rotate-y-180" : ""
                } ${
                  swipeDirection === "left"
                    ? "animate-slide-out-left"
                    : swipeDirection === "right"
                      ? "animate-slide-out-right"
                      : ""
                }`}
                style={{
                  transformStyle: "preserve-3d",
                  transform: isFlipped ? "rotateY(180deg)" : "rotateY(0deg)",
                }}
              >
                {/* Front of card (Question) */}
                <div
                  className="absolute inset-0 w-full h-full bg-gradient-to-br from-white via-blue-50/30 to-indigo-50/50 rounded-3xl shadow-2xl border border-white/40 backdrop-blur-sm p-12 flex flex-col justify-center backface-hidden"
                  style={{ backfaceVisibility: "hidden" }}
                >
                  <div className="text-center">
                    <h3 className="text-3xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent leading-relaxed mb-8">
                      {currentCard.question}
                    </h3>
                    <div className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-100 to-purple-100 rounded-full border border-white/40">
                      <span className="text-base bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent font-medium">
                        Tap to reveal answer
                      </span>
                    </div>
                  </div>
                </div>

                {/* Back of card (Answer) */}
                <div
                  className="absolute inset-0 w-full h-full bg-gradient-to-br from-gray-900 via-blue-900 to-indigo-900 text-white rounded-3xl shadow-2xl p-12 flex flex-col justify-center backface-hidden"
                  style={{
                    backfaceVisibility: "hidden",
                    transform: "rotateY(180deg)",
                  }}
                >
                  <div className="text-center">
                    <p className="text-xl leading-relaxed text-blue-50 mb-8">{currentCard.answer}</p>
                    <div className="inline-flex items-center px-6 py-3 bg-white/10 backdrop-blur-sm rounded-full border border-white/20">
                      <span className="text-base text-blue-100">Tap to see question</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Navigation Controls */}
          <div className="flex justify-center items-center space-x-8">
            <Button
              onClick={prevCard}
              variant="outline"
              size="lg"
              disabled={isAnimating}
              className="rounded-full w-16 h-16 p-0 border-white/30 bg-white/80 backdrop-blur-sm hover:bg-white/90 shadow-lg disabled:opacity-50"
            >
              <ChevronLeft className="h-8 w-8 text-blue-600" />
            </Button>

            <div className="flex space-x-2">
              {Array.from({ length: totalCards }).map((_, index) => (
                <div
                  key={index}
                  className={`w-3 h-3 rounded-full transition-all ${
                    index === currentCardIndex
                      ? "bg-gradient-to-r from-blue-500 to-purple-600 shadow-lg"
                      : "bg-white/60 backdrop-blur-sm"
                  }`}
                />
              ))}
            </div>

            <Button
              onClick={nextCard}
              variant="outline"
              size="lg"
              disabled={isAnimating}
              className="rounded-full w-16 h-16 p-0 border-white/30 bg-white/80 backdrop-blur-sm hover:bg-white/90 shadow-lg disabled:opacity-50"
            >
              <ChevronRight className="h-8 w-8 text-blue-600" />
            </Button>
          </div>

          {/* Study Stats - Only show if logged in */}
          {session && (
            <div className="mt-12 text-center">
              <div className="bg-white/60 backdrop-blur-xl rounded-2xl shadow-lg border border-white/30 p-6 max-w-md mx-auto">
                <h3 className="text-lg font-semibold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-3">
                  Your Study Progress
                </h3>
                <div className="text-3xl font-bold bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent mb-2">
                  {cardsStudied}
                </div>
                <p className="text-sm text-gray-600">Total cards studied</p>
                <p className="text-xs text-gray-500 mt-2">Keep going! Every card counts towards your UPSC success.</p>
              </div>
            </div>
          )}
        </div>
      </div>
      <Footer />

      <style jsx>{`
        .perspective-1000 {
          perspective: 1000px;
        }
        
        @keyframes slide-out-left {
          0% { transform: translateX(0) rotateY(0deg); opacity: 1; }
          100% { transform: translateX(-100%) rotateY(-15deg); opacity: 0; }
        }
        
        @keyframes slide-out-right {
          0% { transform: translateX(0) rotateY(0deg); opacity: 1; }
          100% { transform: translateX(100%) rotateY(15deg); opacity: 0; }
        }
        
        .animate-slide-out-left {
          animation: slide-out-left 0.3s ease-in-out;
        }
        
        .animate-slide-out-right {
          animation: slide-out-right 0.3s ease-in-out;
        }
      `}</style>
    </>
  )
}
