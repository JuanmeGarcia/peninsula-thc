import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export default async function proxy(request: NextRequest) {
  const token = request.cookies.get('access_token')?.value
  const isAuthPage = request.nextUrl.pathname === '/'
  const isDashboard = request.nextUrl.pathname.startsWith('/dashboard')

  // If user is authenticated and tries to access auth page, redirect to dashboard
  if (token && isAuthPage) {
    console.log("Pasa aca! 1");

    return NextResponse.redirect(new URL('/dashboard', request.url))
  }

  // If user is not authenticated and tries to access dashboard, redirect to auth page
  if (!token && isDashboard) {
    console.log("Pasa aca! 2");

    return NextResponse.redirect(new URL('/', request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
}
