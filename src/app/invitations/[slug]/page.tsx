import HeroSection from '@/components/invitation/HeroSection'
import InvitationIntroSection from '@/components/invitation/InvitationIntroSection'
import MainPageShell from '@/components/invitation/MainPageShell'
import MusicSection from '@/components/invitation/MusicSection'
import RSVPSection from '@/components/invitation/RSVPSection'
import SectionLinks from '@/components/invitation/SectionLinks'
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
    title: t.heroTitle,
    description: t.verse,
    openGraph: {
      title: t.heroTitle,
      description: t.verse,
      images: [
        {
          url: '/og-image.jpg',
          width: 1200,
          height: 630,
        },
      ],
    },
  }
}


export default async function InvitationPage({
  params,
}: {
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
    <MainPageShell
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
      <main className="pb-10">
        <HeroSection
          title={t.heroTitle}
          date={t.date}
          verse={t.verse}
          imageUrl="/hero-wedding.webp"
        />

        <MusicSection
          text={t.musicText}
          previousLabel={t.previousSong}
          nextLabel={t.nextSong}
          playLabel={t.playMusic}
          pauseLabel={t.pauseMusic}
        />

        <InvitationIntroSection
          slug={invitation.slug}
          guestName={
            invitation.type === 'FAMILY'
              ? invitation.displayName
              : invitation.guests?.[0]?.fullName
          }
          isFamily={invitation.type === 'FAMILY'}
          day="06"
          greetingGuest={t.introGreetingGuest}
          greetingFamily={t.introGreetingFamily}
          lineOne={t.introLineOne}
          lineTwo={t.introLineTwo}
          saveDateLabel={t.introSaveDate}
          monthYear={t.calendarMonthYear}
          weekdays={t.calendarWeekdays}
          familySuffix={t.familySuffix}
          answerButtonLabel={t.answerButtonLabel}
        />

        <SectionLinks
          introText={t.sectionsIntro}
          items={[
            {
              title: t.loveStory,
              href: `/invitations/${slug}/our-love-story`,
              image: '/sections/love-story.webp',
              number: '01',
            },
            {
              title: t.details,
              href: `/invitations/${slug}/the-details`,
              image: '/sections/details.webp',
              number: '02',
            },
            {
              title: t.travelStay,
              href: `/invitations/${slug}/travel-stay`,
              image: '/sections/travel-stay.webp',
              number: '03',
            },
            {
              title: t.questionsAnswers,
              href: `/invitations/${slug}/questions-answers`,
              image: '/sections/questions.webp',
              number: '04',
            },
          ]}
        />

        <RSVPSection
          slug={invitation.slug}
          guests={invitation.guests}
          responses={invitation.responses}
          isFamily={invitation.type === 'FAMILY'}
          content={t.rsvpSection}
        />
      </main>
    </MainPageShell>
  )
}