'use client'
import { useState, useEffect } from 'react'
import { Plus, Trash2 } from 'lucide-react'

interface GalleryImage {
  id: number
  url: string
  alt: string
  category: string
  sortOrder: number
}

const CATEGORIES = ['Before & After', 'Lawn Care', 'Snow Removal', 'Paving', 'Landscaping', 'Hardscaping']

export default function AdminGalleryPage() {
  const [images, setImages] = useState<GalleryImage[]>([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [form, setForm] = useState({ url: '', alt: '', category: CATEGORIES[0], sortOrder: 0 })
  const [saving, setSaving] = useState(false)

  async function load() {
    const res = await fetch('/api/admin/gallery')
    setImages(await res.json())
    setLoading(false)
  }

  useEffect(() => { load() }, [])

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setSaving(true)
    await fetch('/api/admin/gallery', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    })
    setForm({ url: '', alt: '', category: CATEGORIES[0], sortOrder: 0 })
    setShowForm(false)
    setSaving(false)
    load()
  }

  async function deleteImage(id: number) {
    if (!confirm('Delete this image?')) return
    await fetch(`/api/admin/gallery/${id}`, { method: 'DELETE' })
    setImages((prev) => prev.filter((img) => img.id !== id))
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-heading text-3xl font-bold text-white">Gallery</h1>
          <p className="text-white/50 mt-1">{images.length} images</p>
        </div>
        <button
          onClick={() => setShowForm(!showForm)}
          className="flex items-center gap-2 bg-pk-500 hover:bg-pk-400 text-white font-semibold px-4 py-2.5 rounded-xl transition-colors"
        >
          <Plus className="w-4 h-4" />
          Add Image
        </button>
      </div>

      {showForm && (
        <form onSubmit={handleSubmit} className="bg-pk-900 rounded-2xl border border-pk-500/30 p-6 space-y-4">
          <h3 className="font-heading font-bold text-white">Add New Image</h3>
          <input
            value={form.url}
            onChange={(e) => setForm({ ...form, url: e.target.value })}
            placeholder="Image URL (Unsplash, CDN, etc.)"
            required
            className="w-full bg-pk-800 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:border-pk-500"
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              value={form.alt}
              onChange={(e) => setForm({ ...form, alt: e.target.value })}
              placeholder="Alt text / description"
              required
              className="bg-pk-800 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:border-pk-500"
            />
            <select
              value={form.category}
              onChange={(e) => setForm({ ...form, category: e.target.value })}
              className="bg-pk-800 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-pk-500"
            >
              {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>
          {form.url && (
            <div className="relative h-40 w-full rounded-xl overflow-hidden bg-pk-800">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={form.url} alt="Preview" className="w-full h-full object-cover" />
            </div>
          )}
          <div className="flex gap-3">
            <button type="submit" disabled={saving} className="bg-pk-500 hover:bg-pk-400 text-white font-semibold px-5 py-2.5 rounded-xl transition-colors">
              {saving ? 'Saving...' : 'Add Image'}
            </button>
            <button type="button" onClick={() => setShowForm(false)} className="bg-pk-800 text-white/70 hover:text-white px-5 py-2.5 rounded-xl transition-colors border border-white/10">
              Cancel
            </button>
          </div>
        </form>
      )}

      {loading && <div className="text-center text-white/30 py-12">Loading...</div>}

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {images.map((img) => (
          <div key={img.id} className="group relative rounded-xl overflow-hidden aspect-square bg-pk-900">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={img.url} alt={img.alt} className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-pk-950/70 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
              <button
                onClick={() => deleteImage(img.id)}
                className="p-2 bg-red-500/20 text-red-400 hover:bg-red-500/40 rounded-lg transition-colors"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
            <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-pk-950/90 to-transparent p-3 opacity-0 group-hover:opacity-100 transition-opacity">
              <p className="text-xs text-white truncate">{img.alt}</p>
              <p className="text-xs text-pk-400">{img.category}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
