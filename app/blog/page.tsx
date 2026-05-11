'use client'
import { useState, useEffect } from 'react'
import BlogCard from '@/components/ui/BlogCard'
import SectionLabel from '@/components/ui/SectionLabel'
import { Search } from 'lucide-react'
import type { BlogPost } from '@prisma/client'

const categories = ['All', 'Lawn Care', 'Snow Removal', 'Paving', 'Trees', 'Seasonal']

export default function BlogPage() {
  const [posts, setPosts] = useState<BlogPost[]>([])
  const [activeCategory, setActiveCategory] = useState('All')
  const [search, setSearch] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/api/blog')
      .then((r) => r.json())
      .then((data) => { setPosts(data); setLoading(false) })
  }, [])

  const filtered = posts.filter((p) => {
    const matchesCat = activeCategory === 'All' || p.category === activeCategory
    const matchesSearch = !search || p.title.toLowerCase().includes(search.toLowerCase()) || p.excerpt.toLowerCase().includes(search.toLowerCase())
    return matchesCat && matchesSearch
  })

  return (
    <>
      <div className="bg-pk-900 pt-32 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <SectionLabel>Blog</SectionLabel>
          <h1 className="font-heading font-black text-white text-5xl sm:text-6xl mb-4">
            Innovative Ideas & Expert Advice
          </h1>
          <p className="text-gray-400 text-lg">Seasonal tips, landscaping guides, and industry insights from our Fargo, ND team.</p>
        </div>
      </div>

      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-pk-off-white">
        <div className="max-w-7xl mx-auto">
          {/* Filters */}
          <div className="flex flex-col sm:flex-row gap-4 mb-10">
            <div className="flex flex-wrap gap-2">
              {categories.map((cat) => (
                <button key={cat} onClick={() => setActiveCategory(cat)} className={`px-4 py-2 rounded-full text-sm font-bold transition-colors ${activeCategory === cat ? 'bg-pk-500 text-white' : 'bg-white border border-gray-200 text-gray-600 hover:border-pk-500'}`}>
                  {cat}
                </button>
              ))}
            </div>
            <div className="relative sm:ml-auto">
              <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="search"
                placeholder="Search articles..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-9 pr-4 py-2 bg-white border border-gray-200 rounded-full text-sm outline-none focus:border-pk-500 w-full sm:w-56 transition-colors"
              />
            </div>
          </div>

          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => <div key={i} className="h-64 bg-gray-200 rounded-xl animate-pulse" />)}
            </div>
          ) : filtered.length === 0 ? (
            <p className="text-center text-gray-500 py-16">No articles found. Try a different filter or search term.</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map((post) => (
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
          )}
        </div>
      </section>
    </>
  )
}
