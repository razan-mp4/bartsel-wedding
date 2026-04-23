import { prisma } from '@/lib/prisma'
import { NextRequest, NextResponse } from 'next/server'
import * as XLSX from 'xlsx'

export async function GET(request: NextRequest) {
  const mode = request.nextUrl.searchParams.get('mode') || 'raw'
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'

  const invitations = await prisma.invitation.findMany({
    include: {
      guests: true,
      responses: true,
    },
    orderBy: { createdAt: 'desc' },
  })

  const rawRows = invitations.flatMap((invitation) =>
    invitation.guests.map((guest) => {
      const response = invitation.responses.find((item) => item.guestId === guest.id)

      return {
        invitationLink: `${baseUrl}/invitations/${invitation.slug}`,
        invitationSlug: invitation.slug,
        invitationType: invitation.type,
        language: invitation.language,
        familyOrInvitationName: invitation.displayName,
        guestNumber: guest.roleOrder ?? '',
        guestName: guest.fullName,
        guestType: guest.guestType,

        attending: response?.attending ?? '',
        stayingAtVenue: response?.stayingAtVenue ?? '',
        rentingCar: response?.rentingCar ?? '',
        needsTransfer: response?.needsTransfer ?? '',

        respondedAt: response?.respondedAt?.toISOString() ?? '',
        firstVisitedAt: invitation.visitedAt?.toISOString() ?? '',
        visitCount: invitation.visitCount,
        createdAt: invitation.createdAt.toISOString(),
      }
    })
  )

  const attendingRows = rawRows
    .filter((row) => row.attending === 'YES')
    .map((row) => ({
      guestName: row.guestName,
      stayingAtVenue: row.stayingAtVenue,
      rentingCar: row.rentingCar,
      needsTransfer: row.needsTransfer,
    }))

  const rows = mode === 'attending' ? attendingRows : rawRows

  const worksheet = XLSX.utils.json_to_sheet(rows)
  const workbook = XLSX.utils.book_new()

  XLSX.utils.book_append_sheet(
    workbook,
    worksheet,
    mode === 'attending' ? 'Attending Guests' : 'Raw Guests'
  )

  const buffer = XLSX.write(workbook, { type: 'buffer', bookType: 'xlsx' })

  const filename =
    mode === 'attending' ? 'attending-guests.xlsx' : 'guest-list-raw.xlsx'

  return new NextResponse(buffer, {
    status: 200,
    headers: {
      'Content-Type':
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      'Content-Disposition': `attachment; filename="${filename}"`,
    },
  })
}