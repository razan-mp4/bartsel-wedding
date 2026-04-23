import jwt from 'jsonwebtoken'
import { cookies } from 'next/headers'

export const COOKIE_NAME = 'wedding_admin_token'

export function signAdminToken() {
  return jwt.sign(
    { role: 'admin' },
    process.env.JWT_SECRET as string,
    { expiresIn: '7d' }
  )
}

export function verifyAdminToken(token: string) {
  try {
    return jwt.verify(token, process.env.JWT_SECRET as string)
  } catch {
    return null
  }
}

export async function isAdminAuthenticated() {
  const cookieStore = await cookies()
  const token = cookieStore.get(COOKIE_NAME)?.value
  if (!token) return false
  return !!verifyAdminToken(token)
}
