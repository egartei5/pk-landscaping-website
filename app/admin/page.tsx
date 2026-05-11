import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'
import { authOptions } from '@/lib/auth'
import { db } from '@/lib/db'
import { Mail, FileText, Star, Image } from 'lucide-react'
import Link from 'next/link'

async function getStats() {
  const [totalLeads, unreadLeads, totalPosts, publishedPosts, totalTestimonials, galleryCount] =
    await Promise.all([
      db.lead.count(),
      db.lead.count({ where: { read: false } }),
      db.blogPost.count(),
      db.blogPost.count({ where: { published: true } }),
      db.testimonial.count(),
      db.galleryImage.count(),
    ])
  return { totalLeads, unreadLeads, totalPosts, publishedPosts, totalTestimonials, galleryCount }
}

export default async function AdminDashboard() {
  const session = await getServerSession(authOptions)
  if (!session) redirect('/admin/login')

  const stats = await getStats()
  const recentLeads = await db.lead.findMany({
    orderBy: { createdAt: 'desc' },
    take: 5,
  })

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-heading text-3xl font-bold text-white">Dashboard</h1>
        <p className="text-white/50 mt-1">Welcome back! Here&apos;s what&apos;s happening.</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Total Leads', value: stats.totalLeads, sub: `${stats.unreadLeads} unread`, icon: Mail, color: 'text-pk-400', href: '/admin/leads' },
          { label: 'Blog Posts', value: stats.totalPosts, sub: `${stats.publishedPosts} published`, icon: FileText, color: 'text-blue-400', href: '/admin/blog' },
          { label: 'Testimonials', value: stats.totalTestimonials, sub: 'all time', icon: Star, color: 'text-yellow-400', href: '/admin/testimonials' },
          { label: 'Gallery Images', value: stats.galleryCount, sub: 'uploaded', icon: Image, color: 'text-purple-400', href: '/admin/gallery' },
        ].map((s) => (
          <Link key={s.label} href={s.href} className="bg-pk-900 rounded-2xl p-5 border border-white/5 hover:border-pk-500/30 transition-colors">
            <div className="flex items-start justify-between mb-3">
              <s.icon className={`w-5 h-5 ${s.color}`} />
              {s.label === 'Total Leads' && stats.unreadLeads > 0 && (
                <span className="bg-pk-500 text-white text-xs font-bold rounded-full px-2 py-0.5">{stats.unreadLeads}</span>
              )}
            </div>
            <p className="font-heading text-3xl font-bold text-white">{s.value}</p>
            <p className="text-xs text-white/40 mt-1">{s.label}</p>
            <p className="text-xs text-white/30">{s.sub}</p>
          </Link>
        ))}
      </div>

      {/* Recent Leads */}
      <div className="bg-pk-900 rounded-2xl border border-white/5">
        <div className="flex items-center justify-between p-6 border-b border-white/5">
          <h2 className="font-heading text-lg font-bold text-white">Recent Leads</h2>
          <Link href="/admin/leads" className="text-pk-400 text-sm hover:text-pk-300 transition-colors">View all →</Link>
        </div>
        <div className="divide-y divide-white/5">
          {recentLeads.map((lead) => (
            <div key={lead.id} className="p-5 flex items-start gap-4">
              <div className={`w-2 h-2 rounded-full mt-1.5 flex-shrink-0 ${lead.read ? 'bg-white/20' : 'bg-pk-400'}`} />
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-3">
                  <p className="font-medium text-white text-sm">{lead.name}</p>
                  {lead.service && (
                    <span className="text-xs bg-pk-800 text-pk-400 px-2 py-0.5 rounded-full">{lead.service}</span>
                  )}
                </div>
                <p className="text-sm text-white/50 truncate mt-0.5">{lead.message}</p>
              </div>
              <span className="text-xs text-white/30 flex-shrink-0">
                {new Date(lead.createdAt).toLocaleDateString()}
              </span>
            </div>
          ))}
          {recentLeads.length === 0 && (
            <p className="p-6 text-center text-white/30 text-sm">No leads yet.</p>
          )}
        </div>
      </div>
    </div>
  )
}
