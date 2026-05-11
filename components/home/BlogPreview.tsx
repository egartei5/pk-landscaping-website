import Link from 'next/link'
import BlogCard from '@/components/ui/BlogCard'
import SectionLabel from '@/components/ui/SectionLabel'
import type { BlogPost } from '@prisma/client'

interface BlogPreviewProps {
  posts: BlogPost[]
}

export default function BlogPreview({ posts }: BlogPreviewProps) {
  return (
    <section className="bg-pk-off-white py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between mb-12 gap-4">
          <div>
            <SectionLabel>Resources</SectionLabel>
            <h2 className="font-heading font-black text-pk-900 text-4xl sm:text-5xl">
              Seasonal Tips & Expert Advice
            </h2>
          </div>
          <Link href="/blog" className="btn-outline-green whitespace-nowrap self-start sm:self-auto">
            View All Articles
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post) => (
            <BlogCard
              key={post.id}
              slug={post.slug}
              title={post.title}
              excerpt={post.excerpt}
              category={post.category}
              publishedAt={post.publishedAt?.toISOString() ?? null}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
