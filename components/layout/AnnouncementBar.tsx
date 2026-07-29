'use client'
import { useState } from 'react'
import { X, Phone, Star } from 'lucide-react'

export default function AnnouncementBar() {
  const [visible, setVisible] = useState(true)
  if (!visible) return null
  return (
    <div className="bg-pk-500 text-white text-sm py-2 px-4 flex items-center justify-between relative z-50">
      <div className="flex items-center gap-3 mx-auto flex-wrap justify-center">
        <div className="flex items-center gap-1">
          {[...Array(5)].map((_, i) => <Star key={i} size={10} className="fill-white text-white" />)}
          <span className="font-bold ml-1">5.0 Rated</span>
        </div>
        <span className="text-white/60 hidden sm:inline">·</span>
        <span className="text-white/90 hidden sm:inline">10% OFF for New Customers</span>
        <span className="text-white/60 hidden sm:inline">·</span>
        <a href="tel:+12189791154" className="flex items-center gap-1.5 font-black hover:text-white/80 transition-colors">
          <Phone size={12} />
          (218) 979-1154
        </a>
      </div>
      <button
        onClick={() => setVisible(false)}
        className="absolute right-4 top-1/2 -translate-y-1/2 text-white/60 hover:text-white transition-colors"
        aria-label="Dismiss announcement"
      >
        <X size={14} />
      </button>
    </div>
  )
}
