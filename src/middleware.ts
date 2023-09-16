import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'

export function middleware(request: NextRequest) {
  const sessionToken = request.cookies.get('next-auth.session-token')?.value
  const { pathname } = request.nextUrl

  if (pathname === '/login' && sessionToken)
    return NextResponse.redirect(new URL(`/`, request.url))

  if (pathname !== '/login' && !sessionToken)
    return NextResponse.redirect(new URL(`/login`, request.url))

  return NextResponse.next()
}

export const config = {
  matcher: ['/', '/login/:path*'],
}
