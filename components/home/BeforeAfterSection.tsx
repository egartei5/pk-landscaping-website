'use client'
import { useState } from 'react'
import Image from 'next/image'
import SectionLabel from '@/components/ui/SectionLabel'

const transformations = [
  {
    label: 'Pool Area Landscaping',
    location: 'Fargo, ND',
    before: '/images/backyard-before-dirt-fargo.jpg',
    after: '/images/gravel-pool-landscaping-after-fargo.jpg',
    beforeAlt: 'Bare dirt backyard before landscaping in Fargo ND',
    afterAlt: 'Finished gravel and paver pool area landscaping in Fargo ND',
  },
  {
    label: 'Paver Patio Install',
    location: 'West Fargo, ND',
    before: '/images/landscape-before-bare-dirt.jpg',
    after: '/images/paver-patio-installation-fargo.jpg',
    beforeAlt: 'Bare dirt yard before paver installation in West Fargo',
    afterAlt: 'Completed multi-color paver patio installation in West Fargo ND',
  },
  {
    label: 'Lawn Restoration',
    location: 'Moorhead, MN',
    before: '/images/lawn-grading-prep-before.jpg',
    after: '/images/lawn-mowing-stripes-neighborhood-fargo.jpg',
    beforeAlt: 'Graded soil before lawn restoration in Moorhead MN',
    afterAlt: 'Beautiful striped lawn after restoration service in Moorhead MN',
  },
]

export default function BeforeAfterSection() {
  const [hovered, setHovered] = useState<string | null>(null)

  return (
    <section className="bg-pk-950 py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-14">
          <SectionLabel>Real Results</SectionLabel>
          <h2 className="font-heading font-black text-white text-4xl sm:text-5xl mb-4">
            Before &amp; After
          </h2>
          <p className="text-gray-400 max-w-xl mx-auto">
            Real transformations from real Fargo-area properties — from neglected yards to stunning outdoor spaces.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {transformations.map((t) => (
            <div
              key={t.label}
              className="rounded-2xl overflow-hidden border border-pk-800 group transition-all duration-300 hover:border-pk-500 hover:shadow-2xl hover:shadow-pk-500/10"
              onMouseEnter={() => setHovered(t.label)}
              onMouseLeave={() => setHovered(null)}
            >
              {/* Image pair */}
              <div className="grid grid-cols-2 relative">
                {/* Before */}
                <div className="relative">
                  <div className="absolute top-2 left-2 z-10 bg-black/80 text-white text-xs font-bold px-2.5 py-1 rounded-full tracking-wide">
                    Before
                  </div>
                  <div className="aspect-[3/4] relative overflow-hidden">
                    <Image
                      src={t.before}
                      alt={t.beforeAlt}
                      fill
                      loading="lazy"
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                      sizes="(max-width: 768px) 50vw, 16vw"
                    />
                    <div className="absolute inset-0 bg-pk-900/20" />
                  </div>
                </div>

                {/* Divider arrow */}
                <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20 w-8 h-8 bg-pk-500 rounded-full flex items-center justify-center shadow-lg shadow-pk-500/50 transition-transform duration-300 group-hover:scale-110">
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <path d="M5 2L9 7L5 12" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>

                {/* After */}
                <div className="relative">
                  <div className="absolute top-2 right-2 z-10 bg-pk-500 text-white text-xs font-bold px-2.5 py-1 rounded-full tracking-wide">
                    After
                  </div>
                  <div className="aspect-[3/4] relative overflow-hidden">
                    <Image
                      src={t.after}
                      alt={t.afterAlt}
                      fill
                      loading="lazy"
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                      sizes="(max-width: 768px) 50vw, 16vw"
                    />
                  </div>
                </div>
              </div>

              {/* Label */}
              <div className="bg-pk-900 px-4 py-3 flex items-center justify-between">
                <div>
                  <p className="text-white font-heading font-bold text-sm">{t.label}</p>
                  <p className="text-pk-400 text-xs mt-0.5">{t.location}</p>
                </div>
                <div className={`w-2 h-2 rounded-full transition-colors duration-300 ${hovered === t.label ? 'bg-pk-400' : 'bg-pk-700'}`} />
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-12">
          <p className="text-gray-400 text-sm mb-4">Ready to transform your property?</p>
          <a href="/contact" className="btn-primary inline-block">
            Contact Us →
          </a>
        </div>
      </div>
    </section>
  )
}
