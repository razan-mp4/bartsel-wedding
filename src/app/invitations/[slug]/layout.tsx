import AudioPlayerProvider from '@/components/invitation/AudioPlayerProvider'
import CountdownFooter from '@/components/invitation/CountdownFooter'
import TrackVisit from '@/components/invitation/TrackVisit'
import { invitationContent } from '@/lib/invitation-content'
import { prisma } from '@/lib/prisma'
import { notFound } from 'next/navigation'
import { ReactNode } from 'react'

export const metadata = {
  robots: {
    index: false,
    follow: false,
  },
}

export default async function InvitationLayout({
  children,
  params,
}: {
  children: ReactNode
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params

  const invitation = await prisma.invitation.findUnique({
    where: { slug },
    include: {
      guests: { orderBy: { roleOrder: 'asc' } },
      responses: true,
    },
  })

  if (!invitation) return notFound()

  const t = invitationContent[invitation.language]

  return (
    <AudioPlayerProvider>
      <div className="min-h-screen bg-white text-neutral-900">
        {children}
    <TrackVisit slug={slug} />
        <CountdownFooter
          targetDate="2026-09-06T16:00:00"
          daysLabel={t.countdownDays}
          hoursLabel={t.countdownHours}
          minutesLabel={t.countdownMinutes}
          secondsLabel={t.countdownSeconds}
          footerText={t.countdownFooterText}
        />
      </div>
    </AudioPlayerProvider>
  )
}