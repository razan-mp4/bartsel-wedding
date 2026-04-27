'use client'

import Link from 'next/link'
import { useMemo, useState } from 'react'


export const metadata = {
  title: 'Bartsel Wedding Admin',
  description: 'Private wedding invitation',
  robots: {
    index: false,
    follow: false,
  },
}

type GuestInput = {
  fullName: string
  guestType: 'ADULT' | 'CHILD'
}

export default function NewInvitationPage() {
  const [type, setType] = useState<'INDIVIDUAL' | 'FAMILY'>('INDIVIDUAL')
  const [language, setLanguage] = useState<'uk' | 'ru' | 'en'>('en')

  const [individualName, setIndividualName] = useState('')
  const [familyName, setFamilyName] = useState('')
  const [familyMembers, setFamilyMembers] = useState<GuestInput[]>([
    { fullName: '', guestType: 'ADULT' },
  ])

  const [link, setLink] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const hasAdultInFamily = useMemo(
    () => familyMembers.some((member) => member.guestType === 'ADULT' && member.fullName.trim()),
    [familyMembers]
  )

  const examples = useMemo(() => {
    if (language === 'uk') {
      return {
        individual: 'Соломія Одемчук',
        family: "Сім'я Одемчуків",
        member: 'Марія Одемчук',
      }
    }

    if (language === 'ru') {
      return {
        individual: 'Соломия Одемчук',
        family: 'Семья Одемчуков',
        member: 'Мария Одемчук',
      }
    }

    return {
      individual: 'Solomiia Odemchuk',
      family: 'Odemchuk Family',
      member: 'Maria Odemchuk',
    }
  }, [language])

  function updateFamilyMember(index: number, key: keyof GuestInput, value: string) {
    setFamilyMembers((prev) =>
      prev.map((member, i) =>
        i === index ? { ...member, [key]: value } : member
      )
    )
  }

  function addFamilyMember() {
    setFamilyMembers((prev) => [...prev, { fullName: '', guestType: 'ADULT' }])
  }

  function removeFamilyMember(index: number) {
    setFamilyMembers((prev) => prev.filter((_, i) => i !== index))
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError('')
    setLink('')

    let payload: unknown

    if (type === 'INDIVIDUAL') {
      if (!individualName.trim()) {
        setError('Please enter individual name')
        setLoading(false)
        return
      }

      payload = {
        type,
        language,
        individualName: individualName.trim(),
        guests: [{ fullName: individualName.trim(), guestType: 'ADULT' }],
      }
    } else {
      const cleanedMembers = familyMembers.filter((member) => member.fullName.trim())

      if (!familyName.trim()) {
        setError('Please enter family name')
        setLoading(false)
        return
      }

      if (cleanedMembers.length < 1) {
        setError('Please add at least one family member')
        setLoading(false)
        return
      }

      const hasAdult = cleanedMembers.some((member) => member.guestType === 'ADULT')
      if (!hasAdult) {
        setError('Family invitation must include at least one adult')
        setLoading(false)
        return
      }

      payload = {
        type,
        language,
        familyName: familyName.trim(),
        guests: cleanedMembers,
      }
    }

    const res = await fetch('/api/admin/invitations', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    })

    const data = await res.json()
    setLoading(false)

    if (!res.ok) {
      setError(data.error || 'Failed to create invitation')
      return
    }

    setLink(data.link)
    setIndividualName('')
    setFamilyName('')
    setFamilyMembers([{ fullName: '', guestType: 'ADULT' }])
    setType('INDIVIDUAL')
    setLanguage('en')
  }

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#f7f3ee]">

      <div className="pointer-events-none absolute inset-0 bg-white/88" />

      <div className="relative z-10 mx-auto max-w-4xl p-5 md:p-8">
        <div className="mb-6">
          <Link
            href="/invitations/admin"
            className="inline-flex items-center rounded-full border border-[#d9cdc1] bg-white px-4 py-2 text-sm text-[#7a2e2a] shadow-sm transition hover:bg-[#faf7f3]"
          >
            &lt; Back
          </Link>
        </div>

        <form
          onSubmit={handleSubmit}
          className="rounded-[2rem] border border-[#e9dfd6] bg-white/82 p-6 shadow-[0_10px_35px_rgba(122,46,42,0.07)] backdrop-blur-sm md:p-8 space-y-8"
        >
          <div className="text-center">
            <p className="font-sans-ui text-[12px] uppercase tracking-[0.32em] text-[#8b806d]">
              Wedding Admin
            </p>
            <h1 className="mt-4 font-serif-display italic text-[40px] leading-none text-[#7a2e2a] md:text-[50px]">
              Create invitation
            </h1>

          </div>

          <div className="flex justify-center gap-3 flex-wrap">
            <button
              type="button"
              onClick={() => setType('INDIVIDUAL')}
              className={`rounded-full px-5 py-2.5 text-sm transition ${
                type === 'INDIVIDUAL'
                  ? 'bg-[#7a2e2a] text-white shadow-sm'
                  : 'border border-[#d9cdc1] bg-white text-[#7a2e2a] hover:bg-[#faf7f3]'
              }`}
            >
              Individual
            </button>

            <button
              type="button"
              onClick={() => setType('FAMILY')}
              className={`rounded-full px-5 py-2.5 text-sm transition ${
                type === 'FAMILY'
                  ? 'bg-[#7a2e2a] text-white shadow-sm'
                  : 'border border-[#d9cdc1] bg-white text-[#7a2e2a] hover:bg-[#faf7f3]'
              }`}
            >
              Family
            </button>
          </div>

