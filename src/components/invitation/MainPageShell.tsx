'use client'

import { ReactNode, useState } from 'react'
import InvitationMenuOverlay from './InvitationMenuOverlay'
import MainPageHeader from './MainPageHeader'

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

export default function MainPageShell({ slug, children, labels }: Props) {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <>
      <MainPageHeader onOpenMenu={() => setMenuOpen(true)} />
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