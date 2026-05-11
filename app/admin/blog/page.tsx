'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Plus, Edit2, Trash2, Eye } from 'lucide-react'

interface Post {
  id: number
  title: string
  slug: string
  category: string
  published: boolean
  createdAt: string
}

export default function AdminBlogPage() {
  const [posts, setPosts] = useState<Post[]>([])
  const [loading, setLoading] = useState(true)

  async function load() {
    const res = await fetch('/api/admin/blog')
    setPosts(await res.json())
    setLoading(false)
  }

  useEffect(() => { load() }, [])

  async function deletePost(id: number) {
    if (!confirm('Delete this post permanently?')) return
    await fetch(`/api/admin/blog/${id}`, { method: 'DELETE' })
    setPosts((prev) => prev.filter((p) => p.id !== id))
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-heading text-3xl font-bold text-white">Blog Posts</h1>
          <p className="text-white/50 mt-1">{posts.length} posts total</p>
        </div>
        <Link href="/admin/blog/new" className="flex items-center gap-2 bg-pk-500 hover:bg-pk-400 text-white font-semibold px-4 py-2.5 rounded-xl transition-colors">
          <Plus className="w-4 h-4" />
          New Post
        </Link>
      </div>

      <div className="bg-pk-900 rounded-2xl border border-white/5 divide-y divide-white/5">
        {loading && <div className="p-12 text-center text-white/30">Loading...</div>}
        {!loading && posts.length === 0 && (
          <div className="p-12 text-center text-white/30">
            <p className="mb-4">No posts yet.</p>
            <Link href="/admin/blog/new" className="text-pk-400 hover:text-pk-300">Create your first post →</Link>
          </div>
        )}
        {posts.map((post) => (
          <div key={post.id} className="flex items-center gap-4 p-5">
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-3">
                <h3 className="font-semibold text-white truncate">{post.title}</h3>
                <span className="text-xs bg-pk-800 text-pk-400 px-2 py-0.5 rounded-full flex-shrink-0">{post.category}</span>
                {post.published ? (
                  <span className="text-xs bg-green-500/20 text-green-400 px-2 py-0.5 rounded-full flex-shrink-0">Published</span>
                ) : (
                  <span className="text-xs bg-white/10 text-white/40 px-2 py-0.5 rounded-full flex-shrink-0">Draft</span>
                )}
              </div>
              <p className="text-sm text-white/40 mt-0.5">/{post.slug} · {new Date(post.createdAt).toLocaleDateString()}</p>
            </div>
            <div className="flex gap-2">
              {post.published && (
                <Link href={`/blog/${post.slug}`} target="_blank" className="p-2 text-white/30 hover:text-pk-400 transition-colors rounded-lg hover:bg-pk-800">
                  <Eye className="w-4 h-4" />
                </Link>
              )}
              <Link href={`/admin/blog/${post.id}`} className="p-2 text-white/30 hover:text-pk-400 transition-colors rounded-lg hover:bg-pk-800">
                <Edit2 className="w-4 h-4" />
              </Link>
              <button onClick={() => deletePost(post.id)} className="p-2 text-white/30 hover:text-red-400 transition-colors rounded-lg hover:bg-red-500/10">
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
