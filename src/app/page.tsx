import Link from 'next/link'

export default function HomePage() {
  return (
    <main className="min-h-screen flex items-center justify-center p-6">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-semibold">Wedding Invitations</h1>
        <Link href="/invitations/admin" className="underline">
          Go to admin
        </Link>
      </div>
    </main>
  )
}
