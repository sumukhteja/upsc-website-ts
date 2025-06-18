"use client"

import { useSession } from "next-auth/react"
import { useEffect } from "react"

export default function SessionChecker() {
  const { data: session, status } = useSession()

  useEffect(() => {
    // Log session status for debugging
    if (process.env.NODE_ENV === "development") {
      console.log("Session Status:", status)
      console.log("Session Data:", session)
    }
  }, [session, status])

  return null // This component doesn't render anything
}
