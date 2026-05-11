import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { db } from '@/lib/db'
import { sendBookingStatusEmail } from '@/lib/email'

export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions)
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { status } = await req.json()
  if (!['accepted', 'rejected'].includes(status)) {
    return NextResponse.json({ error: 'Invalid status' }, { status: 400 })
  }

  const booking = await db.booking.update({
    where: { id: Number(params.id) },
    data: { status },
  })

  sendBookingStatusEmail({
    name: booking.name,
    email: booking.email,
    service: booking.service,
    date: booking.date,
    timeSlot: booking.timeSlot,
    status: status as 'accepted' | 'rejected',
  }).catch(console.error)

  return NextResponse.json(booking)
}

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions)
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  await db.booking.delete({ where: { id: Number(params.id) } })
  return NextResponse.json({ success: true })
}
