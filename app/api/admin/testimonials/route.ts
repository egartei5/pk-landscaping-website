import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { db } from '@/lib/db'
import { testimonialSchema } from '@/lib/validation'

export async function GET() {
  const session = await getServerSession(authOptions)
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const testimonials = await db.testimonial.findMany({ orderBy: { date: 'desc' } })
  return NextResponse.json(testimonials)
}

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions)
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const body = await req.json()
  const result = testimonialSchema.safeParse(body)
  if (!result.success) return NextResponse.json({ error: 'Validation failed', issues: result.error.issues }, { status: 422 })

  const testimonial = await db.testimonial.create({ data: result.data })
  return NextResponse.json(testimonial, { status: 201 })
}
