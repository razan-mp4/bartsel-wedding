'use client'

import type { TravelIconName, TravelStayContent } from '@/lib/travel-stay-content'
import { motion } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'

type Props = {
  data: TravelStayContent
}

function useDecorativeIconSize(targetRef: React.RefObject<HTMLDivElement | null>) {
  const [size, setSize] = useState({ mobile: 320, desktop: 460 })

  useEffect(() => {
    const update = () => {
      const el = targetRef.current
      if (!el) return

      const height = el.offsetHeight
      const isDesktop = window.innerWidth >= 768

      if (isDesktop) {
const desktop = Math.max(440, Math.min(760, Math.round(height * 0.9)))
const mobile = Math.max(300, Math.min(460, Math.round(desktop * 0.72)))
        setSize({ mobile, desktop })
      } else {
const mobile = Math.max(280, Math.min(440, Math.round(height * 0.72)))
const desktop = Math.max(440, Math.min(760, Math.round(mobile * 1.55)))
        setSize({ mobile, desktop })
      }
    }

    update()

    const resizeObserver = new ResizeObserver(() => update())
    if (targetRef.current) resizeObserver.observe(targetRef.current)

    window.addEventListener('resize', update)

    return () => {
      resizeObserver.disconnect()
      window.removeEventListener('resize', update)
    }
  }, [targetRef])

  return size
}

function TitleIcon({
  icon,
  accent,
  beige,
}: {
  icon: TravelIconName
  accent: string
  beige: boolean
}) {
  const circleBg = beige ? 'bg-[rgba(111,127,87,0.08)]' : 'bg-[rgba(122,46,42,0.08)]'

  const common = {
    stroke: accent,
    strokeWidth: 1.85,
    strokeLinecap: 'round' as const,
    strokeLinejoin: 'round' as const,
    fill: 'none',
  }

  switch (icon) {
case 'plane':
  return (
    <div className={`flex h-[76px] w-[76px] shrink-0 items-center justify-center rounded-full ${circleBg}`}>
      <svg viewBox="0 0 24 24" className="h-10 w-10" fill="none">
        <path
          {...common}
          d="M21 4L11 14"
        />
        <path
          {...common}
          d="M21 4L15 20L11.8 13.2L5 10L21 4Z"
        />
      </svg>
    </div>
  )

case 'car':
  return (
    <div className={`flex h-[76px] w-[76px] shrink-0 items-center justify-center rounded-full ${circleBg}`}>
      <svg viewBox="0 0 24 24" className="h-10 w-10" fill="none">
        <circle cx="12" cy="12" r="6.5" {...common} />
        <circle cx="12" cy="12" r="1.6" {...common} />
        <path
          {...common}
          d="M12 12L7.5 9.5M12 12L16.5 9.5M12 12V17"
        />
      </svg>
    </div>
  )

    case 'shield':
      return (
        <div className={`flex h-[64px] w-[64px] shrink-0 items-center justify-center rounded-full ${circleBg}`}>
          <svg viewBox="0 0 24 24" className="h-8 w-8" fill="none">
            <path {...common} d="M12 3.5 18.5 6v5.4c0 4.4-2.8 7.6-6.5 9.1-3.7-1.5-6.5-4.7-6.5-9.1V6L12 3.5Z" />
          </svg>
        </div>
      )

    case 'home':
      return (
        <div className={`flex h-[64px] w-[64px] shrink-0 items-center justify-center rounded-full ${circleBg}`}>
          <svg viewBox="0 0 24 24" className="h-8 w-8" fill="none">
            <path {...common} d="M4.5 10.5 12 4.5l7.5 6V19a1 1 0 0 1-1 1h-13a1 1 0 0 1-1-1v-8.5Z" />
            <path {...common} d="M9.5 20v-5h5v5" />
          </svg>
        </div>
      )

    case 'currency':
      return (
        <div className={`flex h-[64px] w-[64px] shrink-0 items-center justify-center rounded-full ${circleBg}`}>
          <svg viewBox="0 0 24 24" className="h-8 w-8" fill="none">
            <path {...common} d="M3.5 7.5h17v9h-17Z" />
            <path {...common} d="M7 12h10" />
            <circle cx="6" cy="9.7" r="0.6" fill={accent} stroke="none" />
            <circle cx="18" cy="14.3" r="0.6" fill={accent} stroke="none" />
          </svg>
        </div>
      )

    case 'route':
      return (
        <div className={`flex h-[64px] w-[64px] shrink-0 items-center justify-center rounded-full ${circleBg}`}>
          <svg viewBox="0 0 24 24" className="h-8 w-8" fill="none">
            <path {...common} d="M12 20s-5.5-5.2-5.5-9.1A5.5 5.5 0 0 1 17.5 11c0 3.9-5.5 9-5.5 9Z" />
            <circle cx="12" cy="10.8" r="1.9" {...common} />
          </svg>
        </div>
      )

    case 'language':
      return (
        <div className={`flex h-[64px] w-[64px] shrink-0 items-center justify-center rounded-full ${circleBg}`}>
          <svg viewBox="0 0 24 24" className="h-8 w-8" fill="none">
            <path {...common} d="M4.5 6.5h8M8.5 6.5c0 5.5-2 8.5-5.2 10.8" />
            <path {...common} d="M5.8 11.2c1.4 1 3 1.8 5 2M15.5 8.5 19.5 19M17.2 14h-3.4" />
          </svg>
        </div>
      )

    case 'weather':
      return (
        <div className={`flex h-[64px] w-[64px] shrink-0 items-center justify-center rounded-full ${circleBg}`}>
          <svg viewBox="0 0 24 24" className="h-8 w-8" fill="none">
            <path {...common} d="M7.2 18h9.1a3.8 3.8 0 0 0 .6-7.6 4.8 4.8 0 0 0-9-1.1A3.4 3.4 0 0 0 7.2 18Z" />
          </svg>
        </div>
      )

    default:
      return null
  }
}

