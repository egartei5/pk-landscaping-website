import { NextRequest, NextResponse } from 'next/server'
import { revalidatePath, revalidateTag } from 'next/cache'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { db } from '@/lib/db'
import { GALLERY_CACHE_TAG } from '@/lib/cacheTags'

export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions)
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const body = await req.json()
  const image = await db.galleryImage.update({
    where: { id: parseInt(params.id) },
    data: body,
  })
  revalidateTag(GALLERY_CACHE_TAG)
  revalidatePath('/gallery')
  return NextResponse.json(image)
}

export async function DELETE(_req: NextRequest, { params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions)
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  await db.galleryImage.delete({ where: { id: parseInt(params.id) } })
  revalidateTag(GALLERY_CACHE_TAG)
  revalidatePath('/gallery')
  return NextResponse.json({ success: true })
}
