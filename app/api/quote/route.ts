import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { rateLimit } from '@/lib/rateLimit'
import { sendQuoteNotification } from '@/lib/email'
import { quoteSchema } from '@/lib/validation'

export async function POST(req: NextRequest) {
  const ip = req.headers.get('x-forwarded-for')?.split(',')[0] ?? '127.0.0.1'
  const { allowed } = rateLimit(ip, 5, 15 * 60 * 1000)
  if (!allowed) {
    return NextResponse.json({ error: 'Too many requests. Please try again later.' }, { status: 429 })
  }

  let body: unknown
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: 'Invalid request body.' }, { status: 400 })
  }

  const result = quoteSchema.safeParse(body)
  if (!result.success) {
    return NextResponse.json({ error: 'Validation failed.', issues: result.error.issues }, { status: 422 })
  }

  const { name, phone, email, service, message } = result.data

  try {
    await db.lead.create({ data: { name, phone, email, service, message } })
  } catch (err) {
    console.error('Lead save error:', err)
    return NextResponse.json({ error: 'Failed to submit. Please call us directly.' }, { status: 500 })
  }

  // Email notification is best-effort — don't fail the request if SMTP isn't configured
  sendQuoteNotification({ name, phone, email, service, message }).catch((err) =>
    console.error('Email notification error:', err)
  )

  return NextResponse.json({ success: true })
}
