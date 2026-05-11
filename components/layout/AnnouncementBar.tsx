'use client'
import { useState } from 'react'
import { X, Phone } from 'lucide-react'

export default function AnnouncementBar() {
  const [visible, setVisible] = useState(true)
  if (!visible) return null
  return (
    <div className="bg-pk-900 text-white text-sm py-2 px-4 flex items-center justify-between relative z-50">
      <div className="flex items-center gap-2 mx-auto">
        <span className="text-gray-400">Have a question?</span>
        <a href="tel:+12189791154" className="flex items-center gap-1.5 font-bold text-pk-500 hover:text-pk-400 transition-colors">
          <Phone size={13} />
          Call Now: (218) 979-1154
        </a>
      </div>
      <button
        onClick={() => setVisible(false)}
        className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
        aria-label="Dismiss announcement"
      >
        <X size={14} />
      </button>
    </div>
  )
}
