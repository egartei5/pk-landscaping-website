import Link from 'next/link'
import ServiceCard from '@/components/ui/ServiceCard'
import TextReveal from '@/components/motion/TextReveal'
import FadeUpStagger, { FadeUpItem } from '@/components/motion/FadeUpStagger'
import LineDrawIn from '@/components/motion/LineDrawIn'
import { servicesData } from '@/lib/services-data'

const otherServices = [
  'Tree Planting', 'Grass Planting', 'Tree Pruning', 'Tree Trimming',
  'Tree Removal', 'Residential Brick Lane', 'Commercial Brick Lane',
  'Tree Care', 'Spring Cleanup', 'Fall Cleanup',
]

export default function ServicesSection() {
  const featured = servicesData.slice(0, 6)

  return (
    <div className="relative flex flex-col justify-center min-h-screen px-4 sm:px-6 lg:px-8 py-24">
      {/* Radial glow — bottom left */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_50%_60%_at_0%_100%,rgba(76,175,80,0.09)_0%,transparent_70%)]" />

      {/* Ghost section number */}
      <div className="absolute top-8 right-6 font-heading font-black text-[140px] leading-none text-pk-900 select-none pointer-events-none hidden lg:block">
        02
      </div>

      <div className="relative z-10 max-w-7xl mx-auto w-full">
        <div className="mb-12">
          <p className="section-label">What We Do</p>
          <LineDrawIn className="max-w-16 mt-2 mb-6" delay={0.1} />
          <TextReveal
            text="We Specialize In These Services"
            as="h2"
            className="font-heading font-black text-white text-4xl sm:text-6xl lg:text-7xl tracking-tight"
          />
        </div>

        <FadeUpStagger className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-8" stagger={0.07}>
          {featured.map((service) => (
            <FadeUpItem key={service.slug}>
              <ServiceCard
                slug={service.slug}
                title={service.title}
                shortDescription={service.shortDescription}
                icon={service.icon}
                image={service.cardImage}
                imageAlt={service.cardImageAlt}
              />
            </FadeUpItem>
          ))}
        </FadeUpStagger>

        <FadeUpStagger className="bg-pk-800/40 border border-pk-700 rounded-2xl p-6 mb-8" delay={0.4}>
          <FadeUpItem>
            <p className="font-heading font-bold text-pk-400 text-xs uppercase tracking-widest mb-4">Also Offering</p>
          </FadeUpItem>
          <FadeUpItem>
            <div className="flex flex-wrap gap-2">
              {otherServices.map((s) => (
                <span key={s} className="text-sm bg-pk-800 border border-pk-700 text-gray-400 px-3 py-1.5 rounded-full hover:border-pk-500 hover:text-pk-400 transition-colors cursor-default">
                  {s}
                </span>
              ))}
            </div>
          </FadeUpItem>
        </FadeUpStagger>

        <FadeUpStagger delay={0.5}>
          <FadeUpItem className="text-center">
            <Link href="/services" className="btn-primary inline-block text-base px-8 py-3">
              View All Services →
            </Link>
          </FadeUpItem>
        </FadeUpStagger>
      </div>
    </div>
  )
}
