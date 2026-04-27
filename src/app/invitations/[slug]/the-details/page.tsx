import InvitationSubpageClient from '@/components/invitation/InvitationSubpageClient'
import TheDetailsSection from '@/components/invitation/TheDetailsSection'
import { invitationContent } from '@/lib/invitation-content'
import { prisma } from '@/lib/prisma'
import { notFound } from 'next/navigation'


export async function generateMetadata({ params }: { params: { slug: string } }) {
  const invitation = await prisma.invitation.findUnique({
    where: { slug: params.slug },
  })

  if (!invitation) return {}

  const t = invitationContent[invitation.language]

  return {
    title: t.details,
    openGraph: {
      title: t.details,
      images: [{ url: '/og-image.jpg' }],
    },
  }
}


export default async function TheDetailsPage({
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
      <TheDetailsSection title={t.details} content={t.detailsPage} />
    </InvitationSubpageClient>
  )
}