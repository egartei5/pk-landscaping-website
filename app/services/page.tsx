import type { Metadata } from 'next'
import ServiceCard from '@/components/ui/ServiceCard'
import SectionLabel from '@/components/ui/SectionLabel'
import QuoteCTASection from '@/components/ui/QuoteCTASection'
import { servicesData } from '@/lib/services-data'
import { buildMetadata } from '@/lib/seo'
import Link from 'next/link'

export const metadata: Metadata = buildMetadata({
  title: 'Our Services',
  description: 'Professional landscaping services in Fargo, ND: Snow removal, road paving, paver installation, lawn mowing, tree services, and more.',
  path: '/services',
})

export default function ServicesPage() {
  return (
    <>
      <div className="bg-pk-900 pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <SectionLabel>What We Offer</SectionLabel>
          <h1 className="font-heading font-black text-white text-5xl sm:text-6xl mb-6">
            Professional Landscape Services
          </h1>
          <p className="text-gray-400 text-lg">
            Serving Fargo, ND and surrounding areas with expert, insured, and warranty-backed outdoor services year-round.
          </p>
        </div>
      </div>

      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-pk-950">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {servicesData.map((service) => (
              <ServiceCard
                key={service.slug}
                slug={service.slug}
                title={service.title}
                shortDescription={service.shortDescription}
                icon={service.icon}
              />
            ))}
          </div>
        </div>
      </section>

      <QuoteCTASection />
    </>
  )
}
