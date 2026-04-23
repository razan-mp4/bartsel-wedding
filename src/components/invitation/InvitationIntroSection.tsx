'use client'

import { useEffect, useRef, useState } from 'react'

type Guest = {
  id: string
  fullName: string
  guestType: 'ADULT' | 'CHILD'
}

type Response = {
  guestId: string
  attending: 'YES' | 'NO' | 'MAYBE' | null
}

type Props = {
  slug: string
  guestName?: string
  isFamily?: boolean
  day: string
  greetingGuest: string
  greetingFamily: string
  lineOne: string
  lineTwo: string
  saveDateLabel: string
  monthYear: string
  weekdays: readonly string[]
  familySuffix: string
  answerButtonLabel: string
}

function RibbonsBackground() {
  const ref = useRef<HTMLDivElement | null>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    if (!ref.current) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting)
      },
      {
        threshold: 0.06,
        rootMargin: '-10% 0px -35% 0px',
      }
    )

    observer.observe(ref.current)

    return () => observer.disconnect()
  }, [])

  return (
    <div
      ref={ref}
      className="pointer-events-none absolute inset-0 z-0 overflow-hidden"
      aria-hidden="true"
    >
      {/* MOBILE */}
<svg
  viewBox="0 0 1000 1600"
  preserveAspectRatio="none"
  className={`absolute inset-0 h-full w-full md:hidden ${
    isVisible ? 'ribbon-bg-visible' : 'ribbon-bg-hidden'
  }`}
  fill="none"
>
  <path
    className={`ribbon-path ribbon-path-1 ${
      isVisible ? 'ribbon-path-visible' : 'ribbon-path-hidden'
    }`}
    d="M-120 220
       C120 80, 320 90, 520 210
       C700 320, 860 330, 1120 180"
  />

  <path
    className={`ribbon-path ribbon-path-2 ${
      isVisible ? 'ribbon-path-visible' : 'ribbon-path-hidden'
    }`}
    d="M-100 560
       C140 430, 340 430, 550 545
       C760 660, 900 670, 1140 530"
  />

  <path
    className={`ribbon-path ribbon-path-3 ${
      isVisible ? 'ribbon-path-visible' : 'ribbon-path-hidden'
    }`}
    d="M-80 980
       C150 860, 360 865, 570 960
       C770 1050, 920 1050, 1160 930"
  />

  <path
    className={`ribbon-path ribbon-path-4 ${
      isVisible ? 'ribbon-path-visible' : 'ribbon-path-hidden'
    }`}
    d="M-120 1350
       C120 1230, 350 1240, 580 1335
       C790 1425, 940 1420, 1180 1300"
  />
</svg>

      {/* DESKTOP */}
      <svg
        viewBox="0 0 1400 900"
        className={`absolute left-1/2 top-1/2 hidden h-[900px] w-[1450px] -translate-x-1/2 -translate-y-1/2 md:block ${
          isVisible ? 'ribbon-bg-visible' : 'ribbon-bg-hidden'
        }`}
        fill="none"
      >
        <path
          className={`ribbon-path ribbon-path-1 ${
            isVisible ? 'ribbon-path-visible' : 'ribbon-path-hidden'
          }`}
          d="M-40 300
             C180 150, 420 150, 620 285
             C820 420, 1040 430, 1290 255
             C1350 215, 1400 190, 1450 170"
        />

        <path
          className={`ribbon-path ribbon-path-2 ${
            isVisible ? 'ribbon-path-visible' : 'ribbon-path-hidden'
          }`}
          d="M20 620
             C250 470, 500 455, 720 575
             C940 695, 1160 680, 1420 500"
        />

        <path
          className={`ribbon-path ribbon-path-3 ${
            isVisible ? 'ribbon-path-visible' : 'ribbon-path-hidden'
          }`}
          d="M-80 150
             C200 60, 480 80, 700 160
             C920 240, 1180 230, 1500 120"
        />

        <path
          className={`ribbon-path ribbon-path-4 ${
            isVisible ? 'ribbon-path-visible' : 'ribbon-path-hidden'
          }`}
          d="M-60 760
             C220 640, 520 640, 760 720
             C1000 800, 1220 780, 1480 680"
        />
      </svg>
    </div>
  )
}

