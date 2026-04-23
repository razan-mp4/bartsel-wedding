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
  stayingAtVenue?: 'YES' | 'NO' | null
  rentingCar?: 'YES' | 'NO' | 'NOT_SURE' | null
  needsTransfer?: 'YES' | 'NO' | null
}

type RSVPContent = {
  title: string
  subtitle: string
  deadlineText: string

  attendingQuestion: string
  attendingQuestionFamily: string
  attendingYesLabel: string
  attendingNoLabel: string

  accommodationQuestion: string
  accommodationYesLabel: string
  accommodationNoLabel: string

  travelQuestion: string
  travelYesLabel: string
  travelNoLabel: string
  travelNotSureLabel: string

  transferQuestion: string
  transferYesLabel: string
  transferNoLabel: string

  savingLabel: string
  savedLabel: string
  giveAnswerLabel: string
}

type Props = {
  slug: string
  guests: Guest[]
  responses: Response[]
  isFamily?: boolean
  content: RSVPContent
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
    </div>
  )
}

export default function RSVPSection({
  slug,
  guests,
  responses,
  isFamily,
  content,
}: Props) {
  const [visible, setVisible] = useState(false)
  const sectionRef = useRef<HTMLElement | null>(null)

  const [currentResponses, setCurrentResponses] = useState(() =>
    guests.map((guest) => {
      const existing = responses.find((r) => r.guestId === guest.id)
      return {
        guestId: guest.id,
        attending:
          existing?.attending === 'YES' || existing?.attending === 'NO'
            ? existing.attending
            : null,
        stayingAtVenue:
          existing?.stayingAtVenue === 'YES' || existing?.stayingAtVenue === 'NO'
            ? existing.stayingAtVenue
            : null,
        rentingCar:
          existing?.rentingCar === 'YES' ||
          existing?.rentingCar === 'NO' ||
          existing?.rentingCar === 'NOT_SURE'
            ? existing.rentingCar
            : null,
        needsTransfer:
          existing?.needsTransfer === 'YES' || existing?.needsTransfer === 'NO'
            ? existing.needsTransfer
            : null,
      }
    })
  )

  const [savingGuestId, setSavingGuestId] = useState<string | null>(null)
  const [savedGuestIds, setSavedGuestIds] = useState<string[]>(
  guests
    .filter((guest) => {
      const existing = responses.find((r) => r.guestId === guest.id)
      return Boolean(
        existing?.attending ||
        existing?.stayingAtVenue ||
        existing?.rentingCar ||
        existing?.needsTransfer
      )
    })
    .map((guest) => guest.id)
)

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
      { threshold: 0.15 }
    )

    observer.observe(element)
    return () => observer.disconnect()
  }, [])

  async function saveGuestResponse(guestId: string, patch: Record<string, unknown>) {
    const nextResponses = currentResponses.map((item) =>
      item.guestId === guestId ? { ...item, ...patch } : item
    )

    setCurrentResponses(nextResponses)
    setSavingGuestId(guestId)

    const res = await fetch(`/api/invitations/${slug}/rsvp`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        responses: nextResponses,
      }),
    })

    setSavingGuestId(null)

    if (res.ok) {
      setSavedGuestIds((prev) =>
        prev.includes(guestId) ? prev : [...prev, guestId]
      )
    }
  }

  function OptionButton({
    selected,
    label,
    onClick,
  }: {
    selected: boolean
    label: string
    onClick: () => void
  }) {
    return (
      <button
        type="button"
        onClick={onClick}
        className={`rounded-full px-6 py-3 font-sans-ui text-[15px] transition ${
          selected
            ? 'bg-[#7a2e2a] text-white'
            : 'border border-[#7a2e2a] bg-white text-[#7a2e2a] hover:bg-[#faf4f2]'
        }`}
      >
        {label}
      </button>
    )
  }

  return (
    <section
      ref={sectionRef}
      id="rsvp"
      className="relative overflow-hidden bg-white px-6 py-20 md:py-24"
    >
      <RibbonsBackground />

      <div
        className={`relative z-10 mx-auto max-w-4xl transition-all duration-1000 ease-out ${
          visible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
        }`}
      >
        <div className="rounded-[2rem] border border-[#eaded8] bg-white/90 p-6 shadow-sm md:p-10">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="font-serif-display italic text-[34px] leading-[1.08] text-[#7a2e2a] md:text-[48px]">
              {content.title}
            </h2>

            <p className="mt-5 font-editorial italic text-[24px] leading-[1.75] text-[#7a2e2a] md:text-[29px]">
              {content.subtitle}
            </p>

            <p className="mt-4 font-sans-ui text-[17px] leading-[1.7] text-[#7a2e2a] md:text-[18px]">
              {content.deadlineText}
            </p>
          </div>

          <div className="mt-10 space-y-6">
            {guests.map((guest) => {
              const current = currentResponses.find((r) => r.guestId === guest.id)
              const isSaving = savingGuestId === guest.id
              const isSaved = savedGuestIds.includes(guest.id)
              const attendingYes = current?.attending === 'YES'

              return (
                <div
                  key={guest.id}
                  className="rounded-[1.5rem] border border-[#eaded8] bg-white p-5 md:p-7"
                >
                  <div className="text-center">
                    <h3 className="font-serif-display italic text-[28px] text-[#7a2e2a] md:text-[34px]">
                      {guest.fullName}
                    </h3>
                  </div>

                  <div className="mt-6 space-y-8">
                    <div className="space-y-4 text-center">
                      <p className="font-sans-ui text-[17px] leading-[1.7] text-[#7a2e2a] md:text-[18px]">
                        {isFamily ? content.attendingQuestionFamily : content.attendingQuestion}
                      </p>

                      <div className="flex flex-wrap justify-center gap-4">
                        <OptionButton
                          selected={current?.attending === 'YES'}
                          label={content.attendingYesLabel}
                          onClick={() => saveGuestResponse(guest.id, { attending: 'YES' })}
                        />
                        <OptionButton
                          selected={current?.attending === 'NO'}
                          label={content.attendingNoLabel}
                          onClick={() =>
                            saveGuestResponse(guest.id, {
                              attending: 'NO',
                              stayingAtVenue: null,
                              rentingCar: null,
                              needsTransfer: null,
                            })
                          }
                        />
                      </div>
                    </div>

                    {attendingYes ? (
                      <>
                        <div className="space-y-4 text-center">
                          <p className="font-sans-ui text-[17px] leading-[1.7] text-[#7a2e2a] md:text-[18px]">
                            {content.accommodationQuestion}
                          </p>

                          <div className="flex flex-wrap justify-center gap-4">
                            <OptionButton
                              selected={current?.stayingAtVenue === 'YES'}
                              label={content.accommodationYesLabel}
                              onClick={() =>
                                saveGuestResponse(guest.id, { stayingAtVenue: 'YES' })
                              }
                            />
                            <OptionButton
                              selected={current?.stayingAtVenue === 'NO'}
                              label={content.accommodationNoLabel}
                              onClick={() =>
                                saveGuestResponse(guest.id, { stayingAtVenue: 'NO' })
                              }
                            />
                          </div>
                        </div>

                        <div className="space-y-4 text-center">
                          <p className="font-sans-ui text-[17px] leading-[1.7] text-[#7a2e2a] md:text-[18px]">
                            {content.travelQuestion}
                          </p>

                          <div className="flex flex-wrap justify-center gap-4">
                            <OptionButton
                              selected={current?.rentingCar === 'YES'}
                              label={content.travelYesLabel}
                              onClick={() => saveGuestResponse(guest.id, { rentingCar: 'YES' })}
                            />
                            <OptionButton
                              selected={current?.rentingCar === 'NO'}
                              label={content.travelNoLabel}
                              onClick={() => saveGuestResponse(guest.id, { rentingCar: 'NO' })}
                            />
                            <OptionButton
                              selected={current?.rentingCar === 'NOT_SURE'}
                              label={content.travelNotSureLabel}
                              onClick={() =>
                                saveGuestResponse(guest.id, { rentingCar: 'NOT_SURE' })
                              }
                            />
                          </div>
                        </div>

                        <div className="space-y-4 text-center">
                          <p className="font-sans-ui text-[17px] leading-[1.7] text-[#7a2e2a] md:text-[18px]">
                            {content.transferQuestion}
                          </p>

                          <div className="flex flex-wrap justify-center gap-4">
                            <OptionButton
                              selected={current?.needsTransfer === 'YES'}
                              label={content.transferYesLabel}
                              onClick={() => saveGuestResponse(guest.id, { needsTransfer: 'YES' })}
                            />
                            <OptionButton
                              selected={current?.needsTransfer === 'NO'}
                              label={content.transferNoLabel}
                              onClick={() => saveGuestResponse(guest.id, { needsTransfer: 'NO' })}
                            />
                          </div>
                        </div>
                      </>
                    ) : null}
                  </div>

                  <div className="mt-6 text-center">
                    {isSaving ? (
                      <p className="font-sans-ui text-[15px] text-[#7a2e2a]/80">
                        {content.savingLabel}
                      </p>
                    ) : isSaved ? (
                      <p className="font-sans-ui text-[15px] text-[#7a2e2a]/80">
                        {content.savedLabel}
                      </p>
                    ) : null}
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}