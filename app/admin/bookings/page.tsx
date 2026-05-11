'use client'
import { useState, useEffect } from 'react'
import { CheckCircle, XCircle, Trash2, Clock, Calendar, Phone, Mail, MapPin } from 'lucide-react'

interface Booking {
  id: number
  name: string
  phone: string | null
  email: string
  service: string
  date: string
  timeSlot: string
  location: string | null
  notes: string | null
  status: string
  createdAt: string
}

const statusStyles: Record<string, string> = {
  pending: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
  accepted: 'bg-green-500/20 text-green-400 border-green-500/30',
  rejected: 'bg-red-500/20 text-red-400 border-red-500/30',
}

function formatDate(ymd: string) {
  const [y, m, d] = ymd.split('-').map(Number)
  return new Date(y, m - 1, d).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' })
}

export default function AdminBookingsPage() {
  const [bookings, setBookings] = useState<Booking[]>([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState<'all' | 'pending' | 'accepted' | 'rejected'>('pending')

  async function load() {
    const res = await fetch('/api/admin/bookings')
    setBookings(await res.json())
    setLoading(false)
  }

  useEffect(() => { load() }, [])

  async function updateStatus(id: number, status: 'accepted' | 'rejected') {
    await fetch(`/api/admin/bookings/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status }),
    })
    setBookings((prev) => prev.map((b) => (b.id === id ? { ...b, status } : b)))
  }

  async function deleteBooking(id: number) {
    if (!confirm('Delete this booking?')) return
    await fetch(`/api/admin/bookings/${id}`, { method: 'DELETE' })
    setBookings((prev) => prev.filter((b) => b.id !== id))
  }

  const filtered = bookings.filter((b) => filter === 'all' || b.status === filter)
  const pendingCount = bookings.filter((b) => b.status === 'pending').length

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h1 className="font-heading text-3xl font-bold text-white">Bookings</h1>
          <p className="text-white/50 mt-1">
            {pendingCount > 0
              ? <span className="text-yellow-400 font-semibold">{pendingCount} pending</span>
              : 'No pending requests'}
            {' '}· {bookings.length} total
          </p>
        </div>
        <div className="flex gap-2 flex-wrap">
          {(['pending', 'accepted', 'rejected', 'all'] as const).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-4 py-2 rounded-xl text-sm font-medium capitalize transition-colors ${
                filter === f ? 'bg-pk-500 text-white' : 'bg-pk-900 text-white/50 hover:text-white border border-white/10'
              }`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-4">
        {loading && <div className="text-center text-white/30 py-12">Loading...</div>}
        {!loading && filtered.length === 0 && (
          <div className="bg-pk-900 rounded-2xl border border-white/5 p-12 text-center text-white/30">
            No {filter === 'all' ? '' : filter} bookings found.
          </div>
        )}
        {filtered.map((b) => (
          <div key={b.id} className={`bg-pk-900 rounded-2xl border p-5 ${b.status === 'pending' ? 'border-yellow-500/30' : 'border-white/5'}`}>
            <div className="flex items-start gap-4">
              <div className="flex-1 min-w-0">
                {/* Header row */}
                <div className="flex items-center gap-3 flex-wrap mb-3">
                  <span className="font-heading font-bold text-white text-lg">{b.name}</span>
                  <span className={`text-xs px-2.5 py-1 rounded-full border font-semibold capitalize ${statusStyles[b.status]}`}>
                    {b.status}
                  </span>
                  <span className="text-xs bg-pk-800 text-pk-400 px-2.5 py-1 rounded-full">{b.service}</span>
                </div>

                {/* Date/Time highlight */}
                <div className="flex items-center gap-2 mb-3 bg-pk-800 rounded-xl px-4 py-2.5 w-fit">
                  <Calendar size={14} className="text-pk-400" />
                  <span className="text-white font-semibold text-sm">{formatDate(b.date)}</span>
                  <span className="text-gray-500">·</span>
                  <Clock size={14} className="text-pk-400" />
                  <span className="text-pk-300 font-semibold text-sm">{b.timeSlot}</span>
                </div>

                {/* Contact info */}
                <div className="flex flex-wrap gap-x-5 gap-y-1.5 text-sm text-white/50 mb-2">
                  <a href={`mailto:${b.email}`} className="flex items-center gap-1.5 hover:text-pk-400 transition-colors">
                    <Mail size={13} /> {b.email}
                  </a>
                  {b.phone && (
                    <a href={`tel:${b.phone}`} className="flex items-center gap-1.5 hover:text-pk-400 transition-colors">
                      <Phone size={13} /> {b.phone}
                    </a>
                  )}
                  {b.location && (
                    <span className="flex items-center gap-1.5">
                      <MapPin size={13} className="text-pk-500" /> {b.location}
                    </span>
                  )}
                </div>

                {b.notes && (
                  <p className="text-sm text-white/40 italic mt-1">&ldquo;{b.notes}&rdquo;</p>
                )}
                <p className="text-xs text-white/20 mt-2">Submitted {new Date(b.createdAt).toLocaleString()}</p>
              </div>

              {/* Actions */}
              <div className="flex flex-col gap-2 shrink-0">
                {b.status === 'pending' && (
                  <>
                    <button
                      onClick={() => updateStatus(b.id, 'accepted')}
                      className="flex items-center gap-1.5 px-4 py-2 bg-green-500/10 hover:bg-green-500/20 text-green-400 border border-green-500/30 rounded-xl text-sm font-semibold transition-colors"
                    >
                      <CheckCircle size={15} /> Accept
                    </button>
                    <button
                      onClick={() => updateStatus(b.id, 'rejected')}
                      className="flex items-center gap-1.5 px-4 py-2 bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/30 rounded-xl text-sm font-semibold transition-colors"
                    >
                      <XCircle size={15} /> Reject
                    </button>
                  </>
                )}
                {b.status !== 'pending' && (
                  <button
                    onClick={() => updateStatus(b.id, b.status === 'accepted' ? 'rejected' : 'accepted')}
                    className="px-4 py-2 bg-pk-800 hover:bg-pk-700 text-white/50 hover:text-white border border-white/10 rounded-xl text-sm transition-colors"
                  >
                    Toggle
                  </button>
                )}
                <button
                  onClick={() => deleteBooking(b.id)}
                  className="p-2 text-white/20 hover:text-red-400 hover:bg-red-500/10 rounded-xl transition-colors self-center"
                >
                  <Trash2 size={15} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
