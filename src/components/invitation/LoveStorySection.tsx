'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'

type Props = {
  title: string
  hashtag: string
  paragraphs: readonly string[]
}

const imagesTop = [
  {
    src: '/sections/love-story-1.webp',
    alt: 'Couple photo 1',
  },
  {
    src: '/sections/love-story-2.webp',
    alt: 'Couple photo 2',
  },
  {
    src: '/sections/love-story-3.webp',
    alt: 'Couple photo 3',
  },
]

const imagesBottom = [
  {
    src: '/sections/love-story-4.webp',
    alt: 'Couple photo 4',
  },
  {
    src: '/sections/love-story-5.webp',
    alt: 'Couple photo 5',
  },
  {
    src: '/sections/love-story-6.webp',
    alt: 'Couple photo 6',
  },
]

function StoryImage({
  src,
  alt,
  className,
  delay = 0,
  sizes = '(max-width: 768px) 100vw, 40vw',
}: {
  src: string
  alt: string
  className?: string
  delay?: number
  sizes?: string
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 28, rotate: 0.4 }}
      whileInView={{ opacity: 1, y: 0, rotate: 0 }}
      viewport={{ once: true, amount: 0.18 }}
      transition={{ duration: 0.9, ease: 'easeOut', delay }}
      className={`relative overflow-hidden bg-[#6f7f57] p-3 shadow-[0_18px_60px_rgba(0,0,0,0.08)] ${className ?? ''}`}
    >
      <div className="relative h-full w-full overflow-hidden">
        <Image
          src={src}
          alt={alt}
          fill
          className="object-cover grayscale transition-transform duration-700 hover:scale-[1.03]"
          sizes={sizes}
        />
      </div>
    </motion.div>
  )
}

