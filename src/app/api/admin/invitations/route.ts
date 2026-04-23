import { prisma } from '@/lib/prisma'
import { slugify } from '@/lib/slug'
import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'

const guestSchema = z.object({
  fullName: z.string().min(1),
  guestType: z.enum(['ADULT', 'CHILD']).default('ADULT'),
})

const invitationSchema = z.object({
  type: z.enum(['INDIVIDUAL', 'FAMILY']),
  language: z.enum(['uk', 'ru', 'en']),
  familyName: z.string().optional(),
  individualName: z.string().optional(),
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

  const { type, language, familyName, individualName, guests } = parsed.data

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

    displayName = individualName.trim()

    finalGuests = [
      {
        fullName: individualName.trim(),
        guestType: 'ADULT',
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

    const hasAdult = finalGuests.some((g) => g.guestType === 'ADULT')
    if (!hasAdult) {
      return NextResponse.json(
        { error: 'Family invitation must include at least one adult' },
        { status: 400 }
      )
    }

    const words = displayName.split(/\s+/)

    if (language === 'en') {
      // Handle "Odemchuk Family"
      if (words.length >= 2 && words[words.length - 1].toLowerCase() === 'family') {
        const surname = words.slice(0, -1).join(' ')
        baseSlug = `${slugify(surname)}-family`
      } else {
        // If user didn't type "Family"
        baseSlug = `${slugify(displayName)}-family`
      }
    } else {
      // UK / RU → take LAST word
      const lastWord = words[words.length - 1]
      baseSlug = `${slugify(lastWord)}-family`
    }
  }

  // Ensure unique slug
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
          fullName: guest.fullName,
          guestType: guest.guestType,
          roleOrder: index + 1,
        })),
      },
    },
    include: {
      guests: true,
    },
  })

  const baseUrl =
    process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'

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