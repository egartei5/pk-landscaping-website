'use client'
import { useState } from 'react'
import { MessageCircle, X, Phone } from 'lucide-react'

export default function WhatsAppButton() {
  const [open, setOpen] = useState(false)

  return (
    <div className="fixed bottom-24 right-5 z-50 sm:bottom-8 flex flex-col items-end gap-3">
      {open && (
        <div className="bg-white rounded-2xl shadow-2xl w-72 overflow-hidden animate-fade-up">
          <div className="bg-[#25D366] px-4 py-3 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 bg-white/20 rounded-full flex items-center justify-center">
                <MessageCircle size={18} className="text-white" />
              </div>
              <div>
                <p className="text-white font-bold text-sm">PK Landscaping</p>
                <p className="text-white/80 text-xs">Typically replies in minutes</p>
              </div>
            </div>
            <button onClick={() => setOpen(false)} className="text-white/80 hover:text-white">
              <X size={16} />
            </button>
          </div>
          <div className="p-4 bg-[#ECE5DD]">
            <div className="bg-white rounded-xl rounded-tl-none px-4 py-3 text-sm text-gray-700 shadow-sm mb-4">
              Hi! Ready to get a free estimate or have a question? We&apos;re here to help! 🌿
            </div>
            <a
              href="https://wa.me/12189791154?text=Hi%20PK%20Landscaping%2C%20I%20would%20like%20a%20free%20estimate%20for%20"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 w-full bg-[#25D366] hover:bg-[#20c05c] text-white font-bold py-3 rounded-xl transition-colors text-sm"
            >
              <MessageCircle size={16} />
              Start Chat on WhatsApp
            </a>
            <a
              href="tel:+12189791154"
              className="flex items-center justify-center gap-2 w-full mt-2 border border-gray-200 bg-white hover:bg-gray-50 text-gray-700 font-medium py-2.5 rounded-xl transition-colors text-sm"
            >
              <Phone size={14} />
              Call (218) 979-1154
            </a>
          </div>
        </div>
      )}

      <button
        onClick={() => setOpen(!open)}
        aria-label="Chat on WhatsApp"
        className="relative w-14 h-14 bg-[#25D366] hover:bg-[#20c05c] rounded-full flex items-center justify-center shadow-lg transition-all duration-200 hover:scale-110"
      >
        <span className="absolute inset-0 rounded-full bg-[#25D366] animate-pulse-ring" />
        <MessageCircle size={26} className="text-white relative z-10" />
      </button>
    </div>
  )
}
