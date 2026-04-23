'use client'

import { AnimatePresence, motion } from 'framer-motion'
import { useState } from 'react'

type FaqItem = {
  question: string
  answer: readonly string[]
}

type Props = {
  title: string
  introLineOne: string
  introLineTwo: string
  items: readonly FaqItem[]
}

function ChevronIcon({ open }: { open: boolean }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={`h-7 w-7 text-[#6f7f57] transition-transform duration-300 ${open ? 'rotate-180' : ''}`}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.9"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M6 9l6 6 6-6" />
    </svg>
  )
}

function FaqAccordionItem({
  item,
  isOpen,
  onToggle,
}: {
  item: FaqItem
  isOpen: boolean
  onToggle: () => void
}) {
  return (
    <div className="border border-[#6f7f57]/20 bg-[#f3efe8]">
      <button
        type="button"
        onClick={onToggle}
        className="flex w-full items-center justify-between gap-6 px-6 py-7 text-left md:px-10 md:py-9"
      >
        <span className="font-serif text-[2.2rem] font-semibold leading-[1.08] tracking-[-0.03em] text-[#5f6d49] md:text-[3rem]">
          {item.question}
        </span>
        <ChevronIcon open={isOpen} />
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: 'easeOut' }}
            className="overflow-hidden"
          >
            <div className="px-6 pb-7 md:px-10 md:pb-9">
              <div className="space-y-5">
                {item.answer.map((paragraph, index) => (
                  <p
                    key={index}
                    className="font-serif text-[1.38rem] font-normal leading-[1.82] tracking-[-0.01em] text-[#6f7f57]/88 md:text-[1.68rem]"
                  >
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default function QuestionsAnswersSection({
  title,
  introLineOne,
  introLineTwo,
  items,
}: Props) {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  return (
    <section className="bg-[#f3efe8] px-6 pb-18 pt-24 sm:px-6 md:px-8 md:pb-22 md:pt-28 lg:px-10 xl:px-14 xl:pb-28 xl:pt-32">
      <div className="mx-auto w-full max-w-[1560px]">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.24 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="max-w-[1180px]"
        >
          <h1 className="font-serif text-[3.7rem] italic leading-[0.9] tracking-[-0.04em] text-[#6f7f57] sm:text-[5rem] md:text-[6.4rem] lg:text-[7.3rem] xl:text-[8.2rem]">
            {title}
          </h1>

          <div className="mt-10 max-w-[1200px] space-y-4 md:mt-12 md:space-y-5">
            <p className="font-serif text-[1.6rem] leading-[1.7] text-[#6f7f57] sm:text-[1.85rem] md:text-[2.05rem]">
              {introLineOne}
            </p>
            <p className="font-serif text-[1.6rem] leading-[1.7] text-[#6f7f57] sm:text-[1.85rem] md:text-[2.05rem]">
              {introLineTwo}
            </p>
          </div>
        </motion.div>

        <div className="mt-16 space-y-5 md:mt-20 md:space-y-6">
          {items.map((item, index) => (
            <FaqAccordionItem
              key={item.question}
              item={item}
              isOpen={openIndex === index}
              onToggle={() => setOpenIndex(openIndex === index ? null : index)}
            />
          ))}
        </div>
      </div>
    </section>
  )
}