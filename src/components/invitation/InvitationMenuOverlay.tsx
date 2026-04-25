'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { useAudioPlayer } from './AudioPlayerProvider'

type Props = {
  slug: string
  open: boolean
  onClose: () => void
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

function PrevIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M7 6v12" />
      <path d="M18 6l-8 6 8 6V6z" fill="currentColor" stroke="none" />
    </svg>
  )
}

function NextIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M17 6v12" />
      <path d="M6 6l8 6-8 6V6z" fill="currentColor" stroke="none" />
    </svg>
  )
}

function PlayIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor">
      <path d="M8 6v12l10-6-10-6z" />
    </svg>
  )
}

function PauseIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor">
      <path d="M7 6h4v12H7zM13 6h4v12h-4z" />
    </svg>
  )
}

export default function InvitationMenuOverlay({
  slug,
  open,
  onClose,
  labels,
}: Props) {
  const router = useRouter()
  const pathname = usePathname()

  const { currentTrack, isPlaying, toggle, previous, next } = useAudioPlayer()
  const [mounted, setMounted] = useState(false)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    if (open) {
      setMounted(true)

      const originalOverflow = document.body.style.overflow
      document.body.style.overflow = 'hidden'

      const id = requestAnimationFrame(() => setVisible(true))

      return () => {
        cancelAnimationFrame(id)
        document.body.style.overflow = originalOverflow
      }
    }

    setVisible(false)
    document.body.style.overflow = ''

    const timeout = window.setTimeout(() => {
      setMounted(false)
    }, 350)

    return () => {
      window.clearTimeout(timeout)
    }
  }, [open])

  if (!mounted) return null

  const homePath = `/invitations/${slug}`

  const menuItems = [
    { n: '01', href: homePath, title: labels.home },
    { n: '02', href: `${homePath}/our-love-story`, title: labels.loveStory },
    { n: '03', href: `${homePath}/the-details`, title: labels.details },
    { n: '04', href: `${homePath}/travel-stay`, title: labels.travelStay },
    { n: '05', href: `${homePath}/questions-answers`, title: labels.questionsAnswers },
  ]

  const linkClass =
    'group flex items-baseline justify-center gap-4 text-[#6f7f57] transition hover:opacity-75'

  const numberClass = 'font-sans-ui text-[16px] md:text-[20px] opacity-70'

  const titleClass =
    'font-serif-display text-[28px] sm:text-[34px] md:text-[48px] leading-[1.05] text-center'

  const handleRsvpClick = () => {
    onClose()

    if (pathname === homePath) {
      window.setTimeout(() => {
        document.getElementById('rsvp')?.scrollIntoView({
          behavior: 'smooth',
          block: 'start',
        })
      }, 350)

      return
    }

    router.push(`${homePath}#rsvp`)
  }

  return (
    <div
      className={`fixed inset-0 z-[60] bg-[#f3efe8] transition-all duration-300 ease-out ${
        visible ? 'opacity-100' : 'opacity-0'
      }`}
    >
      <div className="mx-auto flex min-h-full max-w-7xl flex-col px-6 py-8">
        <div className="flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className={`text-[46px] leading-none text-[#6f7f57] transition-all duration-300 ${
              visible ? 'translate-y-0 opacity-100' : '-translate-y-2 opacity-0'
            }`}
            aria-label={labels.close}
          >
            ×
          </button>
        </div>

        <div className="flex-1 flex items-center justify-center">
          <div className="w-full max-w-4xl space-y-7 md:space-y-8">
            {menuItems.map((item, index) => (
              <Link
                key={item.href}
                href={item.href}
                className={`${linkClass} transition-all duration-500 ease-out ${
                  visible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
                }`}
                style={{ transitionDelay: `${index * 45}ms` }}
                onClick={onClose}
              >
                <span className={numberClass}>{item.n}</span>
                <span className={titleClass}>{item.title}</span>
              </Link>
            ))}

            <button
              type="button"
              className={`${linkClass} w-full transition-all duration-500 ease-out ${
                visible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
              }`}
              style={{ transitionDelay: '225ms' }}
              onClick={handleRsvpClick}
            >
              <span className={numberClass}>06</span>
              <span className={titleClass}>{labels.rsvp}</span>
            </button>
          </div>
        </div>

        <div
          className={`pt-6 transition-all duration-500 ease-out ${
            visible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
          }`}
          style={{ transitionDelay: '180ms' }}
        >
          <div className="flex flex-col items-center text-center">
            <p className="font-editorial italic text-[22px] md:text-[28px] text-[#6f7f57]">
              {currentTrack.title}
            </p>

            <div className="mt-5 flex items-center justify-center gap-4">
              <button
                type="button"
                onClick={previous}
                aria-label={labels.previousSong}
                className="flex h-[52px] w-[52px] items-center justify-center rounded-full border border-[#6f7f57] text-[#6f7f57] transition hover:bg-white/40"
              >
                <PrevIcon />
              </button>

              <button
                type="button"
                onClick={toggle}
                aria-label={isPlaying ? labels.pauseMusic : labels.playMusic}
                className="flex h-[64px] w-[64px] items-center justify-center rounded-full bg-[#6f7f57] text-[#f3efe8] transition hover:bg-[#5f6e49]"
              >
                {isPlaying ? <PauseIcon /> : <PlayIcon />}
              </button>

              <button
                type="button"
                onClick={next}
                aria-label={labels.nextSong}
                className="flex h-[52px] w-[52px] items-center justify-center rounded-full border border-[#6f7f57] text-[#6f7f57] transition hover:bg-white/40"
              >
                <NextIcon />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}