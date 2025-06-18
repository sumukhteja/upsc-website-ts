"use client"

import Link from "next/link"
import { useAuth } from "../providers/auth-provider"
import { Button } from "@/components/ui/button"
import { Search, Menu, X, User } from "lucide-react"
import { useState } from "react"

export function Header() {
  const { user, logout } = useAuth()
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-[#FF2D20] rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">U</span>
              </div>
              <span className="text-2xl font-bold text-[#FF2D20]">UPSC Master</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link href="/quiz" className="text-gray-700 hover:text-[#FF2D20] transition-colors font-medium">
              Quiz Practice
            </Link>
            <Link href="/maps" className="text-gray-700 hover:text-[#FF2D20] transition-colors font-medium">
              Interactive Maps
            </Link>
            <Link href="/analytics" className="text-gray-700 hover:text-[#FF2D20] transition-colors font-medium">
              Analytics
            </Link>
            <Link href="/test-api" className="text-gray-700 hover:text-[#FF2D20] transition-colors font-medium">
              API Test
            </Link>
          </nav>

          {/* Search Bar */}
          <div className="hidden lg:flex items-center flex-1 max-w-md mx-8">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <input
                type="text"
                placeholder="Search topics, questions..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF2D20] focus:border-transparent transition-all"
              />
            </div>
          </div>

          {/* Auth Buttons */}
          <div className="flex items-center space-x-4">
            {user ? (
              <div className="flex items-center space-x-4">
                <div className="hidden md:flex items-center space-x-2">
                  <User className="h-4 w-4 text-gray-500" />
                  <span className="text-sm text-gray-700">Welcome, {user.name}</span>
                </div>
                <Button onClick={logout} variant="outline" size="sm">
                  Logout
                </Button>
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <Button asChild variant="ghost" size="sm">
                  <Link href="/auth/signin">Sign In</Link>
                </Button>
                <Button asChild size="sm" className="bg-[#FF2D20] hover:bg-[#E02617]">
                  <Link href="/auth/signup">Sign Up</Link>
                </Button>
              </div>
            )}

            {/* Mobile Menu Button */}
            <button
              className="md:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t bg-white">
            <nav className="flex flex-col space-y-4">
              <Link
                href="/quiz"
                className="text-gray-700 hover:text-[#FF2D20] transition-colors font-medium px-2 py-1"
                onClick={() => setIsMenuOpen(false)}
              >
                Quiz Practice
              </Link>
              <Link
                href="/maps"
                className="text-gray-700 hover:text-[#FF2D20] transition-colors font-medium px-2 py-1"
                onClick={() => setIsMenuOpen(false)}
              >
                Interactive Maps
              </Link>
              <Link
                href="/analytics"
                className="text-gray-700 hover:text-[#FF2D20] transition-colors font-medium px-2 py-1"
                onClick={() => setIsMenuOpen(false)}
              >
                Analytics
              </Link>
              <Link
                href="/test-api"
                className="text-gray-700 hover:text-[#FF2D20] transition-colors font-medium px-2 py-1"
                onClick={() => setIsMenuOpen(false)}
              >
                API Test
              </Link>

              {/* Mobile Search */}
              <div className="pt-4 px-2">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <input
                    type="text"
                    placeholder="Search topics, questions..."
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF2D20] focus:border-transparent"
                  />
                </div>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}
