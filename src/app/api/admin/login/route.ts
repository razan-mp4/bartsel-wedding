import { NextRequest, NextResponse } from 'next/server'
import { COOKIE_NAME, signAdminToken } from '@/lib/auth'

export async function POST(request: NextRequest) {
  const body = await request.json()
  const { username, password } = body

  if (
    username !== process.env.ADMIN_USERNAME ||
    password !== process.env.ADMIN_PASSWORD
  ) {
    return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 })
  }

  const token = signAdminToken()
  const response = NextResponse.json({ ok: true })

  response.cookies.set(COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: 60 * 60 * 24 * 7,
  })

  return response
}
