import { prisma } from '@/lib/prisma'
import { slugify } from '@/lib/slug'
import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'

const guestSchema = z.object({
  fullName: z.string().min(1),
  guestType: z.enum(['ADULT', 'CHILD']).default('ADULT'),
  gender: z.enum(['MALE', 'FEMALE']).optional(),
})

const invitationSchema = z.object({
  type: z.enum(['INDIVIDUAL', 'FAMILY']),
  language: z.enum(['uk', 'ru', 'en']),
  familyName: z.string().optional(),
  individualName: z.string().optional(),
  individualGender: z.enum(['MALE', 'FEMALE']).optional(),
  guests: z.array(guestSchema).min(1),
})

export async function GET() {
  const invitations = await prisma.invitation.findMany({
    include: {
      guests: { orderBy: { roleOrder: 'asc' } },
      responses: true,
    },
    orderBy: { createdAt: 'desc' },
  })

  return NextResponse.json({ invitations })
}

export async function POST(request: NextRequest) {
  const body = await request.json()
  const parsed = invitationSchema.safeParse(body)

  if (!parsed.success) {
    return NextResponse.json(
      { error: 'Invalid input', details: parsed.error.flatten() },
      { status: 400 }
    )
  }

  const {
    type,
    language,
    familyName,
    individualName,
    individualGender,
    guests,
  } = parsed.data

  let displayName = ''
  let finalGuests = guests
  let baseSlug = ''

  if (type === 'INDIVIDUAL') {
    if (!individualName?.trim()) {
      return NextResponse.json(
        { error: 'Individual name is required' },
        { status: 400 }
      )
    }

    if (!individualGender) {
      return NextResponse.json(
        { error: 'Gender is required for individual invitation' },
        { status: 400 }
      )
    }

    displayName = individualName.trim()

    finalGuests = [
      {
        fullName: individualName.trim(),
        guestType: 'ADULT',
        gender: individualGender,
      },
    ]

    baseSlug = slugify(displayName)
  } else {
    if (!familyName?.trim()) {
      return NextResponse.json(
        { error: 'Family name is required' },
        { status: 400 }
      )
    }

    displayName = familyName.trim()

    const cleanGuests = finalGuests.filter((guest) => guest.fullName.trim())

    if (cleanGuests.length < 1) {
      return NextResponse.json(
        { error: 'Please add at least one family member' },
        { status: 400 }
      )
    }

    const hasAdult = cleanGuests.some((guest) => guest.guestType === 'ADULT')

    if (!hasAdult) {
      return NextResponse.json(
        { error: 'Family invitation must include at least one adult' },
        { status: 400 }
      )
    }

    finalGuests = cleanGuests

    const words = displayName.split(/\s+/)

    if (language === 'en') {
      if (
        words.length >= 2 &&
        words[words.length - 1].toLowerCase() === 'family'
      ) {
        const surname = words.slice(0, -1).join(' ')
        baseSlug = `${slugify(surname)}-family`
      } else {
        baseSlug = `${slugify(displayName)}-family`
      }
    } else {
      const lastWord = words[words.length - 1]
      baseSlug = `${slugify(lastWord)}-family`
    }
  }

  let slug = baseSlug
  let counter = 2

  while (await prisma.invitation.findUnique({ where: { slug } })) {
    slug = `${baseSlug}-${counter}`
    counter++
  }

  const invitation = await prisma.invitation.create({
    data: {
      slug,
      displayName,
      type,
      language,
      guests: {
        create: finalGuests.map((guest, index) => ({
          fullName: guest.fullName.trim(),
          guestType: guest.guestType,
          gender: guest.gender,
          roleOrder: index + 1,
        })),
      },
    },
    include: {
      guests: true,
    },
  })

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'

  return NextResponse.json({
    ok: true,
    invitation,
    link: `${baseUrl}/invitations/${slug}`,
  })
}

export async function DELETE(request: NextRequest) {
  const id = request.nextUrl.searchParams.get('id')

  if (!id) {
    return NextResponse.json(
      { error: 'Invitation id is required' },
      { status: 400 }
    )
  }

  await prisma.invitation.delete({
    where: { id },
  })

  return NextResponse.json({ ok: true })
}