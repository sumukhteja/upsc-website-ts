"use client"

import { SessionProvider } from "next-auth/react"
import type { ReactNode } from "react"

interface AuthProviderProps {
  children: ReactNode
}

export default function AuthProvider({ children }: AuthProviderProps) {
  return (
    <SessionProvider
      refetchInterval={5 * 60} // Refetch session every 5 minutes
      refetchOnWindowFocus={true} // Refetch when window gains focus
    >
      {children}
    </SessionProvider>
  )
}
