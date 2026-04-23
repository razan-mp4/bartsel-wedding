'use client'

import { ReactNode, useState } from 'react'
import InvitationHeader from './InvitationHeader'
import InvitationMenuOverlay from './InvitationMenuOverlay'

type Props = {
  slug: string
  children: ReactNode
  labels: {
    home: string
    loveStory: string
    details: string
    travelStay: string
    questionsAnswers: string
    rsvp: string
    close: string
    playMusic: string
    pauseMusic: string
    previousSong: string
    nextSong: string
  }
}

export default function InvitationSubpageClient({
  slug,
  children,
  labels,
}: Props) {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <>
      <InvitationHeader
        visible
        showBack
        backHref={`/invitations/${slug}`}
        onOpenMenu={() => setMenuOpen(true)}
      />

      <InvitationMenuOverlay
        slug={slug}
        open={menuOpen}
        onClose={() => setMenuOpen(false)}
        labels={labels}
      />

      {children}
    </>
  )
}