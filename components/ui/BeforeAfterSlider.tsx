'use client'
import { useRef, useState, useCallback } from 'react'
import Image from 'next/image'
import { GripVertical } from 'lucide-react'

interface BeforeAfterSliderProps {
  before: string
  after: string
  beforeAlt: string
  afterAlt: string
  label: string
  location: string
}

export default function BeforeAfterSlider({
  before, after, beforeAlt, afterAlt, label, location,
}: BeforeAfterSliderProps) {
  const [position, setPosition] = useState(50)
  const [dragging, setDragging] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  const updatePosition = useCallback((clientX: number) => {
    const el = containerRef.current
    if (!el) return
    const { left, width } = el.getBoundingClientRect()
    const pct = Math.min(Math.max(((clientX - left) / width) * 100, 2), 98)
    setPosition(pct)
  }, [])

  const onPointerDown = (e: React.PointerEvent) => {
    e.currentTarget.setPointerCapture(e.pointerId)
    setDragging(true)
    updatePosition(e.clientX)
  }
  const onPointerMove = (e: React.PointerEvent) => {
    if (!dragging) return
    updatePosition(e.clientX)
  }
  const onPointerUp = () => setDragging(false)

  return (
    <div className="rounded-2xl overflow-hidden border border-pk-700 hover:border-pk-500/60 transition-colors duration-300 group bg-pk-900">
      <div
        ref={containerRef}
        className="relative aspect-[4/3] select-none overflow-hidden cursor-col-resize"
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerLeave={onPointerUp}
      >
        {/* After image (full width, behind) */}
        <Image
          src={after}
          alt={afterAlt}
          fill
          loading="lazy"
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 33vw"
          draggable={false}
        />

        {/* Before image (clipped to left side) */}
        <div
          className="absolute inset-0 overflow-hidden"
          style={{ clipPath: `inset(0 ${100 - position}% 0 0)` }}
        >
          <Image
            src={before}
            alt={beforeAlt}
            fill
            loading="lazy"
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 33vw"
            draggable={false}
          />
          <div className="absolute inset-0 bg-pk-900/10" />
        </div>

        {/* Divider line */}
        <div
          className="absolute top-0 bottom-0 w-0.5 bg-white shadow-[0_0_12px_rgba(255,255,255,0.6)] pointer-events-none z-10"
          style={{ left: `${position}%` }}
        />

        {/* Drag handle */}
        <div
          className={`absolute top-1/2 -translate-y-1/2 -translate-x-1/2 z-20 w-10 h-10 bg-white rounded-full shadow-xl flex items-center justify-center pointer-events-none transition-transform duration-150 ${dragging ? 'scale-110' : 'scale-100 group-hover:scale-105'}`}
          style={{ left: `${position}%` }}
        >
          <GripVertical size={18} className="text-pk-900" />
        </div>

        {/* Labels */}
        <div className="absolute top-3 left-3 z-10 bg-black/70 text-white text-xs font-bold px-2.5 py-1 rounded-full tracking-wide pointer-events-none">
          Before
        </div>
        <div className="absolute top-3 right-3 z-10 bg-pk-500 text-white text-xs font-bold px-2.5 py-1 rounded-full tracking-wide pointer-events-none">
          After
        </div>

        {/* Hint text — fades out after interaction starts */}
        {position === 50 && !dragging && (
          <div className="absolute bottom-14 left-1/2 -translate-x-1/2 z-10 pointer-events-none">
            <span className="text-xs text-white/80 bg-black/50 px-3 py-1.5 rounded-full font-medium whitespace-nowrap">
              ← Drag to compare →
            </span>
          </div>
        )}
      </div>

      <div className="px-4 py-3 flex items-center justify-between bg-pk-900">
        <div>
          <p className="text-white font-heading font-bold text-sm">{label}</p>
          <p className="text-pk-400 text-xs mt-0.5">{location}</p>
        </div>
        <span className="text-xs text-gray-500 font-medium">Drag to reveal</span>
      </div>
    </div>
  )
}
