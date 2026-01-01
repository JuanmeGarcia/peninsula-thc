import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export default async function proxy(request: NextRequest) {
  const token = request.cookies.get('access_token')?.value
  const isDashboard = request.nextUrl.pathname.startsWith('/dashboard')

  if (!token && isDashboard) {
    return NextResponse.redirect(new URL('/', request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
}
