'use client'
import { useState, useEffect } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import TestimonialCard from '@/components/ui/TestimonialCard'
import SectionLabel from '@/components/ui/SectionLabel'
import type { Testimonial } from '@prisma/client'

interface TestimonialsCarouselProps {
  testimonials: Testimonial[]
}

export default function TestimonialsCarousel({ testimonials }: TestimonialsCarouselProps) {
  const [index, setIndex] = useState(0)
  const [paused, setPaused] = useState(false)

  useEffect(() => {
    if (paused || testimonials.length <= 1) return
    const timer = setInterval(() => setIndex((i) => (i + 1) % testimonials.length), 5000)
    return () => clearInterval(timer)
  }, [paused, testimonials.length])

  const prev = () => setIndex((i) => (i - 1 + testimonials.length) % testimonials.length)
  const next = () => setIndex((i) => (i + 1) % testimonials.length)

  const visibleCount = 3
  const visible = Array.from({ length: Math.min(visibleCount, testimonials.length) }, (_, i) =>
    testimonials[(index + i) % testimonials.length]
  )

  return (
    <section className="bg-pk-900 py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <SectionLabel>Client Reviews</SectionLabel>
          <h2 className="font-heading font-black text-white text-4xl sm:text-5xl mb-4">
            What Our Clients Say
          </h2>
          <p className="text-gray-400 max-w-xl mx-auto">
            Real feedback from homeowners and businesses across Fargo, ND and surrounding communities.
          </p>
        </div>

        <div
          className="relative"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {visible.map((t) => (
              <TestimonialCard
                key={t.id}
                name={t.name}
                rating={t.rating}
                review={t.review}
                service={t.service}
                date={t.date.toISOString()}
              />
            ))}
          </div>

          {testimonials.length > 1 && (
            <div className="flex items-center justify-center gap-4">
              <button onClick={prev} className="w-10 h-10 bg-pk-800 hover:bg-pk-700 border border-pk-700 rounded-full flex items-center justify-center text-white transition-colors" aria-label="Previous testimonial">
                <ChevronLeft size={18} />
              </button>
              <div className="flex gap-2">
                {testimonials.map((_, i) => (
                  <button key={i} onClick={() => setIndex(i)} className={`w-2 h-2 rounded-full transition-colors ${i === index ? 'bg-pk-500' : 'bg-pk-700'}`} aria-label={`Go to testimonial ${i + 1}`} />
                ))}
              </div>
              <button onClick={next} className="w-10 h-10 bg-pk-800 hover:bg-pk-700 border border-pk-700 rounded-full flex items-center justify-center text-white transition-colors" aria-label="Next testimonial">
                <ChevronRight size={18} />
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
