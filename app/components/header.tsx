"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"
import Link from "next/link"

export default function Header() {
  const [searchQuery, setSearchQuery] = useState("")

  return (
    <header className="border-b border-gray-200 bg-white sticky top-0 z-50">
      <div className="max-w-full mx-auto px-6 sm:px-8 lg:px-12">
        <div className="flex items-center justify-between h-12">
          <div className="flex items-center space-x-8">
            <Link href="/" className="text-xl font-bold text-black hover:text-gray-700 transition-colors">
              UPSC Master
            </Link>
            <nav className="hidden md:flex items-center space-x-8">
              <Link
                href="/quiz"
                className="text-gray-700 hover:text-black font-normal text-sm transition-colors px-3 py-2 rounded-md hover:bg-gray-50"
              >
                Mock Tests
              </Link>
              <Link
                href="/maps"
                className="text-gray-700 hover:text-black font-normal text-sm transition-colors px-3 py-2 rounded-md hover:bg-gray-50"
              >
                Interactive Maps
              </Link>
              <Link
                href="/revision"
                className="text-gray-700 hover:text-black font-normal text-sm transition-colors px-3 py-2 rounded-md hover:bg-gray-50"
              >
                Flash Cards
              </Link>
              <Link
                href="/resources"
                className="text-gray-700 hover:text-black font-normal text-sm transition-colors px-3 py-2 rounded-md hover:bg-gray-50"
              >
                Topper Talk
              </Link>
              <Link
                href="/answer-writing"
                className="text-gray-700 hover:text-black font-normal text-sm transition-colors px-3 py-2 rounded-md hover:bg-gray-50"
              >
                Answer Writing
              </Link>
              <Link
                href="/syllabus"
                className="text-gray-700 hover:text-black font-normal text-sm transition-colors px-3 py-2 rounded-md hover:bg-gray-50"
              >
                Syllabus
              </Link>
            </nav>
          </div>

          <div className="flex items-center space-x-6">
            <div className="relative hidden sm:block">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                type="text"
                placeholder="Search anything..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-11 pr-4 py-2 w-80 border-0 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm rounded-full transition-all duration-200 shadow-sm hover:shadow-md"
              />
            </div>

            <Link href="/auth/login">
              <Button className="bg-black hover:bg-gray-800 text-white px-6 rounded-full">🔐 Login</Button>
            </Link>
          </div>
        </div>
      </div>
    </header>
  )
}
