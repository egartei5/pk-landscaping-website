import { notFound } from 'next/navigation'
import Link from 'next/link'
import Script from 'next/script'
import parse, { Element } from 'html-react-parser'
import { Calendar, Clock, Tag, ArrowLeft } from 'lucide-react'
import { db } from '@/lib/db'
import { buildMetadata, blogPostingSchema } from '@/lib/seo'

interface Props {
  params: { slug: string }
}

// Pages not pre-built at build time are rendered on first request and cached
export const dynamicParams = true

export async function generateStaticParams() {
  try {
    const posts = await db.blogPost.findMany({
      where: { published: true },
      select: { slug: true },
    })
    return posts.map((p) => ({ slug: p.slug }))
  } catch {
    // DB volume not mounted during build (e.g. Railway) — render pages on demand
    return []
  }
}

export async function generateMetadata({ params }: Props) {
  const post = await db.blogPost.findUnique({
    where: { slug: params.slug, published: true },
  })
  if (!post) return {}
  return buildMetadata({
    title: post.title,
    description: post.excerpt,
    path: `/blog/${post.slug}`,
  })
}

function readingTime(content: string) {
  const words = content.replace(/<[^>]+>/g, '').split(/\s+/).length
  return Math.max(1, Math.ceil(words / 200))
}

export default async function BlogPostPage({ params }: Props) {
  const [post, related] = await Promise.all([
    db.blogPost.findUnique({ where: { slug: params.slug, published: true } }),
    db.blogPost.findMany({
      where: { published: true, slug: { not: params.slug } },
      orderBy: { publishedAt: 'desc' },
      take: 3,
      select: { slug: true, title: true, category: true, publishedAt: true, excerpt: true },
    }),
  ])

  if (!post) notFound()

  const jsonLd = blogPostingSchema(post)

  // Strip script/object/embed tags from admin-authored content as a lightweight safety measure
  const parseOptions = {
    replace: (node: unknown) => {
      if (node instanceof Element && ['script', 'object', 'embed', 'base'].includes(node.name)) {
        return <></>
      }
    },
  }

  return (
    <>
      <Script id="blog-jsonld" type="application/ld+json" strategy="beforeInteractive">
        {JSON.stringify(jsonLd)}
      </Script>

      {/* Hero */}
      <section className="relative bg-pk-900 py-20 md:py-28 overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=1600&q=80')] bg-cover bg-center opacity-10" />
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-pk-400 hover:text-white transition-colors mb-6 text-sm font-medium"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Blog
          </Link>
          <div className="flex items-center gap-3 mb-4">
            <span className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-pk-400 bg-pk-400/10 px-3 py-1 rounded-full">
              <Tag className="w-3 h-3" />
              {post.category}
            </span>
          </div>
          <h1 className="font-heading text-3xl sm:text-4xl md:text-5xl font-bold text-white leading-tight mb-6">
            {post.title}
          </h1>
          <p className="text-lg text-white/70 mb-8 leading-relaxed">{post.excerpt}</p>
          <div className="flex items-center gap-6 text-sm text-white/50">
            <span className="flex items-center gap-1.5">
              <Calendar className="w-4 h-4" />
              {post.publishedAt
                ? new Date(post.publishedAt).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })
                : 'Draft'}
            </span>
            <span className="flex items-center gap-1.5">
              <Clock className="w-4 h-4" />
              {readingTime(post.content)} min read
            </span>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-16 bg-pk-off-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            {/* Article */}
            <article className="lg:col-span-8">
              <div
                className="
                  bg-white rounded-2xl shadow-sm p-8 md:p-12
                  prose prose-lg max-w-none
                  prose-headings:font-heading prose-headings:text-pk-900
                  prose-h2:text-2xl prose-h2:mt-10 prose-h2:mb-4
                  prose-h3:text-xl prose-h3:mt-8 prose-h3:mb-3
                  prose-p:text-gray-700 prose-p:leading-relaxed
                  prose-li:text-gray-700
                  prose-strong:text-pk-900
                  prose-a:text-pk-500 prose-a:no-underline hover:prose-a:underline
                  prose-img:rounded-xl prose-img:shadow-md
                  prose-blockquote:border-pk-500 prose-blockquote:bg-pk-50/50 prose-blockquote:rounded-r-xl prose-blockquote:py-1
                "
              >
                {parse(post.content, parseOptions)}
              </div>

              {/* CTA */}
              <div className="mt-10 bg-pk-900 rounded-2xl p-8 text-center">
                <h3 className="font-heading text-2xl font-bold text-white mb-3">
                  Ready to Transform Your Property?
                </h3>
                <p className="text-white/70 mb-6">
                  Get a free quote from PK Landscaping — serving Fargo and surrounding areas.
                </p>
                <Link href="/contact" className="btn-primary">
                  Get Your Free Quote
                </Link>
              </div>
            </article>

            {/* Sidebar */}
            <aside className="lg:col-span-4 space-y-8">
              {/* Related Posts */}
              <div className="bg-white rounded-2xl shadow-sm p-6">
                <h3 className="font-heading text-lg font-bold text-pk-900 mb-5">Related Articles</h3>
                <div className="space-y-5">
                  {related.map((r) => (
                    <Link key={r.slug} href={`/blog/${r.slug}`} className="group block">
                      <span className="text-xs font-semibold uppercase tracking-wider text-pk-500">
                        {r.category}
                      </span>
                      <h4 className="font-heading font-semibold text-pk-900 group-hover:text-pk-500 transition-colors leading-snug mt-1">
                        {r.title}
                      </h4>
                      <p className="text-sm text-gray-500 mt-1 line-clamp-2">{r.excerpt}</p>
                    </Link>
                  ))}
                </div>
              </div>

              {/* Services CTA */}
              <div className="bg-pk-800 rounded-2xl p-6 text-white">
                <h3 className="font-heading text-lg font-bold mb-3">Our Services</h3>
                <ul className="space-y-2 text-sm text-white/80 mb-5">
                  {[
                    'Snow Removal',
                    'Road Paving',
                    'Paver Installation',
                    'Lawn Mowing',
                    'Tree Services',
                    'Gutter Cleaning',
                  ].map((s) => (
                    <li key={s} className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-pk-400 flex-shrink-0" />
                      {s}
                    </li>
                  ))}
                </ul>
                <Link href="/services" className="btn-primary w-full text-center block">
                  View All Services
                </Link>
              </div>

              {/* Discount */}
              <div className="bg-pk-500 rounded-2xl p-6 text-white">
                <p className="text-xs font-bold uppercase tracking-widest mb-1">Limited Offer</p>
                <p className="font-heading text-3xl font-black mb-2">10% OFF</p>
                <p className="text-sm text-white/90 mb-4">First-time customers. Mention this offer when you call.</p>
                <a href="tel:+12189791154" className="block text-center bg-white text-pk-900 font-bold rounded-xl py-2.5 hover:bg-pk-50 transition-colors text-sm">
                  Call Now
                </a>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </>
  )
}
