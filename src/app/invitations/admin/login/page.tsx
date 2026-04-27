'use client'

import { useRouter } from 'next/navigation'
import { useState } from 'react'


export default function AdminLoginPage() {
  const router = useRouter()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError('')

    const res = await fetch('/api/admin/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password }),
    })

    const data = await res.json()

    if (!res.ok) {
      setError(data.error || 'Login failed')
      setLoading(false)
      return
    }

    router.push('/invitations/admin')
    router.refresh()
  }

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#f7f3ee]">

      <div className="pointer-events-none absolute inset-0 bg-white/88" />

      <div className="relative z-10 flex min-h-screen items-center justify-center p-6">
        <div className="w-full max-w-md rounded-[2rem] border border-[#e9dfd6] bg-white/82 p-8 shadow-[0_10px_35px_rgba(122,46,42,0.07)] backdrop-blur-sm md:p-10">
          <div className="mb-8 text-center">
            <p className="font-sans-ui text-[12px] uppercase tracking-[0.32em] text-[#8b806d]">
              Wedding Admin
            </p>
            <h1 className="mt-4 font-serif-display italic text-[42px] leading-none text-[#7a2e2a] md:text-[50px]">
              Sign in
            </h1>
            <p className="mt-4 font-editorial italic text-[24px] leading-[1.5] text-[#7a2e2a]/85 md:text-[28px]">
              Access the invitation dashboard
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-2">
              <label className="font-sans-ui text-sm text-[#8b806d]">
                Username
              </label>
              <input
                className="w-full rounded-[1.2rem] border border-[#dfd3c8] bg-white px-4 py-3 text-[#7a2e2a] outline-none transition placeholder:text-[#b3a79c] focus:border-[#7a2e2a]/40 focus:ring-2 focus:ring-[#7a2e2a]/10"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <label className="font-sans-ui text-sm text-[#8b806d]">
                Password
              </label>
              <input
                className="w-full rounded-[1.2rem] border border-[#dfd3c8] bg-white px-4 py-3 text-[#7a2e2a] outline-none transition placeholder:text-[#b3a79c] focus:border-[#7a2e2a]/40 focus:ring-2 focus:ring-[#7a2e2a]/10"
                placeholder="Password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            {error ? (
              <p className="rounded-[1rem] border border-[#ecd0cb] bg-[#fff6f4] px-4 py-3 text-sm text-[#b04d42]">
                {error}
              </p>
            ) : null}

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-full bg-[#6f7f57] py-3.5 font-sans-ui text-white transition hover:bg-[#61704c] disabled:cursor-not-allowed disabled:opacity-70"
            >
              {loading ? 'Signing in...' : 'Sign in'}
            </button>
          </form>
        </div>
      </div>
    </main>
  )
}