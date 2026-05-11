import { withAuth } from 'next-auth/middleware'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

const authMiddleware = withAuth({ pages: { signIn: '/admin/login' } })

export default function middleware(req: NextRequest) {
  // Allow the login page through without auth check
  if (req.nextUrl.pathname === '/admin/login') {
    return NextResponse.next()
  }
  return (authMiddleware as any)(req)
}

export const config = {
  matcher: ['/admin/:path*', '/api/admin/:path*'],
}
