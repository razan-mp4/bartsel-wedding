'use client'

import { useEffect, useMemo, useState } from 'react'

type Guest = {
  id: string
  fullName: string
  guestType: 'ADULT' | 'CHILD'
  roleOrder: number | null
}

type Response = {
  guestId: string
  attending: 'YES' | 'NO' | 'MAYBE' | null
  stayingAtVenue?: 'YES' | 'NO' | null
  rentingCar?: 'YES' | 'NO' | 'NOT_SURE' | null
  needsTransfer?: 'YES' | 'NO' | null
}

type Invitation = {
  id: string
  slug: string
  displayName: string
  type: 'INDIVIDUAL' | 'FAMILY'
  language: 'uk' | 'ru' | 'en'
  visitCount: number
  visitedAt: string | null
  guests: Guest[]
  responses: Response[]
}

type FilterMode = 'ALL' | 'YES' | 'NO'

function getGuestResponse(invitation: Invitation, guestId: string) {
  return invitation.responses.find((r) => r.guestId === guestId)
}

function getGuestAttendance(
  invitation: Invitation,
  guestId: string
): 'YES' | 'NO' | 'MAYBE' | '-' {
  const response = invitation.responses.find((r) => r.guestId === guestId)
  return response?.attending ?? '-'
}

function invitationMatchesFilter(invitation: Invitation, filter: FilterMode) {
  if (filter === 'ALL') return true

  const attendances = invitation.guests.map((guest) =>
    getGuestAttendance(invitation, guest.id)
  )

  if (filter === 'YES') {
    return attendances.some((value) => value === 'YES')
  }

  if (filter === 'NO') {
    return attendances.some((value) => value === 'NO')
  }

  return true
}

function valueTone(value: string | null | undefined) {
  if (value === 'YES') return 'text-[#6f7f57] font-semibold'
  if (value === 'NO') return 'text-[#7a2e2a] font-semibold'
  if (value === 'NOT_SURE' || value === 'MAYBE') return 'text-[#8b806d] font-medium'
  return 'text-neutral-400'
}