export default function LoveStorySection({
  title,
  hashtag,
  paragraphs,
}: Props) {
  const splitIndex = Math.ceil(paragraphs.length / 2)
  const topParagraphs = paragraphs.slice(0, splitIndex)
  const bottomParagraphs = paragraphs.slice(splitIndex)

  const desktopSectionRef = useRef<HTMLDivElement | null>(null)
  const desktopImagesRef = useRef<HTMLDivElement | null>(null)
  const desktopTextRef = useRef<HTMLDivElement | null>(null)

  const [maxShift, setMaxShift] = useState(0)

  useEffect(() => {
    const updateHeights = () => {
      const imagesHeight = desktopImagesRef.current?.offsetHeight ?? 0
      const textHeight = desktopTextRef.current?.offsetHeight ?? 0
      const diff = Math.max(textHeight - imagesHeight, 0)
      setMaxShift(diff)
    }

    updateHeights()

    const resizeObserver = new ResizeObserver(() => {
      updateHeights()
    })

    if (desktopImagesRef.current) resizeObserver.observe(desktopImagesRef.current)
    if (desktopTextRef.current) resizeObserver.observe(desktopTextRef.current)

    window.addEventListener('resize', updateHeights)

    return () => {
      resizeObserver.disconnect()
      window.removeEventListener('resize', updateHeights)
    }
  }, [paragraphs])

  const { scrollYProgress } = useScroll({
    target: desktopSectionRef,
    offset: ['start 12%', 'end 88%'],
  })

  const desktopImagesY = useTransform(scrollYProgress, [0, 1], [0, maxShift])

  return (
    <section className="bg-[#f3efe8] px-5 pt-24 pb-16 sm:px-6 md:px-8 md:pt-28 md:pb-20 lg:px-10 xl:px-14 xl:pt-32 xl:pb-28">
      <div className="mx-auto w-full max-w-[1560px]">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="mb-12 md:mb-16 xl:mb-20"
        >
          <h1 className="max-w-full break-words font-serif text-[3.6rem] italic leading-[0.9] tracking-[-0.04em] text-[#6f7f57] sm:text-[5rem] md:text-[6.4rem] lg:text-[7.4rem] xl:text-[8.6rem] 2xl:text-[9rem]">
            {title}
          </h1>

          <p className="mt-4 font-serif text-[1.35rem] italic text-[#7a2e2a] sm:text-[1.6rem] md:text-[1.8rem]">
            {hashtag}
          </p>
        </motion.div>

        {/* MOBILE + TABLET + SMALL LAPTOP */}
        <div className="xl:hidden">
          <div className="mb-10 grid grid-cols-2 gap-4 md:gap-5">
            <StoryImage
              src={imagesTop[0].src}
              alt={imagesTop[0].alt}
              className="col-span-2 aspect-[1.12/1]"
              delay={0.05}
              sizes="(max-width: 1279px) 100vw, 50vw"
            />
            <StoryImage
              src={imagesTop[1].src}
              alt={imagesTop[1].alt}
              className="aspect-[0.82/1]"
              delay={0.1}
              sizes="(max-width: 1279px) 50vw, 25vw"
            />
            <StoryImage
              src={imagesTop[2].src}
              alt={imagesTop[2].alt}
              className="aspect-[0.82/1] mt-8"
              delay={0.15}
              sizes="(max-width: 1279px) 50vw, 25vw"
            />
          </div>

          <div className="space-y-7 md:space-y-8">
            {topParagraphs.map((paragraph, index) => (
              <motion.p
                key={`top-${index}`}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.7, ease: 'easeOut', delay: index * 0.03 }}
                className="font-serif text-[1.7rem] leading-[1.82] text-[#6f7f57] sm:text-[1.9rem] md:text-[2.15rem] lg:text-[2.35rem]"
              >
                {paragraph}
              </motion.p>
            ))}
          </div>

          <div className="my-10 grid grid-cols-2 gap-4 md:my-12 md:gap-5">
            <StoryImage
              src={imagesBottom[0].src}
              alt={imagesBottom[0].alt}
              className="col-span-2 aspect-[1.52/1]"
              delay={0.05}
              sizes="(max-width: 1279px) 100vw, 50vw"
            />
            <StoryImage
              src={imagesBottom[1].src}
              alt={imagesBottom[1].alt}
              className="aspect-[0.82/1] mt-6"
              delay={0.1}
              sizes="(max-width: 1279px) 50vw, 25vw"
            />
            <StoryImage
              src={imagesBottom[2].src}
              alt={imagesBottom[2].alt}
              className="aspect-[0.82/1]"
              delay={0.15}
              sizes="(max-width: 1279px) 50vw, 25vw"
            />
          </div>

          <div className="space-y-7 md:space-y-8">
            {bottomParagraphs.map((paragraph, index) => (
              <motion.p
                key={`bottom-${index}`}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.7, ease: 'easeOut', delay: index * 0.03 }}
                className="font-serif text-[1.7rem] leading-[1.82] text-[#6f7f57] sm:text-[1.9rem] md:text-[2.15rem] lg:text-[2.35rem]"
              >
                {paragraph}
              </motion.p>
            ))}
          </div>
        </div>

        {/* TRUE DESKTOP ONLY */}
        <div
          ref={desktopSectionRef}
          className="hidden xl:grid xl:grid-cols-[minmax(320px,0.85fr)_minmax(0,1.15fr)] xl:items-start xl:gap-14 2xl:gap-20"
        >
          {/* LEFT - IMAGES */}
          <motion.div style={{ y: desktopImagesY }} className="min-w-0 will-change-transform">
            <div ref={desktopImagesRef} className="grid grid-cols-2 gap-5 2xl:gap-6">
              <StoryImage
                src={imagesTop[0].src}
                alt={imagesTop[0].alt}
                className="col-span-2 aspect-[1.08/1]"
                delay={0.05}
                sizes="(max-width: 1535px) 36vw, 32vw"
              />
              <StoryImage
                src={imagesTop[1].src}
                alt={imagesTop[1].alt}
                className="aspect-[0.82/1]"
                delay={0.1}
                sizes="(max-width: 1535px) 18vw, 16vw"
              />
              <StoryImage
                src={imagesTop[2].src}
                alt={imagesTop[2].alt}
                className="aspect-[0.82/1] mt-10"
                delay={0.15}
                sizes="(max-width: 1535px) 18vw, 16vw"
              />
              <StoryImage
                src={imagesBottom[0].src}
                alt={imagesBottom[0].alt}
                className="col-span-2 aspect-[1.5/1] mt-3"
                delay={0.2}
                sizes="(max-width: 1535px) 36vw, 32vw"
              />
              <StoryImage
                src={imagesBottom[1].src}
                alt={imagesBottom[1].alt}
                className="aspect-[0.84/1] mt-4"
                delay={0.25}
                sizes="(max-width: 1535px) 18vw, 16vw"
              />
              <StoryImage
                src={imagesBottom[2].src}
                alt={imagesBottom[2].alt}
                className="aspect-[0.84/1] mt-4"
                delay={0.3}
                sizes="(max-width: 1535px) 18vw, 16vw"
              />
            </div>
          </motion.div>

          {/* RIGHT - TEXT */}
          <div ref={desktopTextRef} className="min-w-0 space-y-8 2xl:space-y-10">
            {paragraphs.map((paragraph, index) => (
              <motion.p
                key={index}
                initial={{ opacity: 0, y: 22 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.16 }}
                transition={{ duration: 0.75, ease: 'easeOut', delay: index * 0.02 }}
                className="max-w-full break-words font-serif text-[1.7rem] leading-[1.72] text-[#6f7f57] xl:text-[1.95rem] 2xl:text-[2.1rem]"
              >
                {paragraph}
              </motion.p>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}