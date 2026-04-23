'use client'

import { AnimatePresence, motion, type Variants } from 'framer-motion'
import {
  BedDouble,
  CarFront,
  ChevronLeft,
  ChevronRight,
  Clock3,
  ExternalLink,
  Heart,
  Hotel,
  House,
  MapPin,
  Music4,
  Sparkles,
  UtensilsCrossed,
} from 'lucide-react'
import Image from 'next/image'
import { useMemo, useState } from 'react'

type ScheduleItem = {
  time: string
  title: string
  icon: 'hotel' | 'music' | 'heart' | 'utensils'
}

type DressCodeSlide = {
  src: string
  alt: string
}

type DetailsTranslations = {
  introParagraphs: readonly string[]
  locationTitle: string
  locationPlace: string
  locationText: string

  venueTitle: string
  venueName: string
  venueAddress: string
  venueMapButton: string
  venueHotelButton: string

  accommodationTitle: string
  accommodationParagraphs: readonly string[]

  arrivalTitle: string
  arrivalParagraphs: readonly string[]

  scheduleTitle: string
  scheduleItems: readonly ScheduleItem[]

  dressCodeTitle: string
  dressCodeParagraphs: readonly string[]
  weatherNote: string
  nextLabel: string
  previousLabel: string

  dressCodePaletteLabel?: string
}

type Props = {
  title: string
  content: DetailsTranslations
}

const GREEN = '#6f7f57'
const GREEN_DARK = '#5f6e49'
const BEIGE = '#f3efe8'
const BEIGE_CARD = '#f5f1ea'
const BEIGE_SOFT = '#e8dfd2'
const BORDER = '#d8d0c4'

const dressCodeSlides = [
  { src: '/sections/dresscode-4.webp', alt: 'Dress code inspiration 1' },
  { src: '/sections/dresscode-5.webp', alt: 'Dress code inspiration 2' },
  { src: '/sections/dresscode-6.webp', alt: 'Dress code inspiration 3' },
] as const

const palette = [
  '#ece8e1',
  '#d9d1c5',
  '#988061',
  '#70853a',
  '#42572c',
  '#574345',
  '#7d2d38',
] as const

const sectionFade: Variants = {
  hidden: { opacity: 0, y: 34 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.75,
      ease: 'easeOut',
    },
  },
}

function SectionHeading({
  icon,
  title,
}: {
  icon: React.ReactNode
  title: string
}) {
  return (
    <div className="mb-6 flex items-center gap-4 md:mb-8">
      <div style={{ color: GREEN }}>{icon}</div>
      <h2
        className="font-serif text-[2rem] leading-none md:text-[2.7rem]"
        style={{ color: GREEN }}
      >
        {title}
      </h2>
    </div>
  )
}

function ImageCard({
  src,
  alt,
  className = '',
}: {
  src: string
  alt: string
  className?: string
}) {
  return (
    <motion.div
      variants={sectionFade}
      className={`relative overflow-hidden bg-[#e8dfd2] ${className}`}
    >
      <Image src={src} alt={alt} fill className="object-cover" />
    </motion.div>
  )
}

function LinkButton({
  href,
  label,
}: {
  href: string
  label: string
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className="inline-flex items-center gap-3 border px-5 py-4 transition hover:bg-white/40"
      style={{
        borderColor: `${GREEN}99`,
        color: GREEN,
      }}
    >
      <ExternalLink className="h-5 w-5" />
      <span className="font-sans-ui text-[1rem] md:text-[1.1rem]">{label}</span>
    </a>
  )
}

function ScheduleIcon({ type }: { type: ScheduleItem['icon'] }) {
  switch (type) {
    case 'hotel':
      return <Hotel className="h-6 w-6" style={{ color: GREEN }} strokeWidth={1.8} />
    case 'music':
      return <Music4 className="h-6 w-6" style={{ color: GREEN }} strokeWidth={1.8} />
    case 'heart':
      return <Heart className="h-6 w-6" style={{ color: GREEN }} strokeWidth={1.8} />
    case 'utensils':
      return <UtensilsCrossed className="h-6 w-6" style={{ color: GREEN }} strokeWidth={1.8} />
    default:
      return null
  }
}

