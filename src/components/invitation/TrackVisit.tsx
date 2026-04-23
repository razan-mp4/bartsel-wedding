'use client'

import { useEffect } from 'react'

export default function TrackVisit({ slug }: { slug: string }) {
  useEffect(() => {
    fetch(`/api/invitations/${slug}/visit`, { method: 'POST' }).catch(() => null)
  }, [slug])

  return null
}
