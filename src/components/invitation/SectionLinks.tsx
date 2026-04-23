'use client'

import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'

type SectionItem = {
  title: string
  href: string
  image: string
  number: string
}

type Props = {
  introText: string
  items: SectionItem[]
}

export default function SectionLinks({ introText, items }: Props) {
  const sectionRef = useRef<HTMLElement | null>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = sectionRef.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          observer.disconnect()
        }
      },
      {
        threshold: 0.12,
      }
    )

    observer.observe(el)

    return () => observer.disconnect()
  }, [])

  return (
    <section ref={sectionRef} className="bg-[#f3efe8] px-6 py-10">
      <div className="mx-auto max-w-6xl">
        <div
          className={`mb-12 text-center transition-all duration-1000 ease-out ${
            visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
          }`}
        >
          <p className="font-editorial italic text-[30px] md:text-[44px] leading-[1.3] text-[#6f7f57]">
            {introText}
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 md:gap-8">
          {items.map((item, index) => (
            <Link
              key={item.href}
              href={item.href}
              className={`group relative block overflow-hidden bg-black transition-all duration-1000 ease-out ${
                visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}
              style={{
                transitionDelay: `${index * 140}ms`,
              }}
            >
              <div className="relative aspect-[1.1/0.95] md:aspect-[1.18/0.88] overflow-hidden">
                <img
                  src={item.image}
                  alt={item.title}
                  className="h-full w-full object-cover transition duration-700 ease-out group-hover:scale-[1.03]"
                />

                <div className="absolute inset-0 bg-black/22 transition duration-500 group-hover:bg-black/28" />

                <div className="absolute inset-x-0 bottom-0 p-8 md:p-9 text-white">
                  <div className="mb-4 text-[18px] tracking-[0.2em] text-white/75 font-sans-ui">
                    {item.number}
                  </div>

                  <div className="font-serif-display italic text-[38px] md:text-[46px] leading-[1.05]">
                    {item.title}
                  </div>

                  <div className="mt-4 h-px w-14 bg-white/70 transition-all duration-500 ease-out group-hover:w-24" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}