'use client'

import type { CSSProperties } from 'react'
import { useEffect, useRef, useState } from 'react'
import { useAudioPlayer } from './AudioPlayerProvider'

type Props = {
  text: string
  previousLabel: string
  nextLabel: string
  playLabel: string
  pauseLabel: string
}

function PrevIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M7 6v12" />
      <path d="M18 6l-8 6 8 6V6z" fill="currentColor" stroke="none" />
    </svg>
  )
}

function NextIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M17 6v12" />
      <path d="M6 6l8 6-8 6V6z" fill="currentColor" stroke="none" />
    </svg>
  )
}

function PlayIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-7 w-7" fill="currentColor">
      <path d="M8 6v12l10-6-10-6z" />
    </svg>
  )
}

function PauseIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-7 w-7" fill="currentColor">
      <path d="M7 6h4v12H7zM13 6h4v12h-4z" />
    </svg>
  )
}

function SongTitle({ title }: { title: string }) {
  const wrapRef = useRef<HTMLDivElement | null>(null)
  const textRef = useRef<HTMLDivElement | null>(null)
  const [isOverflowing, setIsOverflowing] = useState(false)
  const [travel, setTravel] = useState(0)
  const [duration, setDuration] = useState(10)

  useEffect(() => {
    function measure() {
      if (!wrapRef.current || !textRef.current) return

      const wrapWidth = wrapRef.current.clientWidth
      const textWidth = textRef.current.scrollWidth
      const overflow = textWidth - wrapWidth

      if (overflow > 2) {
        setIsOverflowing(true)
        setTravel(overflow)
        setDuration(Math.max(7, overflow / 28))
      } else {
        setIsOverflowing(false)
        setTravel(0)
        setDuration(10)
      }
    }

    const id = window.requestAnimationFrame(measure)
    window.addEventListener('resize', measure)

    return () => {
      window.cancelAnimationFrame(id)
      window.removeEventListener('resize', measure)
    }
  }, [title])

  return (
    <div ref={wrapRef} className="music-title-wrap">
      <div
        ref={textRef}
        className={`music-title text-left text-[30px] md:text-[36px] font-serif italic leading-[1.15] ${
          isOverflowing ? 'music-title-scroll' : ''
        }`}
        style={
          isOverflowing
            ? ({
                ['--marquee-travel' as string]: `-${travel}px`,
                ['--marquee-duration' as string]: `${duration}s`,
              } as CSSProperties)
            : undefined
        }
      >
        {title}
      </div>
    </div>
  )
}

function HeartBehindText() {
  const ref = useRef<HTMLDivElement | null>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    if (!ref.current) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting)
      },
      {
        threshold: 0.08,
        rootMargin: '-12% 0px -28% 0px',
      }
    )

    observer.observe(ref.current)

    return () => observer.disconnect()
  }, [])

  return (
    <div
      ref={ref}
      className="pointer-events-none absolute inset-0 z-0 flex items-center justify-center overflow-visible"
    >
      <svg
        viewBox="0 0 200 200"
        className={`heart-svg h-[430px] w-[430px] md:h-[640px] md:w-[640px] ${
          isVisible ? 'heart-svg-visible' : 'heart-svg-hidden'
        }`}
        fill="none"
      >
        <path
          className={`heart-path ${isVisible ? 'heart-path-visible' : 'heart-path-hidden'}`}
          d="M100 171
             C88 145, 58 124, 39 100
             C22 79, 22 49, 47 37
             C66 28, 87 35, 100 54
             C113 35, 134 28, 153 37
             C178 49, 178 79, 161 100
             C142 124, 112 145, 100 171Z"
        />
      </svg>
    </div>
  )
}

export default function MusicSection({
  text,
  previousLabel,
  nextLabel,
  playLabel,
  pauseLabel,
}: Props) {
  const { currentTrack, isPlaying, toggle, next, previous } = useAudioPlayer()

  return (
    <section className="bg-[#f3efe8] px-6 py-24">
      <div className="mx-auto max-w-6xl md:flex md:items-center md:gap-16">
                {/* RIGHT — TEXT */}
        <div className="relative mt-12 md:mt-0 md:flex-1">
          <HeartBehindText />

          <div className="relative z-10 text-center md:text-left">
            <p className="font-editorial italic text-[30px] leading-[1.35] text-[#6f7f57] md:text-[48px]">
              {text}
            </p>
          </div>
        </div>
        {/* LEFT — MUSIC BOX */}
        <div className="mx-auto w-full max-w-[360px] md:mx-0 mt-30">
          <div className="rounded-[2.5rem] border border-[#6f7f57] bg-[#e7dfd2] p-6 shadow-sm md:p-7">
            <div className="overflow-hidden rounded-[2rem]">
              <img
                src={currentTrack.image}
                alt={currentTrack.title}
                className="h-[340px] w-full object-cover md:h-[360px]"
              />
            </div>

            <div className="mt-6 text-[#6f7f57]">
              <SongTitle title={currentTrack.title} />

              <div className="mt-5 flex items-center justify-center gap-5">
                <button
                  type="button"
                  onClick={previous}
                  aria-label={previousLabel}
                  className="flex h-[60px] w-[60px] items-center justify-center rounded-full border border-[#6f7f57] text-[#6f7f57] transition hover:bg-white/40"
                >
                  <PrevIcon />
                </button>

                <button
                  type="button"
                  onClick={toggle}
                  aria-label={isPlaying ? pauseLabel : playLabel}
                  className="flex h-[72px] w-[72px] items-center justify-center rounded-full bg-[#6f7f57] text-[#f3efe8] transition hover:bg-[#5f6e49]"
                >
                  {isPlaying ? <PauseIcon /> : <PlayIcon />}
                </button>

                <button
                  type="button"
                  onClick={next}
                  aria-label={nextLabel}
                  className="flex h-[60px] w-[60px] items-center justify-center rounded-full border border-[#6f7f57] text-[#6f7f57] transition hover:bg-white/40"
                >
                  <NextIcon />
                </button>
              </div>
            </div>
          </div>
        </div>


      </div>
    </section>
  )
}