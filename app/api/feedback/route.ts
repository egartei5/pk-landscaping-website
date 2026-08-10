import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { rateLimit } from '@/lib/rateLimit'
import { testimonialSchema } from '@/lib/validation'

export async function POST(req: NextRequest) {
  const ip = req.headers.get('x-forwarded-for')?.split(',')[0] ?? '127.0.0.1'
  const { allowed, retryAfter } = await rateLimit(ip, 3, 15 * 60 * 1000)
  if (!allowed) {
    return NextResponse.json(
      { error: 'Too many requests. Please try again later.' },
      { status: 429, headers: { 'Retry-After': String(retryAfter) } }
    )
  }

  let body: unknown
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: 'Invalid request body.' }, { status: 400 })
  }

  const result = testimonialSchema.safeParse(body)
  if (!result.success) {
    return NextResponse.json({ error: 'Validation failed.', issues: result.error.issues }, { status: 422 })
  }

  const { name, rating, review, service } = result.data

  try {
    await db.testimonial.create({
      data: { name, rating, review, service, published: false },
    })
  } catch (err) {
    console.error('Feedback save error:', err)
    return NextResponse.json({ error: 'Failed to submit. Please call us directly.' }, { status: 500 })
  }

  return NextResponse.json({ success: true })
}
