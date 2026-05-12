'use client'
import Link from 'next/link'
import { Phone, FileText } from 'lucide-react'

export default function MobileCTABar() {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 flex sm:hidden border-t border-pk-700 shadow-2xl">
      <a
        href="tel:+12189791154"
        className="flex-1 bg-pk-800 hover:bg-pk-700 text-white flex items-center justify-center gap-2 py-4 font-bold text-sm transition-colors"
      >
        <Phone size={17} />
        Call Now
      </a>
      <Link
        href="/contact"
        className="flex-1 bg-pk-500 hover:bg-pk-400 text-white flex items-center justify-center gap-2 py-4 font-bold text-sm transition-colors"
      >
        <FileText size={17} />
        Contact Us
      </Link>
    </div>
  )
}
