import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import AuthProvider from "./providers/auth-provider"
import SessionChecker from "./components/session-checker"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "UPSC Master - Interactive Geography Maps",
  description: "Complete ecosystem for UPSC preparation with interactive maps and comprehensive study materials",
  viewport: "width=device-width, initial-scale=1",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
          <SessionChecker />
          {children}
        </AuthProvider>
      </body>
    </html>
  )
}
