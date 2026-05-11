import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const category = searchParams.get('category')
  const search = searchParams.get('search')

  const posts = await db.blogPost.findMany({
    where: {
      published: true,
      ...(category ? { category } : {}),
      ...(search
        ? { OR: [{ title: { contains: search } }, { excerpt: { contains: search } }] }
        : {}),
    },
    orderBy: { publishedAt: 'desc' },
    select: { id: true, title: true, slug: true, excerpt: true, category: true, publishedAt: true },
  })

  return NextResponse.json(posts)
}
