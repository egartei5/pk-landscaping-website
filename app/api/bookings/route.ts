import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { rateLimit } from '@/lib/rateLimit'
import { sendBookingAlertToAdmin, sendBookingConfirmationToCustomer } from '@/lib/email'
import { z } from 'zod'

const bookingSchema = z.object({
  name: z.string().min(2),
  phone: z.string().optional(),
  email: z.string().email(),
  service: z.string().min(2),
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  timeSlot: z.string().min(2),
  location: z.string().optional(),
  notes: z.string().max(1000).optional(),
})

export async function GET(req: NextRequest) {
  const date = req.nextUrl.searchParams.get('date')
  if (!date) return NextResponse.json({ bookedSlots: [] })

  const bookings = await db.booking.findMany({
    where: { date, status: 'accepted' },
    select: { timeSlot: true },
  })

  return NextResponse.json({ bookedSlots: bookings.map((b) => b.timeSlot) })
}

export async function POST(req: NextRequest) {
  const ip = req.headers.get('x-forwarded-for')?.split(',')[0] ?? '127.0.0.1'
  const { allowed, retryAfter } = await rateLimit(ip, 5, 15 * 60 * 1000)
  if (!allowed) {
    return NextResponse.json(
      { error: 'Too many requests.' },
      { status: 429, headers: { 'Retry-After': String(retryAfter) } }
    )
  }

  let body: unknown
  try { body = await req.json() } catch { return NextResponse.json({ error: 'Invalid body.' }, { status: 400 }) }

  const result = bookingSchema.safeParse(body)
  if (!result.success) return NextResponse.json({ error: 'Validation failed.' }, { status: 422 })

  const data = result.data

  // Check slot still available
  const conflict = await db.booking.findFirst({
    where: { date: data.date, timeSlot: data.timeSlot, status: 'accepted' },
  })
  if (conflict) return NextResponse.json({ error: 'That time slot is no longer available.' }, { status: 409 })

  const booking = await db.booking.create({ data })

  sendBookingAlertToAdmin(booking).catch(console.error)
  sendBookingConfirmationToCustomer({
    name: booking.name,
    email: booking.email,
    service: booking.service,
    date: booking.date,
    timeSlot: booking.timeSlot,
  }).catch(console.error)

  return NextResponse.json({ success: true, id: booking.id })
}