export default function InvitationIntroSection({
  slug,
  guestName,
  isFamily,
  day,
  greetingGuest,
  greetingFamily,
  lineOne,
  lineTwo,
  saveDateLabel,
  monthYear,
  weekdays,
  answerButtonLabel,
}: Props) {
  const [visible, setVisible] = useState(false)
  const sectionRef = useRef<HTMLElement | null>(null)



  useEffect(() => {
    const element = sectionRef.current
    if (!element) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          observer.disconnect()
        }
      },
      {
        threshold: 0.2,
      }
    )

    observer.observe(element)

    return () => observer.disconnect()
  }, [])

  const greeting = guestName
    ? isFamily
      ? `${greetingFamily} ${guestName},`
      : `${greetingGuest} ${guestName},`
    : `${greetingGuest},`



  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-white px-6 py-20"
    >
      <RibbonsBackground />

      <div
  className={`relative z-10 mx-auto max-w-6xl grid grid-cols-1 gap-14 transition-all duration-1000 ease-out md:grid-cols-[360px_1fr] md:items-start md:gap-x-16 md:gap-y-10 ${
    visible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
  }`}
>
  {/* TEXT */}
  <div className="order-1 text-center space-y-6 md:order-2 md:text-center">
    <h2 className="font-serif-display italic text-[34px] leading-[1.08] text-[#7a2e2a] md:text-[48px] lg:text-[60px]">
      {greeting}
    </h2>

    <p className="mx-auto max-w-3xl font-editorial italic text-[24px] leading-[1.8] text-[#7a2e2a] md:text-[26px]">
      {lineOne}
    </p>

    <p className="mx-auto max-w-3xl font-editorial italic text-[24px] leading-[1.8] text-[#7a2e2a] md:text-[32px]">
      {lineTwo}
    </p>

    <div className="pt-2 font-sans-ui text-[18px] text-[#7a2e2a] md:text-[20px]">
      {saveDateLabel} — {day} {monthYear}
    </div>
    <button
  type="button"
  onClick={() => {
    const el = document.getElementById('rsvp')
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }}
  className="inline-flex items-center justify-center rounded-full border border-[#7a2e2a] px-8 py-3 font-sans-ui text-[16px] text-[#7a2e2a] transition hover:bg-[#7a2e2a] hover:text-white"
>
  {answerButtonLabel}
</button>
  </div>

  {/* CALENDAR */}
  <div className="order-2 mx-auto w-full max-w-[360px] md:order-1 md:row-span-2 md:mx-0">
    <div className="rounded-[2rem] border border-[#eaded8] bg-white p-8 shadow-sm">
      <div className="text-center font-editorial text-[32px] italic text-[#7a2e2a] md:text-[36px]">
        {monthYear}
      </div>

      <div className="mt-6 grid grid-cols-7 text-center font-sans-ui text-sm text-[#b08e85]">
        {weekdays.map((d) => (
          <div key={d}>{d}</div>
        ))}
      </div>

      <div className="mt-4 h-px bg-[#efe4de]" />

      <div className="mt-6 grid grid-cols-7 gap-y-6 text-center font-sans-ui text-[18px] text-[#7a2e2a]">
        <div></div>

        {Array.from({ length: 30 }).map((_, i) => {
          const dayNumber = i + 1
          const isWeddingDay = dayNumber === Number(day)

          return (
            <div key={i} className="relative flex justify-center">
              {isWeddingDay ? (
                <span className="relative font-medium text-[#7a2e2a]">
                  {dayNumber}
                  <span className="absolute -right-3 -top-3 text-[35px] text-[#7a2e2a]">
                    ♡
                  </span>
                </span>
              ) : (
                dayNumber
              )}
            </div>
          )
        })}
      </div>
    </div>
  </div>



</div>
    </section>
  )
}