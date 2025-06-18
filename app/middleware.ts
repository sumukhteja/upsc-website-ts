import { withAuth } from "next-auth/middleware"

export default withAuth(
  function middleware(req) {
    // Add any additional middleware logic here
  },
  {
    callbacks: {
      authorized: ({ token, req }) => {
        // Allow access to public pages
        const publicPaths = [
          "/auth/signin",
          "/auth/signup",
          "/auth/error",
          "/auth/forgot-password",
          "/",
          "/quiz",
          "/maps",
          "/resources",
          "/community",
          "/help",
          "/contact",
          "/privacy",
        ]

        if (publicPaths.some((path) => req.nextUrl.pathname.startsWith(path))) {
          return true
        }

        // Require authentication for protected pages
        return !!token
      },
    },
  },
)

export const config = {
  matcher: ["/dashboard/:path*", "/profile/:path*", "/admin/:path*"],
}
