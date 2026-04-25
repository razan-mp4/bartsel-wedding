import Link from 'next/link'

export default function HomePage() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-[#f7f3ee]">
      {/* soft background texture */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.08] bg-cover bg-center"
        style={{ backgroundImage: "url('/sections/love-story-5.webp')" }}
      />

      {/* light overlay */}
      <div className="pointer-events-none absolute inset-0 bg-white/70" />

      <div className="relative z-10 flex min-h-screen items-center justify-center px-6">
        <div className="max-w-xl text-center space-y-6">
          {/* title */}
          <h1 className="font-serif-display italic text-[40px] md:text-[56px] leading-tight text-[#7a2e2a]">
            Bartsel Wedding
          </h1>

          {/* subtitle */}
          <p className="font-editorial italic text-[18px] md:text-[22px] text-[#7a2e2a]/80 leading-relaxed">
            Created with love, prepared for your most meaningful day
          </p>

          {/* divider */}
          <div className="mx-auto h-px w-16 bg-[#7a2e2a]/40" />

          {/* button */}
          <Link
            href="/invitations/admin"
            className="inline-block rounded-full border border-[#7a2e2a] px-8 py-3 font-sans-ui text-[12px] uppercase tracking-[0.35em] text-[#7a2e2a] transition hover:bg-[#7a2e2a] hover:text-white"
          >
            Enter Admin
          </Link>
        </div>
      </div>
    </main>
  )
}