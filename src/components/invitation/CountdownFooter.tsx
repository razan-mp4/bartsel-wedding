'use client'

import { useEffect, useMemo, useRef, useState } from 'react'

type TimeLeft = {
  days: number
  hours: number
  minutes: number
  seconds: number
}

type Props = {
  targetDate: string
  daysLabel: string
  hoursLabel: string
  minutesLabel: string
  secondsLabel: string
  footerText: string
}

function getTimeLeft(targetDate: string): TimeLeft {
  const diff = new Date(targetDate).getTime() - Date.now()

  if (diff <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0 }
  }

  const days = Math.floor(diff / (1000 * 60 * 60 * 24))
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24)
  const minutes = Math.floor((diff / (1000 * 60)) % 60)
  const seconds = Math.floor((diff / 1000) % 60)

  return { days, hours, minutes, seconds }
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
        rootMargin: '-10% 0px -20% 0px',
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
        viewBox="0 0 1000 1200"
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
          d="M-100 80
             C140 -10, 360 10, 560 120
             C740 220, 900 220, 1120 90"
        />

        <path
          className={`ribbon-path ribbon-path-2 ${
            isVisible ? 'ribbon-path-visible' : 'ribbon-path-hidden'
          }`}
          d="M-120 320
             C120 180, 320 190, 520 300
             C700 405, 860 410, 1120 270"
        />

        <path
          className={`ribbon-path ribbon-path-3 ${
            isVisible ? 'ribbon-path-visible' : 'ribbon-path-hidden'
          }`}
          d="M-100 620
             C140 490, 340 490, 550 605
             C760 720, 900 730, 1140 590"
        />

        <path
          className={`ribbon-path ribbon-path-4 ${
            isVisible ? 'ribbon-path-visible' : 'ribbon-path-hidden'
          }`}
          d="M-80 930
             C150 810, 360 815, 570 910
             C770 1000, 920 1000, 1160 880"
        />
      </svg>

      {/* DESKTOP */}
      <svg
        viewBox="0 0 1400 900"
        preserveAspectRatio="none"
        className={`absolute inset-0 hidden h-full w-full md:block ${
          isVisible ? 'ribbon-bg-visible' : 'ribbon-bg-hidden'
        }`}
        fill="none"
      >
        <path
          className={`ribbon-path ribbon-path-1 ${
            isVisible ? 'ribbon-path-visible' : 'ribbon-path-hidden'
          }`}
          d="M-100 70
             C180 -10, 460 10, 700 90
             C930 165, 1190 160, 1510 55"
        />

        <path
          className={`ribbon-path ribbon-path-2 ${
            isVisible ? 'ribbon-path-visible' : 'ribbon-path-hidden'
          }`}
          d="M-60 300
             C160 140, 420 120, 640 260
             C860 400, 1080 420, 1420 200"
        />

        <path
          className={`ribbon-path ribbon-path-3 ${
            isVisible ? 'ribbon-path-visible' : 'ribbon-path-hidden'
          }`}
          d="M40 640
             C260 720, 520 700, 740 600
             C960 500, 1180 520, 1440 620"
        />

        <path
          className={`ribbon-path ribbon-path-4 ${
            isVisible ? 'ribbon-path-visible' : 'ribbon-path-hidden'
          }`}
          d="M-80 780
             C200 660, 420 700, 640 760
             C860 820, 1080 780, 1460 700"
        />
      </svg>
    </div>
  )
}

export default function CountdownFooter({
  targetDate,
  daysLabel,
  hoursLabel,
  minutesLabel,
  secondsLabel,
  footerText,
}: Props) {
  const [mounted, setMounted] = useState(false)
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  })

  useEffect(() => {
    setMounted(true)

    const update = () => {
      setTimeLeft(getTimeLeft(targetDate))
    }

    update()

    const timer = setInterval(update, 1000)

    return () => clearInterval(timer)
  }, [targetDate])

  const items = useMemo(
    () => [
      { value: timeLeft.days, label: daysLabel },
      { value: timeLeft.hours, label: hoursLabel },
      { value: timeLeft.minutes, label: minutesLabel },
      { value: timeLeft.seconds, label: secondsLabel },
    ],
    [timeLeft, daysLabel, hoursLabel, minutesLabel, secondsLabel]
  )

  const emptyItems = [
    { value: 0, label: daysLabel },
    { value: 0, label: hoursLabel },
    { value: 0, label: minutesLabel },
    { value: 0, label: secondsLabel },
  ]

  const renderItems = mounted ? items : emptyItems

  return (
    <footer className="relative overflow-hidden bg-white px-4 py-8 md:px-6 md:py-12">
      <RibbonsBackground />

      <div className="relative z-10 mx-auto max-w-7xl text-center">
        <div className="flex flex-wrap items-start justify-center gap-x-3 gap-y-4 md:flex-nowrap md:gap-8">
          {renderItems.map((item, index) => (
            <div key={item.label} className="flex items-start gap-2 md:gap-8">
              <div className="min-w-[82px] sm:min-w-[92px] md:min-w-[160px]">
                <div className="font-serif-display text-[clamp(2.6rem,8vw,4rem)] leading-none text-[#7a2e2a] md:text-[96px]">
                  {item.value}
                </div>

                <div className="mt-2 whitespace-nowrap font-sans-ui text-[clamp(0.72rem,2.4vw,0.95rem)] uppercase tracking-[0.16em] text-[#7a2e2a]/70 md:text-[18px] md:tracking-[0.35em]">
                  {item.label}
                </div>
              </div>

              {index < renderItems.length - 1 ? (
                <div className="hidden pt-1 font-serif-display leading-none text-[#7a2e2a]/35 md:block md:pt-3 md:text-6xl">
                  •
                </div>
              ) : null}
            </div>
          ))}
        </div>

        <p className="mt-6 font-editorial italic text-[clamp(1.25rem,4.8vw,1.7rem)] text-[#7a2e2a]/80 md:mt-8 md:text-[32px]">
          {footerText}
        </p>
      </div>
    </footer>
  )
}