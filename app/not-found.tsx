import Link from 'next/link'
import { Home, Phone } from 'lucide-react'

export const metadata = { title: '404 — Page Not Found | PK Landscaping' }

export default function NotFound() {
  return (
    <div className="min-h-screen bg-pk-950 flex items-center justify-center px-4">
      <div className="text-center max-w-lg">
        <div className="font-heading text-9xl font-black text-pk-800 leading-none select-none mb-6">
          404
        </div>
        <h1 className="font-heading text-3xl font-bold text-white mb-3">
          Page Not Found
        </h1>
        <p className="text-white/60 mb-10 leading-relaxed">
          The page you&apos;re looking for doesn&apos;t exist. It may have been moved or deleted.
          Let us help you find what you need.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/" className="btn-primary flex items-center justify-center gap-2">
            <Home className="w-4 h-4" />
            Back to Home
          </Link>
          <Link href="/contact" className="btn-outline flex items-center justify-center gap-2">
            <Phone className="w-4 h-4" />
            Contact Us
          </Link>
        </div>
        <div className="mt-12 border-t border-white/5 pt-8">
          <p className="text-white/30 text-sm mb-4">Looking for a specific service?</p>
          <div className="flex flex-wrap gap-2 justify-center">
            {['Snow Removal', 'Lawn Mowing', 'Paving', 'Tree Services'].map((s) => (
              <Link
                key={s}
                href={`/services/${s.toLowerCase().replace(/ /g, '-')}`}
                className="text-xs text-pk-400 hover:text-pk-300 bg-pk-900 px-3 py-1.5 rounded-full border border-white/5 hover:border-pk-500/30 transition-colors"
              >
                {s}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
