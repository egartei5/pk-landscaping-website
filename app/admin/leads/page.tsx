'use client'
import { useState, useEffect } from 'react'
import { Mail, MailOpen, Trash2, Phone, Clock } from 'lucide-react'

interface Lead {
  id: number
  name: string
  phone: string | null
  email: string
  service: string | null
  message: string
  read: boolean
  createdAt: string
}

export default function AdminLeadsPage() {
  const [leads, setLeads] = useState<Lead[]>([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState<'all' | 'unread' | 'read'>('all')

  async function load() {
    const res = await fetch('/api/admin/leads')
    setLeads(await res.json())
    setLoading(false)
  }

  useEffect(() => { load() }, [])

  async function toggleRead(id: number, read: boolean) {
    await fetch(`/api/admin/leads/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ read }),
    })
    setLeads((prev) => prev.map((l) => (l.id === id ? { ...l, read } : l)))
  }

  async function deleteLead(id: number) {
    if (!confirm('Delete this lead?')) return
    await fetch(`/api/admin/leads/${id}`, { method: 'DELETE' })
    setLeads((prev) => prev.filter((l) => l.id !== id))
  }

  const filtered = leads.filter((l) =>
    filter === 'all' ? true : filter === 'unread' ? !l.read : l.read
  )

  const unreadCount = leads.filter((l) => !l.read).length

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-heading text-3xl font-bold text-white">Leads Inbox</h1>
          <p className="text-white/50 mt-1">{unreadCount} unread of {leads.length} total</p>
        </div>
        <div className="flex gap-2">
          {(['all', 'unread', 'read'] as const).map((f) => (
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

      <div className="bg-pk-900 rounded-2xl border border-white/5 divide-y divide-white/5">
        {loading && (
          <div className="p-12 text-center text-white/30">Loading...</div>
        )}
        {!loading && filtered.length === 0 && (
          <div className="p-12 text-center text-white/30">No leads found.</div>
        )}
        {filtered.map((lead) => (
          <div key={lead.id} className={`p-5 ${!lead.read ? 'bg-pk-500/5' : ''}`}>
            <div className="flex items-start gap-4">
              <div className={`w-2 h-2 rounded-full mt-2 flex-shrink-0 ${lead.read ? 'bg-white/20' : 'bg-pk-400'}`} />
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-3 flex-wrap">
                  <span className="font-semibold text-white">{lead.name}</span>
                  {lead.service && (
                    <span className="text-xs bg-pk-800 text-pk-400 px-2 py-0.5 rounded-full">{lead.service}</span>
                  )}
                  {!lead.read && (
                    <span className="text-xs bg-pk-500/20 text-pk-400 px-2 py-0.5 rounded-full font-semibold">NEW</span>
                  )}
                </div>
                <div className="flex gap-4 mt-1 text-sm text-white/50">
                  <a href={`mailto:${lead.email}`} className="hover:text-pk-400 transition-colors">{lead.email}</a>
                  {lead.phone && (
                    <a href={`tel:${lead.phone}`} className="flex items-center gap-1 hover:text-pk-400 transition-colors">
                      <Phone className="w-3 h-3" />{lead.phone}
                    </a>
                  )}
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {new Date(lead.createdAt).toLocaleString()}
                  </span>
                </div>
                <p className="mt-2 text-sm text-white/70 leading-relaxed">{lead.message}</p>
              </div>
              <div className="flex gap-2 flex-shrink-0">
                <button
                  onClick={() => toggleRead(lead.id, !lead.read)}
                  title={lead.read ? 'Mark unread' : 'Mark read'}
                  className="p-2 text-white/30 hover:text-pk-400 transition-colors rounded-lg hover:bg-pk-800"
                >
                  {lead.read ? <MailOpen className="w-4 h-4" /> : <Mail className="w-4 h-4" />}
                </button>
                <button
                  onClick={() => deleteLead(lead.id)}
                  className="p-2 text-white/30 hover:text-red-400 transition-colors rounded-lg hover:bg-red-500/10"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
