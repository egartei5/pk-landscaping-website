'use client'
import { useEffect, useState } from 'react'
import { ArrowUp } from 'lucide-react'

export default function BackToTop() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 400)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  if (!visible) return null

  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      aria-label="Back to top"
      className="fixed bottom-20 right-4 sm:bottom-8 sm:right-6 z-50 w-11 h-11 bg-pk-500 hover:bg-pk-400 text-white rounded-full shadow-lg flex items-center justify-center transition-all duration-200 hover:-translate-y-1"
    >
      <ArrowUp size={18} />
    </button>
  )
}