function DressCodeGlow() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 1 }}
        className="absolute left-[4%] top-[8%] h-[220px] w-[220px] rounded-full blur-3xl"
        style={{ backgroundColor: 'rgba(111,127,87,0.08)' }}
      />
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 1, delay: 0.15 }}
        className="absolute right-[6%] top-[36%] h-[200px] w-[200px] rounded-full blur-3xl"
        style={{ backgroundColor: 'rgba(111,127,87,0.06)' }}
      />
    </div>
  )
}

function DressCodeCarousel({
  slides,
  previousLabel,
  nextLabel,
}: {
  slides: readonly DressCodeSlide[]
  previousLabel: string
  nextLabel: string
}) {
  const [index, setIndex] = useState(0)

  const current = useMemo(() => slides[index], [slides, index])

  function goPrevious() {
    setIndex((prev) => (prev - 1 + slides.length) % slides.length)
  }

  function goNext() {
    setIndex((prev) => (prev + 1) % slides.length)
  }

  return (
    <div className="w-full">
      <div
        className="relative overflow-hidden border p-4 md:p-5"
        style={{
          backgroundColor: BEIGE_SOFT,
          borderColor: BORDER,
        }}
      >
        <div className="relative aspect-[0.8/1] w-full overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={current.src}
              initial={{ opacity: 0, x: 24, scale: 0.98 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: -24, scale: 0.98 }}
              transition={{ duration: 0.45, ease: 'easeOut' }}
              className="absolute inset-0"
            >
              <div className="relative h-full w-full">
<Image
  src={current.src}
  alt={current.alt}
  fill
  className="object-contain scale-[1.5]"
/>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="mt-4 flex items-center justify-between gap-3">
          <button
            type="button"
            onClick={goPrevious}
            aria-label={previousLabel}
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border transition hover:bg-white/50"
            style={{
              borderColor: `${GREEN}55`,
              color: GREEN,
            }}
          >
            <ChevronLeft className="h-5 w-5" />
          </button>

          <div className="flex items-center gap-2">
            {slides.map((_, dotIndex) => (
              <button
                key={dotIndex}
                type="button"
                onClick={() => setIndex(dotIndex)}
                aria-label={`Go to slide ${dotIndex + 1}`}
                className="h-2.5 w-2.5 rounded-full transition"
                style={{
                  backgroundColor: dotIndex === index ? GREEN : '#cdbfae',
                  transform: dotIndex === index ? 'scale(1.08)' : 'scale(1)',
                }}
              />
            ))}
          </div>

          <button
            type="button"
            onClick={goNext}
            aria-label={nextLabel}
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border transition hover:bg-white/50"
            style={{
              borderColor: `${GREEN}55`,
              color: GREEN,
            }}
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  )
}

