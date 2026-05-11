import Link from 'next/link'
import { ArrowRight, Calendar } from 'lucide-react'

interface BlogCardProps {
  slug: string
  title: string
  excerpt: string
  category: string
  publishedAt: string | null
}

export default function BlogCard({ slug, title, excerpt, category, publishedAt }: BlogCardProps) {
  const date = publishedAt ? new Date(publishedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : ''
  return (
    <article className="bg-white border border-gray-100 rounded-xl overflow-hidden shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 flex flex-col">
      <div className="p-6 flex flex-col flex-1">
        <span className="inline-block bg-pk-500/10 text-pk-700 font-bold text-xs px-3 py-1 rounded-full mb-3 w-fit">
          {category}
        </span>
        <h3 className="font-heading font-bold text-gray-900 text-lg leading-snug mb-2 line-clamp-2">{title}</h3>
        <p className="text-gray-500 text-sm leading-relaxed mb-4 flex-1 line-clamp-3">{excerpt}</p>
        <div className="flex items-center justify-between pt-4 border-t border-gray-100">
          {date && (
            <span className="flex items-center gap-1.5 text-gray-400 text-xs">
              <Calendar size={12} /> {date}
            </span>
          )}
          <Link href={`/blog/${slug}`} className="inline-flex items-center gap-1 text-pk-500 font-bold text-sm hover:text-pk-700 transition-colors ml-auto">
            Read More <ArrowRight size={13} />
          </Link>
        </div>
      </div>
    </article>
  )
}