function DecorativeIconBehindText({
  icon,
  accent,
  mobileSize,
  desktopSize,
}: {
  icon: TravelIconName
  accent: string
  mobileSize: number
  desktopSize: number
}) {
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

  const common = {
    stroke: accent,
    strokeWidth: 6.5,
    strokeLinecap: 'round' as const,
    strokeLinejoin: 'round' as const,
    fill: 'none',
  }

  const style = {
    width: `${mobileSize}px`,
    height: `${mobileSize}px`,
    ['--travel-bg-size-md' as string]: `${desktopSize}px`,
  } as React.CSSProperties

  const svgClass = `travel-bg-svg ${isVisible ? 'travel-bg-svg-visible' : 'travel-bg-svg-hidden'}`

  const wrap = (children: React.ReactNode) => (
    <div ref={ref} className="pointer-events-none absolute inset-0 z-0 flex items-center justify-center overflow-visible">
      <svg viewBox="0 0 220 220" className={svgClass} style={style} fill="none">
        {children}
      </svg>
    </div>
  )

  switch (icon) {
case 'plane':
  return wrap(
    <>
      <path
        className={`travel-bg-path ${isVisible ? 'travel-bg-path-visible' : 'travel-bg-path-hidden'}`}
        {...common}
        d="M176 42L94 124"
      />
      <path
        className={`travel-bg-path travel-bg-path-delay ${isVisible ? 'travel-bg-path-visible' : 'travel-bg-path-hidden'}`}
        {...common}
        d="M176 42L126 178L102 122L46 98L176 42Z"
      />
    </>
  )

case 'car':
  return wrap(
    <>
      {/* outer circle */}
      <circle
        className={`travel-bg-path ${isVisible ? 'travel-bg-path-visible' : 'travel-bg-path-hidden'}`}
        cx="110"
        cy="110"
        r="60"
        {...common}
      />

      {/* center hub */}
      <circle
        className={`travel-bg-path travel-bg-path-delay ${isVisible ? 'travel-bg-path-visible' : 'travel-bg-path-hidden'}`}
        cx="110"
        cy="110"
        r="14"
        {...common}
      />

      {/* spokes */}
      <path
        className={`travel-bg-path travel-bg-path-delay-2 ${isVisible ? 'travel-bg-path-visible' : 'travel-bg-path-hidden'}`}
        {...common}
        d="M110 110L65 80M110 110L155 80M110 110V170"
      />
    </>
  )

    case 'shield':
      return wrap(
        <path
          className={`travel-bg-path ${isVisible ? 'travel-bg-path-visible' : 'travel-bg-path-hidden'}`}
          {...common}
          d="M110 38 162 58v43c0 35-22 60-52 71-30-11-52-36-52-71V58l52-20Z"
        />
      )

    case 'home':
      return wrap(
        <>
          <path
            className={`travel-bg-path ${isVisible ? 'travel-bg-path-visible' : 'travel-bg-path-hidden'}`}
            {...common}
            d="M50 102 110 52l60 50v66a8 8 0 0 1-8 8H58a8 8 0 0 1-8-8v-66Z"
          />
          <path
            className={`travel-bg-path travel-bg-path-delay ${isVisible ? 'travel-bg-path-visible' : 'travel-bg-path-hidden'}`}
            {...common}
            d="M89 176v-42h42v42"
          />
        </>
      )

    case 'currency':
      return wrap(
        <>
          <path
            className={`travel-bg-path ${isVisible ? 'travel-bg-path-visible' : 'travel-bg-path-hidden'}`}
            {...common}
            d="M42 75h136v70H42Z"
          />
          <path
            className={`travel-bg-path travel-bg-path-delay ${isVisible ? 'travel-bg-path-visible' : 'travel-bg-path-hidden'}`}
            {...common}
            d="M72 110h76"
          />
          <circle
            className={`travel-bg-path travel-bg-path-delay-2 ${isVisible ? 'travel-bg-path-visible' : 'travel-bg-path-hidden'}`}
            cx="63"
            cy="92"
            r="3"
            {...common}
          />
          <circle
            className={`travel-bg-path travel-bg-path-delay-2 ${isVisible ? 'travel-bg-path-visible' : 'travel-bg-path-hidden'}`}
            cx="157"
            cy="128"
            r="3"
            {...common}
          />
        </>
      )

    case 'route':
      return wrap(
        <>
          <path
            className={`travel-bg-path ${isVisible ? 'travel-bg-path-visible' : 'travel-bg-path-hidden'}`}
            {...common}
            d="M110 180s-44-41-44-73a44 44 0 0 1 88 0c0 32-44 73-44 73Z"
          />
          <circle
            className={`travel-bg-path travel-bg-path-delay ${isVisible ? 'travel-bg-path-visible' : 'travel-bg-path-hidden'}`}
            cx="110"
            cy="107"
            r="15"
            {...common}
          />
        </>
      )

    case 'language':
      return wrap(
        <>
          <path
            className={`travel-bg-path ${isVisible ? 'travel-bg-path-visible' : 'travel-bg-path-hidden'}`}
            {...common}
            d="M48 64h72M84 64c0 42-16 67-47 87"
          />
          <path
            className={`travel-bg-path travel-bg-path-delay ${isVisible ? 'travel-bg-path-visible' : 'travel-bg-path-hidden'}`}
            {...common}
            d="M58 102c14 10 28 16 44 18M132 78l34 86M146 124h-30"
          />
        </>
      )

    case 'weather':
      return wrap(
        <path
          className={`travel-bg-path ${isVisible ? 'travel-bg-path-visible' : 'travel-bg-path-hidden'}`}
          {...common}
          d="M70 150h80a34 34 0 0 0 6-67 43 43 0 0 0-80-10A30 30 0 0 0 70 150Z"
        />
      )

    default:
      return null
  }
}