export default function TheDetailsSection({ title, content }: Props) {
  return (
    <section
      className="px-6 pb-20 pt-24 sm:px-6 md:px-8 md:pt-28 lg:px-10 xl:px-14 xl:pb-28 xl:pt-32"
      style={{ backgroundColor: BEIGE }}
    >
      <div className="mx-auto max-w-[1560px]">
        {/* INTRO */}
        <motion.div
          variants={sectionFade}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.12 }}
          className="grid gap-10 xl:grid-cols-[0.92fr_0.88fr] xl:items-start xl:gap-16"
        >
          <div>
            <h1
              className="font-serif text-[3.7rem] italic leading-[0.9] tracking-[-0.04em] sm:text-[5rem] md:text-[6.4rem] lg:text-[7.3rem] xl:text-[8.2rem]"
              style={{ color: GREEN }}
            >
              {title}
            </h1>

            <div className="mt-12 max-w-[760px] space-y-8">
              {content.introParagraphs.map((paragraph) => (
                <p
                  key={paragraph}
                  className="font-serif text-[1.28rem] leading-[1.72] md:text-[1.55rem]"
                  style={{ color: GREEN }}
                >
                  {paragraph}
                </p>
              ))}
            </div>
          </div>

          <motion.div
            variants={sectionFade}
            className="relative aspect-[0.85/1.15] min-h-[420px] overflow-hidden"
          >
            <Image
              src="/sections/details-gudauri-main.png"
              alt="Gudauri mountains"
              fill
              className="object-cover"
            />
          </motion.div>
        </motion.div>

        {/* LOCATION */}
        <motion.div
          variants={sectionFade}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.12 }}
          className="mt-24"
        >
          <SectionHeading
            icon={<MapPin className="h-8 w-8" strokeWidth={1.8} />}
            title={content.locationTitle}
          />

          <div className="space-y-4">
            <p
              className="font-serif text-[1.4rem] leading-[1.55] md:text-[1.65rem]"
              style={{ color: GREEN }}
            >
              {content.locationPlace}
            </p>
            <p
              className="font-serif text-[1.35rem] leading-[1.65] md:text-[1.55rem]"
              style={{ color: GREEN }}
            >
              {content.locationText}
            </p>
          </div>

          <div className="mt-8 overflow-hidden">
            <iframe
              title="Gudauri map"
              src="https://www.google.com/maps?q=Gudauri,Georgia&z=13&output=embed"
              className="h-[420px] w-full border-0"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </motion.div>

        {/* VENUE & STAY */}
        <motion.div
          variants={sectionFade}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.12 }}
          className="mt-24"
        >
          <SectionHeading
            icon={<House className="h-8 w-8" strokeWidth={1.8} />}
            title={content.venueTitle}
          />

          <div className="space-y-3">
            <p
              className="font-serif text-[1.65rem] leading-[1.4] md:text-[1.95rem]"
              style={{ color: GREEN }}
            >
              {content.venueName}
            </p>
            <p
              className="font-serif text-[1.2rem] leading-[1.6] md:text-[1.4rem]"
              style={{ color: GREEN }}
            >
              {content.venueAddress}
            </p>
          </div>

          <div className="mt-6 flex flex-wrap gap-4">
            <LinkButton
              href="https://maps.google.com/?q=Hotel+Monte+Gudauri"
              label={content.venueMapButton}
            />
            <LinkButton
              href="https://hotel-monte.booked.net/"
              label={content.venueHotelButton}
            />
          </div>

          <div className="mt-10 grid gap-5 md:grid-cols-3">
            <ImageCard
              src="/sections/venue-1.webp"
              alt="Venue photo 1"
              className="aspect-[1.1/1]"
            />
            <ImageCard
              src="/sections/venue-2.webp"
              alt="Venue photo 2"
              className="aspect-[1.1/1]"
            />
            <ImageCard
              src="/sections/venue-3.webp"
              alt="Venue photo 3"
              className="aspect-[1.1/1]"
            />
          </div>
        </motion.div>

        {/* ACCOMMODATION */}
        <motion.div
          variants={sectionFade}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.12 }}
          className="mt-24"
        >
          <SectionHeading
            icon={<BedDouble className="h-8 w-8" strokeWidth={1.8} />}
            title={content.accommodationTitle}
          />

          <div className="max-w-[1100px] space-y-7">
            {content.accommodationParagraphs.map((paragraph) => (
              <p
                key={paragraph}
                className="font-serif text-[1.28rem] leading-[1.72] md:text-[1.52rem]"
                style={{ color: GREEN }}
              >
                {paragraph}
              </p>
            ))}
          </div>

          <div className="mt-10 grid gap-5 md:grid-cols-3">
            <ImageCard
              src="/sections/accommodation-1.webp"
              alt="Accommodation photo 1"
              className="aspect-[1.1/1]"
            />
            <ImageCard
              src="/sections/accommodation-2.webp"
              alt="Accommodation photo 2"
              className="aspect-[1.1/1]"
            />
            <ImageCard
              src="/sections/accommodation-3.webp"
              alt="Accommodation photo 3"
              className="aspect-[1.1/1]"
            />
          </div>
        </motion.div>

        {/* ARRIVAL */}
        <motion.div
          variants={sectionFade}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.12 }}
          className="mt-24"
        >
          <SectionHeading
            icon={<CarFront className="h-8 w-8" strokeWidth={1.8} />}
            title={content.arrivalTitle}
          />

          <div className="max-w-[1100px] space-y-7">
            {content.arrivalParagraphs.map((paragraph) => (
              <p
                key={paragraph}
                className="font-serif text-[1.28rem] leading-[1.72] md:text-[1.52rem]"
                style={{ color: GREEN }}
              >
                {paragraph}
              </p>
            ))}
          </div>
        </motion.div>

        {/* SCHEDULE */}
        <motion.div
          variants={sectionFade}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.12 }}
          className="mt-24"
        >
          <SectionHeading
            icon={<Clock3 className="h-8 w-8" strokeWidth={1.8} />}
            title={content.scheduleTitle}
          />

          <div className="mt-8">
            {content.scheduleItems.map((item, index) => (
              <motion.div
                key={item.time + item.title}
                initial={{ opacity: 0, y: 22 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.55, delay: index * 0.06 }}
                className={`flex gap-5 py-9 ${
                  index !== 0 ? 'border-t' : ''
                }`}
                style={{
                  borderColor: index !== 0 ? BORDER : undefined,
                }}
              >
                <div
                  className="flex h-[64px] w-[64px] shrink-0 items-center justify-center rounded-full"
                  style={{ backgroundColor: '#ebe3d7' }}
                >
                  <ScheduleIcon type={item.icon} />
                </div>

                <div>
                  <p
                    className="font-sans-ui text-[1.15rem] font-semibold md:text-[1.4rem]"
                    style={{ color: GREEN }}
                  >
                    {item.time}
                  </p>
                  <p
                    className="mt-1 font-serif text-[1.28rem] leading-[1.52] md:text-[1.55rem]"
                    style={{ color: GREEN }}
                  >
                    {item.title}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* DRESS CODE */}
        <motion.div
          variants={sectionFade}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.1 }}
          className="relative mt-24 overflow-hidden border px-6 py-10 md:px-10 md:py-12"
          style={{
            backgroundColor: BEIGE_CARD,
            borderColor: BORDER,
          }}
        >
          <DressCodeGlow />

          <div className="relative z-10">
            <SectionHeading
              icon={<Sparkles className="h-8 w-8" strokeWidth={1.8} />}
              title={content.dressCodeTitle}
            />

            <div className="grid gap-10 lg:grid-cols-[1.06fr_0.78fr] lg:items-start lg:gap-12">
              <div>
                <div className="max-w-[900px] space-y-7">
                  {content.dressCodeParagraphs.map((paragraph) => (
                    <p
                      key={paragraph}
                      className="font-serif text-[1.28rem] leading-[1.72] md:text-[1.52rem]"
                      style={{ color: GREEN }}
                    >
                      {paragraph}
                    </p>
                  ))}
                </div>

                <div className="mt-8 flex flex-wrap gap-4">
                  {palette.map((color) => (
                    <motion.div
                      key={color}
                      initial={{ opacity: 0, y: 12 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, amount: 0.4 }}
                      transition={{ duration: 0.45 }}
                      className="h-[62px] w-[62px] rounded-full border"
                      style={{
                        backgroundColor: color,
                        borderColor: '#cfc6ba',
                      }}
                    />
                  ))}
                </div>

                <p
                  className="mt-10 font-serif text-[1.18rem] italic leading-[1.65] md:text-[1.35rem]"
                  style={{ color: GREEN }}
                >
                  {content.weatherNote}
                </p>
              </div>

              <motion.div
                initial={{ opacity: 0, x: 26 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.25 }}
                transition={{ duration: 0.65 }}
                className="w-full"
              >
                <DressCodeCarousel
                  slides={dressCodeSlides}
                  previousLabel={content.previousLabel}
                  nextLabel={content.nextLabel}
                />
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}