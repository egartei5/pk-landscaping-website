import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { db } from '@/lib/db'
import { galleryImageSchema } from '@/lib/validation'

export async function GET() {
  const session = await getServerSession(authOptions)
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const images = await db.galleryImage.findMany({ orderBy: [{ sortOrder: 'asc' }, { createdAt: 'desc' }] })
  return NextResponse.json(images)
}

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions)
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const body = await req.json()
  const result = galleryImageSchema.safeParse(body)
  if (!result.success) return NextResponse.json({ error: 'Validation failed', issues: result.error.issues }, { status: 422 })

  const image = await db.galleryImage.create({ data: result.data })
  return NextResponse.json(image, { status: 201 })
}
