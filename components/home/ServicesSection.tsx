import Link from 'next/link'
import ServiceCard from '@/components/ui/ServiceCard'
import SectionLabel from '@/components/ui/SectionLabel'
import { servicesData } from '@/lib/services-data'

const otherServices = ['Tree Planting', 'Grass Planting', 'Tree Pruning', 'Tree Trimming', 'Tree Removal', 'Residential Brick Lane', 'Commercial Brick Lane', 'Tree Care', 'Spring Cleanup', 'Fall Cleanup']

export default function ServicesSection() {
  const featured = servicesData.slice(0, 6)

  return (
    <section className="bg-white py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <SectionLabel>What We Do</SectionLabel>
          <h2 className="font-heading font-black text-pk-900 text-4xl sm:text-5xl mb-4">
            We Specialize In These Services
          </h2>
          <p className="text-gray-600 max-w-xl mx-auto">
            Expert & professional approach to every project — from the first call to the final walkthrough.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
          {featured.map((service) => (
            <ServiceCard
              key={service.slug}
              slug={service.slug}
              title={service.title}
              shortDescription={service.shortDescription}
              icon={service.icon}
            />
          ))}
        </div>

        {/* Other services tag cloud */}
        <div className="bg-pk-off-white rounded-2xl p-6 mb-8">
          <p className="font-heading font-bold text-pk-900 text-sm uppercase tracking-widest mb-4">Also Offering</p>
          <div className="flex flex-wrap gap-2">
            {otherServices.map((s) => (
              <span key={s} className="text-sm bg-white border border-gray-200 text-gray-600 px-3 py-1.5 rounded-full hover:border-pk-500 hover:text-pk-700 transition-colors cursor-default">
                {s}
              </span>
            ))}
          </div>
        </div>

        <div className="text-center">
          <Link href="/services" className="btn-outline-green inline-block">
            View All Services
          </Link>
        </div>
      </div>
    </section>
  )
}
