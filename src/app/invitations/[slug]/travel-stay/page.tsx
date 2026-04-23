import InvitationSubpageClient from '@/components/invitation/InvitationSubpageClient'
import TravelStaySection from '@/components/invitation/TravelStaySection'
import { invitationContent } from '@/lib/invitation-content'
import { prisma } from '@/lib/prisma'
import { travelStayContent } from '@/lib/travel-stay-content'
import { notFound } from 'next/navigation'

export default async function TravelStayPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params

  const invitation = await prisma.invitation.findUnique({
    where: { slug },
  })

  if (!invitation) return notFound()

  const t = invitationContent[invitation.language]
  const travelData = travelStayContent[invitation.language]

  return (
    <InvitationSubpageClient
      slug={slug}
      labels={{
        home: t.home,
        loveStory: t.loveStory,
        details: t.details,
        travelStay: t.travelStay,
        questionsAnswers: t.questionsAnswers,
        rsvp: 'RSVP',
        close: t.close,
        playMusic: t.playMusic,
        pauseMusic: t.pauseMusic,
        previousSong: t.previousSong,
        nextSong: t.nextSong,
      }}
    >
      <TravelStaySection data={travelData} />
    </InvitationSubpageClient>
  )
}