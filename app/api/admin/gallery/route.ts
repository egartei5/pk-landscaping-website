import { NextRequest, NextResponse } from 'next/server'
import { revalidatePath, revalidateTag } from 'next/cache'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { db } from '@/lib/db'
import { galleryImageSchema } from '@/lib/validation'
import { GALLERY_CACHE_TAG } from '@/lib/cacheTags'

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

  let image
  try {
    image = await db.galleryImage.create({ data: result.data })
  } catch (err) {
    // Unique constraint on url — this image is already in the gallery.
    if (typeof err === 'object' && err !== null && (err as { code?: string }).code === 'P2002') {
      return NextResponse.json({ error: 'That image URL is already in the gallery.' }, { status: 409 })
    }
    throw err
  }

  // Push the change to the public /gallery page immediately instead of
  // waiting out its 60s cache window.
  revalidateTag(GALLERY_CACHE_TAG)
  revalidatePath('/gallery')
  return NextResponse.json(image, { status: 201 })
}