<div className="space-y-3">
  <label className="font-sans-ui text-sm text-[#8b806d]">
    Language
  </label>

  <div className="flex gap-2 flex-wrap">
    {[
      { code: 'en', label: 'English' },
      { code: 'uk', label: 'Українська' },
      { code: 'ru', label: 'Русский' },
    ].map((lang) => {
      const isActive = language === lang.code

      return (
        <button
          key={lang.code}
          type="button"
          onClick={() => setLanguage(lang.code as 'uk' | 'ru' | 'en')}
          className={`rounded-full px-5 py-2.5 text-sm transition-all duration-200 ${
            isActive
              ? 'bg-[#7a2e2a] text-white shadow-sm'
              : 'border border-[#d9cdc1] bg-white text-[#7a2e2a] hover:bg-[#faf7f3]'
          }`}
        >
          {lang.label}
        </button>
      )
    })}
  </div>
</div>

          {type === 'INDIVIDUAL' ? (
            <div className="space-y-2">
              <label className="font-sans-ui text-sm text-[#8b806d]">Individual name</label>
              <input
                className="w-full rounded-[1.2rem] border border-[#dfd3c8] bg-white px-4 py-3 text-[#7a2e2a] outline-none transition placeholder:text-[#b3a79c] focus:border-[#7a2e2a]/40 focus:ring-2 focus:ring-[#7a2e2a]/10"
                value={individualName}
                onChange={(e) => setIndividualName(e.target.value)}
                placeholder={examples.individual}
              />
            </div>
          ) : (
            <>
              <div className="space-y-2">
                <label className="font-sans-ui text-sm text-[#8b806d]">Family name</label>
                <input
                  className="w-full rounded-[1.2rem] border border-[#dfd3c8] bg-white px-4 py-3 text-[#7a2e2a] outline-none transition placeholder:text-[#b3a79c] focus:border-[#7a2e2a]/40 focus:ring-2 focus:ring-[#7a2e2a]/10"
                  value={familyName}
                  onChange={(e) => setFamilyName(e.target.value)}
                  placeholder={examples.family}
                />
                <p className="font-sans-ui text-xs text-[#8b806d]">
                  Good example: <span className="text-[#7a2e2a]">{examples.family}</span>
                </p>
              </div>

              <div className="space-y-4">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <h2 className="font-serif-display italic text-[28px] text-[#7a2e2a]">
                    Family members
                  </h2>

                  <button
                    type="button"
                    onClick={addFamilyMember}
                    className="rounded-full border border-[#d9cdc1] bg-white px-4 py-2 text-sm text-[#7a2e2a] shadow-sm transition hover:bg-[#faf7f3]"
                  >
                    + Add family member
                  </button>
                </div>

                {familyMembers.map((member, index) => (
                  <div
                    key={index}
                    className="grid gap-4 rounded-[1.5rem] border border-[#eaded8] bg-white p-5 md:grid-cols-[1fr_180px_auto] md:items-end md:p-6"
                  >
                    <div className="space-y-2">
                      <label className="font-sans-ui text-sm text-[#8b806d]">Full name</label>
                      <input
                        className="w-full rounded-[1.2rem] border border-[#dfd3c8] bg-white px-4 py-3 text-[#7a2e2a] outline-none transition placeholder:text-[#b3a79c] focus:border-[#7a2e2a]/40 focus:ring-2 focus:ring-[#7a2e2a]/10"
                        value={member.fullName}
                        onChange={(e) => updateFamilyMember(index, 'fullName', e.target.value)}
                        placeholder={examples.member}
                      />
                    </div>

<div className="flex gap-2">
  {[
    { value: 'ADULT', label: 'Adult' },
    { value: 'CHILD', label: 'Child' },
  ].map((option) => {
    const isActive = member.guestType === option.value

    return (
      <button
        key={option.value}
        type="button"
        onClick={() =>
          updateFamilyMember(index, 'guestType', option.value as 'ADULT' | 'CHILD')
        }
        className={`flex-1 rounded-full px-4 py-2.5 text-sm transition-all duration-200 ${
          isActive
            ? 'bg-[#7a2e2a] text-white shadow-sm'
            : 'border border-[#d9cdc1] bg-white text-[#7a2e2a] hover:bg-[#faf7f3]'
        }`}
      >
        {option.label}
      </button>
    )
  })}
</div>

                    <button
                      type="button"
                      onClick={() => removeFamilyMember(index)}
                      disabled={familyMembers.length === 1}
                      className="rounded-full border border-[#e6b7b1] px-4 py-3 text-[#b04d42] transition hover:bg-[#fff5f3] disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      Remove
                    </button>
                  </div>
                ))}

                {!hasAdultInFamily ? (
                  <p className="rounded-[1rem] border border-[#ecd0cb] bg-[#fff6f4] px-4 py-3 text-sm text-[#b04d42]">
                    Family invitation must include at least one adult.
                  </p>
                ) : null}
              </div>
            </>
          )}

          {error ? (
            <p className="rounded-[1rem] border border-[#ecd0cb] bg-[#fff6f4] px-4 py-3 text-sm text-[#b04d42]">
              {error}
            </p>
          ) : null}

          <button
            type="submit"
            disabled={loading}
            className="rounded-full bg-[#6f7f57] px-6 py-3.5 font-sans-ui text-white transition hover:bg-[#61704c] disabled:cursor-not-allowed disabled:opacity-70"
          >
            {loading ? 'Creating...' : 'Create invitation'}
          </button>

          {link ? (
            <div className="rounded-[1.5rem] border border-[#e9dfd6] bg-[#faf7f3] p-5 space-y-3">
              <p className="font-serif-display italic text-[26px] text-[#7a2e2a]">
                Invitation created
              </p>
              <p className="break-all font-sans-ui text-sm text-[#7a2e2a]">
                {link}
              </p>
              <button
                type="button"
                onClick={() => navigator.clipboard.writeText(link)}
                className="rounded-full border border-[#d9cdc1] bg-white px-4 py-2 text-sm text-[#7a2e2a] shadow-sm transition hover:bg-[#faf7f3]"
              >
                Copy link
              </button>
            </div>
          ) : null}
        </form>
      </div>
    </main>
  )
}