"use client"

import { useSession, signOut } from "next-auth/react"
import { Button } from "@/components/ui/button"
import { User, LogOut, BookOpen } from "lucide-react"
import Link from "next/link"

export function UserNav() {
  const { data: session, status } = useSession()

  if (status === "loading") {
    return (
      <div className="flex items-center space-x-4">
        <div className="w-8 h-8 bg-gray-200 rounded-full animate-pulse"></div>
      </div>
    )
  }

  if (!session) {
    return (
      <div className="flex items-center space-x-4">
        <Link href="/auth/login">
          <Button variant="outline" className="border-gray-300 text-gray-700 hover:bg-gray-50">
            Sign In
          </Button>
        </Link>
        <Link href="/auth/signup">
          <Button className="bg-gray-900 hover:bg-gray-800 text-white">Get Started</Button>
        </Link>
      </div>
    )
  }

  return (
    <div className="flex items-center space-x-4">
      <Link href="/dashboard">
        <Button variant="outline" size="sm">
          <BookOpen className="h-4 w-4 mr-2" />
          Dashboard
        </Button>
      </Link>

      <div className="flex items-center space-x-3">
        {session.user?.image ? (
          <img
            src={session.user.image || "/placeholder.svg"}
            alt={session.user.name || "User"}
            className="w-8 h-8 rounded-full"
          />
        ) : (
          <div className="w-8 h-8 bg-[#FF2D20] rounded-full flex items-center justify-center">
            <User className="h-4 w-4 text-white" />
          </div>
        )}
        <div className="hidden md:block">
          <p className="text-sm font-medium text-gray-900">{session.user?.name}</p>
        </div>
      </div>

      <Button variant="outline" size="sm" onClick={() => signOut({ callbackUrl: "/" })}>
        <LogOut className="h-4 w-4" />
      </Button>
    </div>
  )
}
