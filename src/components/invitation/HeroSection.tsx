'use client'

import { useEffect, useState } from 'react'
import ScrollArrow from './ScrollArrow'

type Props = {
  title: string
  date: string
  verse: string
  imageUrl: string
}

function RingsMark({ color = 'currentColor' }: { color?: string }) {
  return (
    <svg
      viewBox="0 0 220 140"
      aria-hidden="true"
      className="block h-[40px] w-[68px] sm:h-[48px] sm:w-[80px] md:h-[58px] md:w-[96px] lg:h-[70px] lg:w-[116px]"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="82" cy="90" r="42" stroke={color} strokeWidth="6.5" />
      <circle cx="138" cy="64" r="42" stroke={color} strokeWidth="6.5" />
    </svg>
  )
}

export default function HeroSection({ title, date, verse, imageUrl }: Props) {
  const parts = title.split('&')
  const leftName = parts[0]?.trim() ?? ''
  const rightName = parts[1]?.trim() ?? ''

  const [imageLoaded, setImageLoaded] = useState(false)
  const [showOverlay, setShowOverlay] = useState(true)
  const [renderOverlay, setRenderOverlay] = useState(true)

  useEffect(() => {
    if (!showOverlay) return

    document.documentElement.style.overflow = 'hidden'
    document.body.style.overflow = 'hidden'

    return () => {
      document.documentElement.style.overflow = ''
      document.body.style.overflow = ''
    }
  }, [showOverlay])

  function handleImageLoad() {
    setImageLoaded(true)

    window.setTimeout(() => {
      setShowOverlay(false)

      window.setTimeout(() => {
        setRenderOverlay(false)
      }, 1700)
    }, 800)
  }

  return (
    <section className="relative min-h-[100svh] overflow-hidden bg-black">
      <img
        src={imageUrl}
        alt=""
        onLoad={handleImageLoad}
        className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ease-out ${
          imageLoaded ? 'opacity-100' : 'opacity-0'
        }`}
      />

      <div className="absolute inset-0 bg-black/28" />
      <div className="absolute inset-0 bg-gradient-to-b from-black/15 via-black/10 to-black/30" />

      {renderOverlay && (
        <div
          className={`absolute inset-0 z-20 bg-[#f3efe8] transition-opacity duration-700 ease-out ${
            showOverlay ? 'opacity-100' : 'opacity-0 pointer-events-none'
          }`}
        >
          <div className="relative z-10 flex min-h-[100svh] flex-col px-2 sm:px-4 md:px-6">
            <div className="pt-8 md:pt-10 flex justify-center">
              <p className="font-sans-ui text-[12px] md:text-[16px] tracking-[0.42em] uppercase text-transparent select-none">
                {date}
              </p>
            </div>

            <div className="flex-1 flex flex-col items-center justify-center text-center">
              <h1 className="w-full max-w-[1800px] leading-[0.95] font-serif-display italic font-medium text-[#6f7f57]">
                <span className="inline-flex items-center whitespace-nowrap text-[clamp(1.6rem,6.8vw,6rem)]">
                  <span className="relative top-[-0.34em] invisible">
                    {leftName || 'Name'}
                  </span>

                  <span className="mx-1.5 sm:mx-2.5 md:mx-3.5 inline-flex shrink-0 items-center justify-center">
                    <RingsMark color="#6f7f57" />
                  </span>

                  <span className="relative top-[0.34em] invisible">
                    {rightName || 'Name'}
                  </span>
                </span>
              </h1>

              <div className="my-7 md:my-8 h-px w-24 md:w-28 opacity-0" />

              <p className="max-w-3xl font-editorial italic font-medium text-[22px] md:text-[30px] lg:text-[34px] leading-[1.35] text-[#6f7f57]">
                {verse}
              </p>
            </div>

            <div className="pb-8 md:pb-10 flex justify-center">
              <div className="h-[20px] md:h-[28px]" />
            </div>
          </div>
        </div>
      )}

      <div className="relative z-10 flex min-h-[100svh] flex-col px-2 sm:px-4 md:px-6 text-white">
        <div className="pt-8 md:pt-10 flex justify-center">
          <p className="font-sans-ui text-[12px] md:text-[16px] tracking-[0.42em] uppercase text-white/80">
            {date}
          </p>
        </div>

        <div className="flex-1 flex flex-col items-center justify-center text-center">
          <h1 className="w-full max-w-[1800px] text-white leading-[0.95] font-serif-display italic font-medium">
            <span className="inline-flex items-center whitespace-nowrap text-[clamp(1.6rem,6.8vw,6rem)]">
              <span className="relative top-[-0.34em]">{leftName}</span>

              <span className="mx-1.5 sm:mx-2.5 md:mx-3.5 inline-flex shrink-0 items-center justify-center">
                <RingsMark color="white" />
              </span>

              <span className="relative top-[0.34em]">{rightName}</span>
            </span>
          </h1>

          <div className="my-7 md:my-8 h-px w-24 md:w-28 bg-white/55" />

          <p className="max-w-3xl font-editorial italic font-medium text-[22px] md:text-[30px] lg:text-[34px] leading-[1.35] text-white/92">
            {verse}
          </p>
        </div>

        <div className="pb-8 md:pb-10 flex justify-center">
          <ScrollArrow />
        </div>
      </div>
    </section>
  )
}