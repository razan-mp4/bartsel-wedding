import { NextRequest, NextResponse } from 'next/server'

const COOKIE_NAME = 'wedding_admin_token'

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname

  const isAdminArea = pathname.startsWith('/invitations/admin')
  const isLoginPage = pathname === '/invitations/admin/login'

  if (!isAdminArea || isLoginPage) {
    return NextResponse.next()
  }

  const token = request.cookies.get(COOKIE_NAME)?.value

  if (!token) {
    return NextResponse.redirect(new URL('/invitations/admin/login', request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/invitations/admin/:path*'],
}
