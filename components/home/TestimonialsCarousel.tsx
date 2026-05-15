'use client'
import { motion } from 'framer-motion'
import { Star } from 'lucide-react'
import type { Testimonial } from '@prisma/client'
import TextReveal from '@/components/motion/TextReveal'
import LineDrawIn from '@/components/motion/LineDrawIn'

interface Review {
  id: number
  name: string
  rating: number
  review: string
  service?: string
}

const staticReviews: Review[] = [
  {
    id: -1,
    name: 'Mike R.',
    rating: 5,
    review: 'PK Landscaping transformed our backyard completely. They installed a beautiful paver patio and cleaned up years of overgrowth. Professional, on-time, and reasonably priced.',
    service: 'Paver Installation',
  },
  {
    id: -2,
    name: 'Sarah L.',
    rating: 5,
    review: 'Used PK Landscaping for snow removal all winter and they were always there before I needed to leave for work. Never missed a storm — not once. Very reliable.',
    service: 'Snow Removal',
  },
  {
    id: -3,
    name: 'Tom W.',
    rating: 5,
    review: 'Great crew, great results. My lawn looks better than it ever has — showed up every week all summer without me having to follow up once. The stripes looked incredible.',
    service: 'Lawn Mowing',
  },
  {
    id: -4,
    name: 'Jennifer K.',
    rating: 5,
    review: 'Called them for a spring cleanup after a rough winter and they knocked it out in one day. Yard looks brand new. They also cleared out the gutters — above and beyond.',
    service: 'Seasonal Cleanup',
  },
  {
    id: -5,
    name: 'Dave H.',
    rating: 5,
    review: 'Had them grade and prep the back lot before we poured a new driveway. Showed up when they said they would, got it done right, and the site was clean when they left.',
    service: 'Road Paving',
  },
  {
    id: -6,
    name: 'Amanda J.',
    rating: 5,
    review: 'Several big trees needed trimming before the snow season hit. PK handled it fast, cleaned up every branch, and did a quick check on the rest of the yard. Super professional.',
    service: 'Tree Services',
  },
  {
    id: -7,
    name: 'Brandon T.',
    rating: 5,
    review: 'Got a quote same day I called and they started the rock landscaping job two days later. The finished result looks way better than I imagined. Neighbors were asking who did the work.',
    service: 'Landscaping',
  },
  {
    id: -8,
    name: 'Lisa M.',
    rating: 5,
    review: 'PK did our commercial parking lot snow removal all of last winter. Not a single complaint from tenants — lot was always clear by 6am. Will absolutely be renewing the contract.',
    service: 'Snow Removal',
  },
]

interface TestimonialsCarouselProps {
  testimonials: Testimonial[]
}

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5">
      {[...Array(5)].map((_, i) => (
        <Star key={i} size={12} className={i < rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-600'} />
      ))}
    </div>
  )
}

function ReviewCard({ name, rating, review, service }: {
  name: string; rating: number; review: string; service?: string
}) {
  const initials = name.split(' ').map((n) => n[0]).join('').slice(0, 2).toUpperCase()

  return (
    <div className="flex-shrink-0 w-80 bg-pk-800/70 border border-pk-700 rounded-2xl p-5 mx-3 select-none">
      <div className="flex items-center gap-3 mb-3">
        <div className="w-9 h-9 bg-pk-500 rounded-full flex items-center justify-center font-heading font-black text-white text-xs shrink-0">
          {initials}
        </div>
        <div>
          <p className="font-heading font-bold text-white text-sm">{name}</p>
          {service && <p className="text-pk-400 text-xs font-medium">{service}</p>}
        </div>
        <div className="ml-auto">
          <StarRating rating={rating} />
        </div>
      </div>
      <p className="text-gray-300 text-sm leading-relaxed">{review}</p>
    </div>
  )
}

function MarqueeRow({ reviews, reverse }: { reviews: Review[]; reverse?: boolean }) {
  const doubled = [...reviews, ...reviews]
  return (
    <div className="flex overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
      <div
        className={`flex ${reverse ? 'animate-marquee-reverse' : 'animate-marquee'} hover:[animation-play-state:paused]`}
        style={{ width: 'max-content' }}
      >
        {doubled.map((r, i) => (
          <ReviewCard key={`${r.id}-${i}`} name={r.name} rating={r.rating} review={r.review} service={r.service} />
        ))}
      </div>
    </div>
  )
}

export default function TestimonialsCarousel({ testimonials }: TestimonialsCarouselProps) {
  const dbReviews = testimonials.map((t) => ({
    id: t.id,
    name: t.name,
    rating: t.rating,
    review: t.review,
    service: t.service ?? undefined,
  }))

  const reviews = dbReviews.length > 0 ? dbReviews : staticReviews

  const half = Math.ceil(reviews.length / 2)
  const row1 = reviews.slice(0, half)
  const row2 = reviews.slice(half)

  const ensuredRow1 = row1.length >= 3 ? row1 : [...row1, ...staticReviews.slice(0, 4)]
  const ensuredRow2 = row2.length >= 3 ? row2 : [...row2, ...staticReviews.slice(4)]

  return (
    <div className="relative flex flex-col justify-center min-h-screen overflow-hidden py-24">
      {/* Radial glow */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_50%_60%_at_0%_100%,rgba(76,175,80,0.09)_0%,transparent_70%)]" />

      {/* Ghost number */}
      <div className="absolute top-8 right-6 font-heading font-black text-[140px] leading-none text-pk-900 select-none pointer-events-none hidden lg:block">
        05
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-14 w-full">
        <p className="section-label">Client Reviews</p>
        <LineDrawIn className="max-w-16 mt-2 mb-6" delay={0.1} />
        <TextReveal
          text="What Our Clients Say"
          as="h2"
          className="font-heading font-black text-white text-4xl sm:text-6xl lg:text-7xl tracking-tight mb-4"
        />
        <div className="flex items-center gap-2">
          <div className="flex gap-0.5">
            {[...Array(5)].map((_, i) => <Star key={i} size={14} className="text-yellow-400 fill-yellow-400" />)}
          </div>
          <span className="text-yellow-400 font-bold text-sm">5.0</span>
          <span className="text-gray-600 text-sm">· {reviews.length}+ reviews</span>
        </div>
      </div>

      <motion.div
        className="flex flex-col gap-4"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-5%' }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}
      >
        <MarqueeRow reviews={ensuredRow1} />
        <MarqueeRow reviews={ensuredRow2} reverse />
      </motion.div>
    </div>
  )
}
