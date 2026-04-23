import { prisma } from '@/lib/prisma'
import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'

const bodySchema = z.object({
  responses: z.array(
    z.object({
      guestId: z.string(),
      attending: z.enum(['YES', 'NO', 'MAYBE']).nullable().optional(),
      stayingAtVenue: z.enum(['YES', 'NO']).nullable().optional(),
      rentingCar: z.enum(['YES', 'NO', 'NOT_SURE']).nullable().optional(),
      needsTransfer: z.enum(['YES', 'NO']).nullable().optional(),
      mealPreference: z.string().optional(),
      notes: z.string().optional(),
    })
  ),
})

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params
  const body = await request.json()
  const parsed = bodySchema.safeParse(body)

  if (!parsed.success) {
    return NextResponse.json({ error: 'Invalid payload' }, { status: 400 })
  }

  const invitation = await prisma.invitation.findUnique({
    where: { slug },
    include: { guests: true },
  })

  if (!invitation) {
    return NextResponse.json({ error: 'Invitation not found' }, { status: 404 })
  }

  const validGuestIds = new Set(invitation.guests.map((guest) => guest.id))

  await prisma.$transaction(
    parsed.data.responses
      .filter((response) => validGuestIds.has(response.guestId))
      .map((response) =>
        prisma.rSVP.upsert({
          where: {
            invitationId_guestId: {
              invitationId: invitation.id,
              guestId: response.guestId,
            },
          },
          create: {
            invitationId: invitation.id,
            guestId: response.guestId,
            attending: response.attending ?? null,
            stayingAtVenue: response.stayingAtVenue ?? null,
            rentingCar: response.rentingCar ?? null,
            needsTransfer: response.needsTransfer ?? null,
            mealPreference: response.mealPreference ?? null,
            notes: response.notes ?? null,
            respondedAt: new Date(),
          },
          update: {
            attending: response.attending ?? null,
            stayingAtVenue: response.stayingAtVenue ?? null,
            rentingCar: response.rentingCar ?? null,
            needsTransfer: response.needsTransfer ?? null,
            mealPreference: response.mealPreference ?? null,
            notes: response.notes ?? null,
            respondedAt: new Date(),
          },
        })
      )
  )

  return NextResponse.json({ ok: true })
}