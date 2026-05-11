import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { db } from '@/lib/db'
import { blogPostSchema } from '@/lib/validation'

export async function GET(_req: NextRequest, { params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions)
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const post = await db.blogPost.findUnique({ where: { id: parseInt(params.id) } })
  if (!post) return NextResponse.json({ error: 'Not found' }, { status: 404 })
  return NextResponse.json(post)
}

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions)
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const body = await req.json()
  const result = blogPostSchema.safeParse(body)
  if (!result.success) return NextResponse.json({ error: 'Validation failed', issues: result.error.issues }, { status: 422 })

  const { title, slug, excerpt, content, category, published } = result.data
  const existing = await db.blogPost.findUnique({ where: { id: parseInt(params.id) } })
  const post = await db.blogPost.update({
    where: { id: parseInt(params.id) },
    data: {
      title, slug, excerpt, content, category,
      published: Boolean(published),
      publishedAt: published && !existing?.publishedAt ? new Date() : existing?.publishedAt ?? null,
    },
  })
  return NextResponse.json(post)
}

export async function DELETE(_req: NextRequest, { params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions)
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  await db.blogPost.delete({ where: { id: parseInt(params.id) } })
  return NextResponse.json({ success: true })
}
