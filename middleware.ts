import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// Simulated auth check - in production this would verify JWT tokens or session cookies
function getAuthStatus(request: NextRequest) {
  // This is a simplified example - in production you'd verify tokens/cookies
  const authCookie = request.cookies.get('auth')
  return {
    isAuthenticated: Boolean(authCookie),
    role: authCookie?.value === 'creator' ? 'creator' : 'student'
  }
}

export function middleware(request: NextRequest) {
  // Get the pathname
  const path = request.nextUrl.pathname

  // Check if user is trying to access dashboard routes
  if (path.startsWith('/dashboard')) {
    const { isAuthenticated, role } = getAuthStatus(request)

    if (!isAuthenticated) {
      return NextResponse.redirect(new URL('/login', request.url))
    }

    // Protect creator dashboard
    if (path.startsWith('/dashboard/creator') && role !== 'creator') {
      return NextResponse.redirect(new URL('/login', request.url))
    }

    // Protect student dashboard
    if (path.startsWith('/dashboard/student') && role !== 'student') {
      return NextResponse.redirect(new URL('/login', request.url))
    }

    // Add role to headers for components to use
    const response = NextResponse.next()
    response.headers.set('x-user-role', role)
    return response
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/dashboard/:path*']
}