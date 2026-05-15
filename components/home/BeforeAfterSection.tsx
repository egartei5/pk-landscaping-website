'use client'
import Image from 'next/image'
import TextReveal from '@/components/motion/TextReveal'
import ImageReveal from '@/components/motion/ImageReveal'
import FadeUpStagger, { FadeUpItem } from '@/components/motion/FadeUpStagger'
import LineDrawIn from '@/components/motion/LineDrawIn'

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
  return (
    <div className="relative flex flex-col justify-center min-h-screen px-4 sm:px-6 lg:px-8 py-24">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_50%,rgba(76,175,80,0.08)_0%,transparent_70%)]" />

      <div className="absolute top-8 left-6 font-heading font-black text-[140px] leading-none text-pk-900 select-none pointer-events-none hidden lg:block">
        06
      </div>

      <div className="relative z-10 max-w-7xl mx-auto w-full">
        <div className="mb-14">
          <p className="section-label">Real Results</p>
          <LineDrawIn className="max-w-16 mt-2 mb-6" delay={0.1} />
          <TextReveal
            text="Before & After"
            as="h2"
            className="font-heading font-black text-white text-4xl sm:text-6xl lg:text-7xl tracking-tight"
          />
        </div>

        <FadeUpStagger className="grid grid-cols-1 md:grid-cols-3 gap-6" stagger={0.12} delay={0.3}>
          {transformations.map((t, cardIdx) => (
            <FadeUpItem key={t.label}>
              <div className="rounded-2xl overflow-hidden border border-pk-800 hover:border-pk-500/50 transition-colors duration-300 group">
                <div className="grid grid-cols-2 relative">
                  {/* Before */}
                  <div className="relative">
                    <div className="absolute top-2 left-2 z-20 bg-black/80 text-white text-xs font-bold px-2.5 py-1 rounded-full tracking-wide">
                      Before
                    </div>
                    <ImageReveal className="aspect-[3/4]" delay={0.1 + cardIdx * 0.15}>
                      <Image
                        src={t.before}
                        alt={t.beforeAlt}
                        fill
                        loading="lazy"
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                        sizes="16vw"
                      />
                      <div className="absolute inset-0 bg-pk-900/20" />
                    </ImageReveal>
                  </div>

                  {/* Arrow */}
                  <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20 w-8 h-8 bg-pk-500 rounded-full flex items-center justify-center shadow-lg shadow-pk-500/50 group-hover:scale-110 transition-transform duration-300">
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                      <path d="M5 2L9 7L5 12" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>

                  {/* After */}
                  <div className="relative">
                    <div className="absolute top-2 right-2 z-20 bg-pk-500 text-white text-xs font-bold px-2.5 py-1 rounded-full tracking-wide">
                      After
                    </div>
                    <ImageReveal className="aspect-[3/4]" delay={0.35 + cardIdx * 0.15}>
                      <Image
                        src={t.after}
                        alt={t.afterAlt}
                        fill
                        loading="lazy"
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                        sizes="16vw"
                      />
                    </ImageReveal>
                  </div>
                </div>

                <div className="bg-pk-900/80 px-4 py-3 flex items-center justify-between">
                  <div>
                    <p className="text-white font-heading font-bold text-sm">{t.label}</p>
                    <p className="text-pk-400 text-xs mt-0.5">{t.location}</p>
                  </div>
                </div>
              </div>
            </FadeUpItem>
          ))}
        </FadeUpStagger>

        <FadeUpStagger className="text-center mt-12" delay={0.6}>
          <FadeUpItem>
            <a href="/contact" className="btn-primary inline-block px-8 py-3">
              Transform Your Property →
            </a>
          </FadeUpItem>
        </FadeUpStagger>
      </div>
    </div>
  )
}
