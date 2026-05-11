'use client'
import { useState, useEffect } from 'react'
import { ChevronLeft, ChevronRight, Star, Quote } from 'lucide-react'
import SectionLabel from '@/components/ui/SectionLabel'
import type { Testimonial } from '@prisma/client'

const staticReviews = [
  {
    id: -1,
    name: 'Mike R.',
    rating: 5,
    review: 'PK Landscaping transformed our backyard completely. They installed a beautiful paver patio and cleaned up years of overgrowth. Professional, on-time, and reasonably priced. Highly recommend!',
    service: 'Paver Installation',
    date: new Date('2025-09-12'),
  },
  {
    id: -2,
    name: 'Sarah L.',
    rating: 5,
    review: 'Used PK Landscaping for snow removal all winter and they were always there before I needed to leave for work. Very reliable and never missed a storm. Will definitely use them again next season.',
    service: 'Snow Removal',
    date: new Date('2025-03-04'),
  },
  {
    id: -3,
    name: 'Tom W.',
    rating: 5,
    review: 'Great crew, great results. My lawn looks better than ever — they showed up weekly all summer without fail. Communication was easy and pricing was fair. 5 stars without hesitation.',
    service: 'Lawn Mowing',
    date: new Date('2025-08-22'),
  },
  {
    id: -4,
    name: 'Jennifer K.',
    rating: 5,
    review: 'Had them do a spring cleanup and gutter cleaning. The yard was a mess after winter and they made it look pristine. Gutters are completely clear. Super friendly team — will be calling them for summer maintenance too.',
    service: 'Spring Cleanup',
    date: new Date('2025-05-10'),
  },
  {
    id: -5,
    name: 'Dave H.',
    rating: 5,
    review: "PK did an outstanding job on our driveway. The road paving was smooth, clean, and completed faster than expected. Crew was professional and left the site spotless. Couldn't be happier.",
    service: 'Road Paving',
    date: new Date('2025-07-18'),
  },
  {
    id: -6,
    name: 'Amanda J.',
    rating: 5,
    review: 'We had several large trees that needed trimming before winter. PK Landscaping handled everything safely and cleaned up every branch. Our property looks so much better and we feel safe with the trees now.',
    service: 'Tree Services',
    date: new Date('2025-10-03'),
  },
]

interface TestimonialsCarouselProps {
  testimonials: Testimonial[]
}

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5">
      {[...Array(5)].map((_, i) => (
        <Star key={i} size={14} className={i < rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-600'} />
      ))}
    </div>
  )
}

function ReviewCard({ name, rating, review, service, date }: {
  name: string; rating: number; review: string; service?: string | null; date: Date
}) {
  const initials = name.split(' ').map((n) => n[0]).join('').slice(0, 2).toUpperCase()
  const month = date.toLocaleString('default', { month: 'short' })
  const year = date.getFullYear()

  return (
    <div className="bg-pk-800/60 border border-pk-700 rounded-2xl p-6 flex flex-col h-full">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-pk-500 rounded-full flex items-center justify-center font-heading font-black text-white text-sm shrink-0">
            {initials}
          </div>
          <div>
            <p className="font-heading font-bold text-white text-sm">{name}</p>
            <p className="text-gray-500 text-xs">{month} {year}</p>
          </div>
        </div>
        <Quote size={20} className="text-pk-700 shrink-0 mt-0.5" />
      </div>
      <StarRating rating={rating} />
      <p className="text-gray-300 text-sm leading-relaxed mt-3 flex-1">{review}</p>
      {service && (
        <div className="mt-4 pt-3 border-t border-pk-700">
          <span className="text-xs text-pk-400 font-semibold">{service}</span>
        </div>
      )}
    </div>
  )
}

export default function TestimonialsCarousel({ testimonials }: TestimonialsCarouselProps) {
  const reviews = testimonials.length > 0
    ? testimonials.map((t) => ({
        id: t.id,
        name: t.name,
        rating: t.rating,
        review: t.review,
        service: t.service,
        date: t.date,
      }))
    : staticReviews

  const [index, setIndex] = useState(0)
  const [paused, setPaused] = useState(false)

  useEffect(() => {
    if (paused || reviews.length <= 3) return
    const timer = setInterval(() => setIndex((i) => (i + 1) % reviews.length), 5000)
    return () => clearInterval(timer)
  }, [paused, reviews.length])

  const prev = () => setIndex((i) => (i - 1 + reviews.length) % reviews.length)
  const next = () => setIndex((i) => (i + 1) % reviews.length)

  const visible = Array.from({ length: Math.min(3, reviews.length) }, (_, i) =>
    reviews[(index + i) % reviews.length]
  )

  return (
    <section className="bg-pk-900 py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <SectionLabel>Client Reviews</SectionLabel>
          <h2 className="font-heading font-black text-white text-4xl sm:text-5xl mb-3">
            What Our Clients Say
          </h2>
          <div className="flex items-center justify-center gap-2 mb-3">
            <div className="flex gap-0.5">
              {[...Array(5)].map((_, i) => <Star key={i} size={16} className="text-yellow-400 fill-yellow-400" />)}
            </div>
            <span className="text-yellow-400 font-bold text-sm">5.0</span>
            <span className="text-gray-500 text-sm">· {reviews.length} reviews</span>
          </div>
          <p className="text-gray-400 max-w-xl mx-auto">
            Real feedback from homeowners across Fargo, Moorhead, and surrounding communities.
          </p>
        </div>

        <div
          className="relative"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {visible.map((r) => (
              <ReviewCard
                key={r.id}
                name={r.name}
                rating={r.rating}
                review={r.review}
                service={r.service}
                date={r.date}
              />
            ))}
          </div>

          {reviews.length > 3 && (
            <div className="flex items-center justify-center gap-4">
              <button onClick={prev} className="w-10 h-10 bg-pk-800 hover:bg-pk-700 border border-pk-700 rounded-full flex items-center justify-center text-white transition-colors" aria-label="Previous testimonial">
                <ChevronLeft size={18} />
              </button>
              <div className="flex gap-2">
                {reviews.map((_, i) => (
                  <button key={i} onClick={() => setIndex(i)} className={`w-2 h-2 rounded-full transition-colors ${i === index ? 'bg-pk-500' : 'bg-pk-700'}`} aria-label={`Review ${i + 1}`} />
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