export default function AdminDashboardPage() {
  const [invitations, setInvitations] = useState<Invitation[]>([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState<FilterMode>('ALL')
  const [copiedSlug, setCopiedSlug] = useState<string | null>(null)

  async function loadInvitations() {
    setLoading(true)
    const res = await fetch('/api/admin/invitations')
    const data = await res.json()
    setInvitations(data.invitations || [])
    setLoading(false)
  }

  useEffect(() => {
    loadInvitations()
  }, [])

  async function handleDelete(id: string) {
    const confirmed = window.confirm('Delete this invitation?')
    if (!confirmed) return

    const res = await fetch(`/api/admin/invitations?id=${id}`, {
      method: 'DELETE',
    })

    if (res.ok) {
      await loadInvitations()
    }
  }

  async function handleCopy(slug: string) {
    const link = `${window.location.origin}/invitations/${slug}`
    await navigator.clipboard.writeText(link)
    setCopiedSlug(slug)
    setTimeout(() => setCopiedSlug(null), 1800)
  }

  const stats = useMemo(() => {
    const flattenedGuests = invitations.flatMap((invitation) =>
      invitation.guests.map((guest) => ({
        guest,
        attendance: getGuestAttendance(invitation, guest.id),
      }))
    )

    return {
      totalGuests: flattenedGuests.length,
      yesCount: flattenedGuests.filter((item) => item.attendance === 'YES').length,
      noCount: flattenedGuests.filter((item) => item.attendance === 'NO').length,
      noReplyCount: flattenedGuests.filter((item) => item.attendance === '-').length,
    }
  }, [invitations])

  const filteredInvitations = useMemo(() => {
    return invitations.filter((invitation) => invitationMatchesFilter(invitation, filter))
  }, [invitations, filter])

  let globalGuestIndex = 0

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#f7f3ee]">
      {/* background image */}
      <div
        className="pointer-events-none absolute inset-0 bg-cover bg-center bg-no-repeat opacity-[0.12]"
        style={{ backgroundImage: "url('/sections/love-story-5.webp')" }}
      />
      {/* soft white overlay */}
      <div className="pointer-events-none absolute inset-0 bg-white/86" />

      <div className="relative z-10 p-5 md:p-8 space-y-6">
        <div className="mx-auto max-w-[1500px]">
          <div className="rounded-[2rem] border border-[#e9dfd6] bg-white/80 backdrop-blur-sm shadow-[0_8px_30px_rgba(122,46,42,0.06)] p-6 md:p-8">
            <div className="flex flex-wrap items-start justify-between gap-5">
              <div>
                <h1 className="font-serif-display italic text-[40px] leading-none text-[#7a2e2a] md:text-[52px]">
                  Invitations Admin
                </h1>
                <p className="mt-3 font-sans-ui text-sm text-[#8b806d]">
                  Total guests: {stats.totalGuests} · Yes: {stats.yesCount} · No: {stats.noCount} · Didn’t reply: {stats.noReplyCount}
                </p>
              </div>

              <div className="flex flex-wrap gap-3">
                <a
                  href="/api/admin/export?mode=attending"
                  className="rounded-full bg-[#6f7f57] px-5 py-3 text-sm text-white shadow-sm transition hover:bg-[#61704c]"
                >
                  Download attending guests list
                </a>

                <a
                  href="/api/admin/export?mode=raw"
                  className="rounded-full border border-[#d9cdc1] bg-white px-5 py-3 text-sm text-[#7a2e2a] shadow-sm transition hover:bg-[#faf7f3]"
                >
                  Download raw excel
                </a>

                <a
                  href="/invitations/admin/new"
                  className="rounded-full border border-[#d9cdc1] bg-white px-5 py-3 text-sm text-[#7a2e2a] shadow-sm transition hover:bg-[#faf7f3]"
                >
                  + Add invitation
                </a>
              </div>
            </div>

            <div className="mt-6 flex flex-wrap gap-3">
              <button
                type="button"
                onClick={() => setFilter('ALL')}
                className={`rounded-full px-5 py-2.5 text-sm transition ${
                  filter === 'ALL'
                    ? 'bg-[#7a2e2a] text-white shadow-sm'
                    : 'border border-[#d9cdc1] bg-white text-[#7a2e2a] hover:bg-[#faf7f3]'
                }`}
              >
                All
              </button>

              <button
                type="button"
                onClick={() => setFilter('YES')}
                className={`rounded-full px-5 py-2.5 text-sm transition ${
                  filter === 'YES'
                    ? 'bg-[#6f7f57] text-white shadow-sm'
                    : 'border border-[#d9cdc1] bg-white text-[#6f7f57] hover:bg-[#faf7f3]'
                }`}
              >
                Attending
              </button>

              <button
                type="button"
                onClick={() => setFilter('NO')}
                className={`rounded-full px-5 py-2.5 text-sm transition ${
                  filter === 'NO'
                    ? 'bg-[#7a2e2a] text-white shadow-sm'
                    : 'border border-[#d9cdc1] bg-white text-[#7a2e2a] hover:bg-[#faf7f3]'
                }`}
              >
                Not attending
              </button>
            </div>
          </div>
        </div>

        <div className="mx-auto max-w-[1500px] overflow-x-auto rounded-[2rem] border border-[#e9dfd6] bg-white/82 backdrop-blur-sm shadow-[0_8px_30px_rgba(122,46,42,0.06)]">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-[#eee4da] bg-[#faf7f3]/90 text-left">
                <th className="p-4 font-sans-ui font-semibold text-[#8b806d] w-20">#</th>
                <th className="p-4 font-sans-ui font-semibold text-[#8b806d] min-w-[280px]">Guests</th>
                <th className="p-4 font-sans-ui font-semibold text-[#8b806d]">Type</th>
                <th className="p-4 font-sans-ui font-semibold text-[#8b806d]">Language</th>
                <th className="p-4 font-sans-ui font-semibold text-[#8b806d] min-w-[180px] bg-[#fcfaf7]">Attending</th>
                <th className="p-4 font-sans-ui font-semibold text-[#8b806d] min-w-[180px]">Staying at venue</th>
                <th className="p-4 font-sans-ui font-semibold text-[#8b806d] min-w-[180px]">Renting car</th>
                <th className="p-4 font-sans-ui font-semibold text-[#8b806d] min-w-[180px]">Needs transfer</th>
                <th className="p-4 font-sans-ui font-semibold text-[#8b806d] min-w-[160px]">Visited</th>
                <th className="p-4 font-sans-ui font-semibold text-[#8b806d] border-l border-[#eee4da] min-w-[160px]">Link</th>
                <th className="p-4 font-sans-ui font-semibold text-[#8b806d] min-w-[120px]">Delete</th>
              </tr>
            </thead>

            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={11} className="p-10 text-center text-[#8b806d]">
                    Loading...
                  </td>
                </tr>
              ) : filteredInvitations.length === 0 ? (
                <tr>
                  <td colSpan={11} className="p-10 text-center text-[#8b806d]">
                    No invitations found
                  </td>
                </tr>
              ) : (
                filteredInvitations.map((invitation) => {
                  const numberingStart = globalGuestIndex + 1
                  globalGuestIndex += invitation.guests.length

                  return (
                    <tr
                      key={invitation.id}
                      className="border-b border-[#f0e7de] last:border-b-0 align-top transition-colors hover:bg-[#fcfaf7]/80"
                    >
                      <td className="p-4">
                        <div className="space-y-2 text-[#8b806d]">
                          {invitation.guests.map((_, index) => (
                            <div key={index}>{numberingStart + index}</div>
                          ))}
                        </div>
                      </td>

                      <td className="p-4">
                        <div className="space-y-2 font-medium text-[#7a2e2a]">
                          {invitation.guests.map((guest) => (
                            <div key={guest.id}>{guest.fullName}</div>
                          ))}
                        </div>
                      </td>

                      <td className="p-4 font-medium text-[#8b806d]">
                        {invitation.type}
                      </td>

                      <td className="p-4 text-[#8b806d]">
                        {invitation.language}
                      </td>

                      <td className="p-4 bg-[#fcfaf7]">
                        <div className="space-y-2">
                          {invitation.guests.map((guest) => {
                            const response = getGuestResponse(invitation, guest.id)
                            return (
                              <div key={guest.id} className={valueTone(response?.attending)}>
                                {response?.attending ?? '-'}
                              </div>
                            )
                          })}
                        </div>
                      </td>

                      <td className="p-4">
                        <div className="space-y-2">
                          {invitation.guests.map((guest) => {
                            const response = getGuestResponse(invitation, guest.id)
                            return (
                              <div key={guest.id} className={valueTone(response?.stayingAtVenue)}>
                                {response?.stayingAtVenue ?? '-'}
                              </div>
                            )
                          })}
                        </div>
                      </td>

                      <td className="p-4">
                        <div className="space-y-2">
                          {invitation.guests.map((guest) => {
                            const response = getGuestResponse(invitation, guest.id)
                            return (
                              <div key={guest.id} className={valueTone(response?.rentingCar)}>
                                {response?.rentingCar ?? '-'}
                              </div>
                            )
                          })}
                        </div>
                      </td>

                      <td className="p-4">
                        <div className="space-y-2">
                          {invitation.guests.map((guest) => {
                            const response = getGuestResponse(invitation, guest.id)
                            return (
                              <div key={guest.id} className={valueTone(response?.needsTransfer)}>
                                {response?.needsTransfer ?? '-'}
                              </div>
                            )
                          })}
                        </div>
                      </td>

                      <td className="p-4 text-[#8b806d]">
                        <div>{invitation.visitCount} visits</div>
                        <div className="mt-1 text-xs text-[#a79b8e]">
                          {invitation.visitedAt
                            ? new Date(invitation.visitedAt).toLocaleString()
                            : 'Not visited'}
                        </div>
                      </td>

                      <td className="p-4 border-l border-[#eee4da]">
                        <div className="space-y-2">
                          <button
                            type="button"
                            onClick={() => handleCopy(invitation.slug)}
                            className="rounded-full border border-[#d9cdc1] bg-white px-4 py-2 text-[#7a2e2a] shadow-sm transition hover:bg-[#faf7f3]"
                          >
                            Copy link
                          </button>

                          {copiedSlug === invitation.slug ? (
                            <p className="text-xs font-medium text-[#6f7f57]">
                              Link copied
                            </p>
                          ) : null}
                        </div>
                      </td>

                      <td className="p-4">
                        <button
                          type="button"
                          onClick={() => handleDelete(invitation.id)}
                          className="rounded-full border border-[#e6b7b1] px-4 py-2 text-[#b04d42] transition hover:bg-[#fff5f3]"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  )
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </main>
  )
}