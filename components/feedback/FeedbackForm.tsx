'use client'
import { useState } from 'react'
import { Star, CheckCircle } from 'lucide-react'

const SERVICES = [
  'Lawn Mowing', 'Snow Removal', 'Paver Installation', 'Road Paving',
  'Tree Services', 'Gutter Cleaning', 'Seasonal Cleanup', 'Brick Lane Construction', 'Other',
]

export default function FeedbackForm() {
  const [rating, setRating] = useState(0)
  const [hovered, setHovered] = useState(0)
  const [form, setForm] = useState({ name: '', email: '', service: '', review: '' })
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')
  const [done, setDone] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (rating === 0) { setError('Please select a star rating.'); return }
    if (!form.name || !form.review) { setError('Name and feedback are required.'); return }
    setSubmitting(true)
    setError('')
    try {
      const res = await fetch('/api/feedback', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, rating }),
      })
      const data = await res.json()
      if (!res.ok) { setError(data.error ?? 'Failed to submit.'); return }
      setDone(true)
    } catch {
      setError('Something went wrong. Please call (218) 979-1154.')
    } finally {
      setSubmitting(false)
    }
  }

  if (done) {
    return (
      <div className="bg-pk-900 border border-pk-700 rounded-3xl p-12 text-center max-w-lg mx-auto">
        <CheckCircle size={56} className="text-pk-500 mx-auto mb-4" />
        <h2 className="font-heading font-black text-white text-2xl mb-2">Thank You!</h2>
        <p className="text-gray-400 mb-2">Your feedback means the world to us.</p>
        <p className="text-gray-500 text-sm">We review every submission and may feature your review on our site.</p>
      </div>
    )
  }

  const displayRating = hovered || rating

  return (
    <form onSubmit={handleSubmit} className="bg-pk-900 border border-pk-700 rounded-3xl p-6 sm:p-10 max-w-2xl mx-auto">
      {/* Star rating */}
      <div className="text-center mb-8">
        <p className="text-gray-400 text-sm font-semibold uppercase tracking-widest mb-4">How would you rate your experience?</p>
        <div className="flex justify-center gap-2">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              type="button"
              onClick={() => setRating(star)}
              onMouseEnter={() => setHovered(star)}
              onMouseLeave={() => setHovered(0)}
              className="transition-transform hover:scale-110 focus:outline-none"
              aria-label={`Rate ${star} star${star > 1 ? 's' : ''}`}
            >
              <Star
                size={44}
                className={`transition-colors ${
                  star <= displayRating ? 'text-yellow-400 fill-yellow-400' : 'text-pk-700'
                }`}
              />
            </button>
          ))}
        </div>
        {displayRating > 0 && (
          <p className="text-pk-400 text-sm font-semibold mt-2">
            {['', 'Poor', 'Fair', 'Good', 'Great', 'Excellent!'][displayRating]}
          </p>
        )}
      </div>

      <div className="space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-gray-400 mb-1.5">Your Name *</label>
            <input
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              placeholder="John Smith"
              className="w-full px-4 py-3 bg-pk-800 border border-pk-700 text-white rounded-lg text-sm outline-none focus:border-pk-500 placeholder-gray-600"
            />
          </div>
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-gray-400 mb-1.5">Email <span className="normal-case text-gray-600 font-normal">(optional)</span></label>
            <input
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              type="email"
              placeholder="your@email.com"
              className="w-full px-4 py-3 bg-pk-800 border border-pk-700 text-white rounded-lg text-sm outline-none focus:border-pk-500 placeholder-gray-600"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-gray-400 mb-1.5">Service Received</label>
          <select
            value={form.service}
            onChange={(e) => setForm({ ...form, service: e.target.value })}
            className="w-full px-4 py-3 bg-pk-800 border border-pk-700 text-white rounded-lg text-sm outline-none focus:border-pk-500"
          >
            <option value="">Select a service...</option>
            {SERVICES.map((s) => <option key={s} value={s}>{s}</option>)}
          </select>
        </div>

        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-gray-400 mb-1.5">Your Feedback *</label>
          <textarea
            value={form.review}
            onChange={(e) => setForm({ ...form, review: e.target.value })}
            rows={5}
            placeholder="Tell us about your experience — what did we do well, and what could we improve?"
            className="w-full px-4 py-3 bg-pk-800 border border-pk-700 text-white rounded-lg text-sm outline-none focus:border-pk-500 placeholder-gray-600 resize-none"
          />
        </div>
      </div>

      {error && <p className="text-red-400 text-sm mt-4">{error}</p>}

      <button
        type="submit"
        disabled={submitting}
        className="btn-primary w-full mt-6 py-4 text-base disabled:opacity-60"
      >
        {submitting ? 'Submitting...' : 'Submit Feedback →'}
      </button>

      <p className="text-gray-600 text-xs text-center mt-4">Your feedback may be featured on our website after review.</p>
    </form>
  )
}