function ExternalLinkIcon({ color }: { color: string }) {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke={color} strokeWidth="1.9">
      <path d="M14 5h5v5" />
      <path d="M10 14L19 5" />
      <path d="M19 14v4a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1h4" />
    </svg>
  )
}

function TravelBlock({
  item,
  beige,
}: {
  item: TravelStayContent['sections'][number]
  beige: boolean
}) {
  const bg = beige ? 'bg-[#f3efe8]' : 'bg-white'
  const accent = beige ? '#6f7f57' : '#7a2e2a'
  const headingClass = beige ? 'text-[#6f7f57]' : 'text-[#7a2e2a]'
  const bodyClass = beige ? 'text-[#6f7f57]' : 'text-[#7a2e2a]'

  const bgStroke = beige ? 'rgba(111,127,87,0.14)' : 'rgba(122,46,42,0.08)'

  const textAreaRef = useRef<HTMLDivElement | null>(null)
  const decorativeSize = useDecorativeIconSize(textAreaRef)

  return (
    <section className={`${bg} px-6 py-18 md:px-10 md:py-24 xl:px-14`}>
      <div className="mx-auto max-w-[1560px]">
        <motion.div
          initial={{ opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.18 }}
          transition={{ duration: 0.75, ease: 'easeOut' }}
          className="max-w-[1200px]"
        >
          <div className="mb-8 flex items-center gap-5 md:mb-10">
            <TitleIcon icon={item.icon} accent={accent} beige={beige} />
            <h2 className={`font-serif text-[2.4rem] leading-none md:text-[3rem] xl:text-[3.6rem] ${headingClass}`}>
              {item.title}
            </h2>
          </div>

          <div className="relative">
            <DecorativeIconBehindText
              icon={item.icon}
              accent={bgStroke}
              mobileSize={decorativeSize.mobile}
              desktopSize={decorativeSize.desktop}
            />

            <div ref={textAreaRef} className="relative z-10 space-y-6 md:space-y-7">
              {item.paragraphs?.map((paragraph, index) => (
                <motion.p
                  key={index}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.18 }}
                  transition={{ duration: 0.65, ease: 'easeOut', delay: index * 0.03 }}
                  className={`font-serif text-[1.5rem] leading-[1.85] sm:text-[1.7rem] md:text-[1.95rem] ${bodyClass}`}
                >
                  {paragraph}
                </motion.p>
              ))}

              {item.bullets && (
                <ul className="space-y-3 pl-0">
                  {item.bullets.map((bullet, index) => (
                    <li
                      key={index}
                      className={`font-serif text-[1.45rem] leading-[1.8] sm:text-[1.65rem] md:text-[1.9rem] ${bodyClass}`}
                    >
                      — {bullet}
                    </li>
                  ))}
                </ul>
              )}

              {item.areas && (
                <div className="grid gap-4 pt-3 md:gap-6 xl:grid-cols-3">
                  {item.areas.map((area) => (
                    <div
                      key={area.title}
                      className={`border px-6 py-6 md:px-8 md:py-8 ${
                        beige ? 'border-[#6f7f57]/25' : 'border-[#7a2e2a]/20'
                      }`}
                    >
                      <h3 className={`font-serif text-[2rem] md:text-[2.2rem] ${headingClass}`}>
                        {area.title}
                      </h3>
                      <p className={`mt-4 font-serif text-[1.3rem] leading-[1.75] md:text-[1.55rem] ${bodyClass}`}>
                        {area.description}
                      </p>
                    </div>
                  ))}
                </div>
              )}

              {item.links && (
                <div className="flex flex-wrap gap-4 pt-3">
                  {item.links.map((link) => (
                    <a
                      key={link.href}
                      href={link.href}
                      target="_blank"
                      rel="noreferrer"
                      className={`inline-flex items-center gap-3 border px-5 py-4 transition ${
                        beige
                          ? 'border-[#6f7f57]/35 text-[#6f7f57] hover:bg-[#6f7f57]/5'
                          : 'border-[#7a2e2a]/25 text-[#7a2e2a] hover:bg-[#7a2e2a]/5'
                      }`}
                    >
                      <ExternalLinkIcon color={accent} />
                      <span className="font-sans-ui text-[1.15rem] font-medium md:text-[1.25rem]">
                        {link.label}
                      </span>
                    </a>
                  ))}
                </div>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default function TravelStaySection({ data }: Props) {
  return (
    <div>
      <section className="bg-[#f3efe8] px-6 pb-14 pt-24 sm:px-6 md:px-8 md:pb-18 md:pt-28 lg:px-10 xl:px-14 xl:pb-20 xl:pt-32">
        <div className="mx-auto w-full max-w-[1560px]">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.24 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="max-w-[1050px]"
          >
            <h1 className="font-serif text-[3.7rem] italic leading-[0.9] tracking-[-0.04em] text-[#6f7f57] sm:text-[5rem] md:text-[6.4rem] lg:text-[7.3rem] xl:text-[8.2rem]">
              {data.title}
            </h1>

            <div className="mt-10 space-y-6 md:mt-12 md:space-y-7">
              {data.intro.map((paragraph, index) => (
                <p
                  key={index}
                  className="font-serif text-[1.55rem] leading-[1.82] text-[#6f7f57] sm:text-[1.8rem] md:text-[2rem] lg:text-[2.15rem]"
                >
                  {paragraph}
                </p>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {data.sections.map((item, index) => (
        <TravelBlock key={item.title} item={item} beige={index % 2 === 1} />
      ))}
    </div>
  )
}