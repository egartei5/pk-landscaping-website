export const dynamic = 'force-dynamic'

import type { Metadata } from 'next'
import Link from 'next/link'
import { Star, ExternalLink } from 'lucide-react'
import { db } from '@/lib/db'
import { buildMetadata } from '@/lib/seo'
import SectionLabel from '@/components/ui/SectionLabel'
import TestimonialCard from '@/components/ui/TestimonialCard'

export const revalidate = 3600

export const metadata: Metadata = buildMetadata({
  title: 'Client Testimonials',
  description: 'Read what homeowners and businesses across Fargo, ND say about PK Landscaping Service. Verified reviews from satisfied clients.',
  path: '/testimonials',
})

export default async function TestimonialsPage() {
  const testimonials = await db.testimonial.findMany({ where: { published: true }, orderBy: { date: 'desc' } })

  return (
    <>
      <div className="bg-pk-900 pt-32 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <SectionLabel>Client Reviews</SectionLabel>
          <h1 className="font-heading font-black text-white text-5xl sm:text-6xl mb-4">
            Satisfied Clients Share Their Experiences
          </h1>
          <p className="text-gray-400 text-lg">
            Real feedback from homeowners and businesses across Fargo, ND and surrounding communities.
          </p>
        </div>
      </div>

      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-pk-950">
        <div className="max-w-7xl mx-auto">
          {/* Summary bar */}
          <div className="bg-pk-800 border border-pk-700 rounded-2xl p-6 mb-10 flex flex-col sm:flex-row items-center gap-6">
            <div className="text-center">
              <div className="flex justify-center gap-0.5 mb-1">
                {[...Array(5)].map((_, i) => <Star key={i} size={20} className="text-yellow-400 fill-yellow-400" />)}
              </div>
              <p className="font-heading font-black text-white text-3xl">5.0</p>
              <p className="text-gray-400 text-sm">Average Rating</p>
            </div>
            <div className="w-px h-16 bg-pk-700 hidden sm:block" />
            <div className="text-center">
              <p className="font-heading font-black text-white text-3xl">{testimonials.length}</p>
              <p className="text-gray-400 text-sm">Total Reviews</p>
            </div>
            <div className="w-px h-16 bg-pk-700 hidden sm:block" />
            <div className="flex-1 text-center sm:text-left">
              <p className="text-gray-300 text-sm mb-3">We encourage satisfied clients to share their experience on Google to help others find trusted landscaping services.</p>
              <a
                href="https://business.google.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-pk-500 font-bold text-sm hover:text-pk-400 transition-colors"
              >
                Leave a Google Review <ExternalLink size={14} />
              </a>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {testimonials.map((t) => (
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

          <div className="text-center mt-12">
            <Link href="/contact" className="btn-primary text-base px-8 py-4">Contact Us</Link>
          </div>
        </div>
      </section>
    </>
  )
}
