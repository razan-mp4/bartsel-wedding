import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params

  const invitation = await prisma.invitation.findUnique({
    where: { slug },
  })

  if (!invitation) {
    return NextResponse.json({ error: 'Not found' }, { status: 404 })
  }

  const userAgent = request.headers.get('user-agent') || null

  await prisma.$transaction([
    prisma.invitation.update({
      where: { id: invitation.id },
      data: {
        visitCount: { increment: 1 },
        visitedAt: invitation.visitedAt ?? new Date(),
      },
    }),
    prisma.visitLog.create({
      data: {
        invitationId: invitation.id,
        userAgent,
      },
    }),
  ])

  return NextResponse.json({ ok: true })
}
