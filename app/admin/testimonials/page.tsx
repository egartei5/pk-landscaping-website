'use client'
import { useState, useEffect } from 'react'
import { Plus, Trash2, Star, Check, X } from 'lucide-react'

interface Testimonial {
  id: number
  name: string
  rating: number
  review: string
  service: string | null
  published: boolean
  date: string
}

const SERVICES = ['Snow Removal', 'Road Paving', 'Paver Installation', 'Lawn Mowing', 'Tree Services', 'Gutter Cleaning', 'Brick Lane', 'Seasonal Cleanup']

export default function AdminTestimonialsPage() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [form, setForm] = useState({ name: '', rating: 5, review: '', service: '', published: true })
  const [saving, setSaving] = useState(false)

  async function load() {
    const res = await fetch('/api/admin/testimonials')
    setTestimonials(await res.json())
    setLoading(false)
  }

  useEffect(() => { load() }, [])

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setSaving(true)
    await fetch('/api/admin/testimonials', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    })
    setForm({ name: '', rating: 5, review: '', service: '', published: true })
    setShowForm(false)
    setSaving(false)
    load()
  }

  async function togglePublished(id: number, published: boolean) {
    await fetch(`/api/admin/testimonials/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ published }),
    })
    setTestimonials((prev) => prev.map((t) => (t.id === id ? { ...t, published } : t)))
  }

  async function deleteTestimonial(id: number) {
    if (!confirm('Delete this testimonial?')) return
    await fetch(`/api/admin/testimonials/${id}`, { method: 'DELETE' })
    setTestimonials((prev) => prev.filter((t) => t.id !== id))
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-heading text-3xl font-bold text-white">Testimonials</h1>
          <p className="text-white/50 mt-1">{testimonials.length} total</p>
        </div>
        <button
          onClick={() => setShowForm(!showForm)}
          className="flex items-center gap-2 bg-pk-500 hover:bg-pk-400 text-white font-semibold px-4 py-2.5 rounded-xl transition-colors"
        >
          <Plus className="w-4 h-4" />
          Add Testimonial
        </button>
      </div>

      {showForm && (
        <form onSubmit={handleSubmit} className="bg-pk-900 rounded-2xl border border-pk-500/30 p-6 space-y-4">
          <h3 className="font-heading font-bold text-white">Add New Testimonial</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              placeholder="Customer name"
              required
              className="bg-pk-800 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:border-pk-500"
            />
            <select
              value={form.service}
              onChange={(e) => setForm({ ...form, service: e.target.value })}
              className="bg-pk-800 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-pk-500"
            >
              <option value="">No service specified</option>
              {SERVICES.map((s) => <option key={s} value={s}>{s}</option>)}
            </select>
          </div>
          <div className="flex items-center gap-3">
            <label className="text-sm text-white/70">Rating:</label>
            {[1, 2, 3, 4, 5].map((n) => (
              <button
                key={n}
                type="button"
                onClick={() => setForm({ ...form, rating: n })}
                className={`transition-colors ${n <= form.rating ? 'text-yellow-400' : 'text-white/20'}`}
              >
                <Star className="w-5 h-5 fill-current" />
              </button>
            ))}
          </div>
          <textarea
            value={form.review}
            onChange={(e) => setForm({ ...form, review: e.target.value })}
            placeholder="Review text..."
            required
            rows={3}
            className="w-full bg-pk-800 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:border-pk-500 resize-none"
          />
          <div className="flex gap-3">
            <button type="submit" disabled={saving} className="bg-pk-500 hover:bg-pk-400 text-white font-semibold px-5 py-2.5 rounded-xl transition-colors">
              {saving ? 'Saving...' : 'Save'}
            </button>
            <button type="button" onClick={() => setShowForm(false)} className="bg-pk-800 text-white/70 hover:text-white px-5 py-2.5 rounded-xl transition-colors border border-white/10">
              Cancel
            </button>
          </div>
        </form>
      )}

      <div className="bg-pk-900 rounded-2xl border border-white/5 divide-y divide-white/5">
        {loading && <div className="p-12 text-center text-white/30">Loading...</div>}
        {testimonials.map((t) => (
          <div key={t.id} className="p-5 flex items-start gap-4">
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-3 flex-wrap">
                <span className="font-semibold text-white">{t.name}</span>
                {t.service && <span className="text-xs bg-pk-800 text-pk-400 px-2 py-0.5 rounded-full">{t.service}</span>}
                <div className="flex">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className={`w-3.5 h-3.5 ${i < t.rating ? 'text-yellow-400 fill-yellow-400' : 'text-white/20'}`} />
                  ))}
                </div>
              </div>
              <p className="text-sm text-white/60 mt-1 italic">&ldquo;{t.review}&rdquo;</p>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => togglePublished(t.id, !t.published)}
                title={t.published ? 'Unpublish' : 'Publish'}
                className={`p-2 rounded-lg transition-colors ${t.published ? 'text-green-400 hover:bg-green-500/10' : 'text-white/30 hover:text-green-400 hover:bg-green-500/10'}`}
              >
                {t.published ? <Check className="w-4 h-4" /> : <X className="w-4 h-4" />}
              </button>
              <button onClick={() => deleteTestimonial(t.id)} className="p-2 text-white/30 hover:text-red-400 transition-colors rounded-lg hover:bg-red-500/10">
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
