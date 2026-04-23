'use client'

import { useEffect, useState } from 'react'
import InvitationHeader from './InvitationHeader'

export default function MainPageHeader({
  onOpenMenu,
}: {
  onOpenMenu?: () => void
}) {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    function onScroll() {
      setVisible(window.scrollY > window.innerHeight * 0.72)
    }

    onScroll()
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return <InvitationHeader visible={visible} showBack={false} onOpenMenu={onOpenMenu} />
}