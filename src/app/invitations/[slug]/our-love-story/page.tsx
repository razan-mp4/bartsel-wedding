import InvitationSubpageClient from '@/components/invitation/InvitationSubpageClient'
import LoveStorySection from '@/components/invitation/LoveStorySection'
import { invitationContent } from '@/lib/invitation-content'
import { prisma } from '@/lib/prisma'
import { notFound } from 'next/navigation'


export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params

  const invitation = await prisma.invitation.findUnique({
    where: { slug },
  })

  if (!invitation) {
    return {
      title: 'Our Love Story',
      robots: {
        index: false,
        follow: false,
      },
    }
  }

  const t = invitationContent[invitation.language]

  return {
    title: t.loveStory,
    robots: {
      index: false,
      follow: false,
    },
    openGraph: {
      title: t.loveStory,
      images: [
        {
          url: '/og-image.jpg',
          width: 1200,
          height: 630,
          alt: t.loveStory,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: t.loveStory,
      images: ['/og-image.jpg'],
    },
  }
}


export default async function OurLoveStoryPage({
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
      <LoveStorySection
        title={t.loveStory}
        hashtag={t.loveStoryHashtag}
        paragraphs={t.loveStoryParagraphs}
      />
    </InvitationSubpageClient>
  )
}