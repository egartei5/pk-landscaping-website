import { MetadataRoute } from 'next'
import { db } from '@/lib/db'

const BASE_URL = 'https://pklandscapingmn.com'

const SERVICE_SLUGS = [
  'snow-removal', 'road-paving', 'paver-installation', 'lawn-mowing',
  'tree-services', 'brick-lane-construction', 'gutter-cleaning', 'seasonal-cleanup',
]

export const dynamic = 'force-dynamic'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  let posts: { slug: string; updatedAt: Date }[] = []
  try {
    posts = await db.blogPost.findMany({
      where: { published: true },
      select: { slug: true, updatedAt: true },
    })
  } catch {
    // DB not available at build time
  }

  const staticPages = [
    { url: BASE_URL, lastModified: new Date(), priority: 1.0, changeFrequency: 'weekly' as const },
    { url: `${BASE_URL}/about`, lastModified: new Date(), priority: 0.8, changeFrequency: 'monthly' as const },
    { url: `${BASE_URL}/services`, lastModified: new Date(), priority: 0.9, changeFrequency: 'monthly' as const },
    { url: `${BASE_URL}/gallery`, lastModified: new Date(), priority: 0.7, changeFrequency: 'weekly' as const },
    { url: `${BASE_URL}/testimonials`, lastModified: new Date(), priority: 0.7, changeFrequency: 'weekly' as const },
    { url: `${BASE_URL}/blog`, lastModified: new Date(), priority: 0.8, changeFrequency: 'weekly' as const },
    { url: `${BASE_URL}/faq`, lastModified: new Date(), priority: 0.6, changeFrequency: 'monthly' as const },
    { url: `${BASE_URL}/contact`, lastModified: new Date(), priority: 0.9, changeFrequency: 'monthly' as const },
  ]

  const servicePages = SERVICE_SLUGS.map((slug) => ({
    url: `${BASE_URL}/services/${slug}`,
    lastModified: new Date(),
    priority: 0.85,
    changeFrequency: 'monthly' as const,
  }))

  const blogPages = posts.map((post) => ({
    url: `${BASE_URL}/blog/${post.slug}`,
    lastModified: post.updatedAt,
    priority: 0.7,
    changeFrequency: 'monthly' as const,
  }))

  return [...staticPages, ...servicePages, ...blogPages]
}
