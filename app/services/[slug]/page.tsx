import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import Script from 'next/script'
import { CheckCircle2 } from 'lucide-react'
import { servicesData, getServiceBySlug } from '@/lib/services-data'
import { buildMetadata, serviceSchema } from '@/lib/seo'
import SectionLabel from '@/components/ui/SectionLabel'
import QuoteForm from '@/components/ui/QuoteForm'

interface Props { params: { slug: string } }

export async function generateStaticParams() {
  return servicesData.map((s) => ({ slug: s.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const service = getServiceBySlug(params.slug)
  if (!service) return {}
  return buildMetadata({
    title: `${service.title} in Fargo, ND`,
    description: service.shortDescription,
    path: `/services/${service.slug}`,
  })
}

export default function ServicePage({ params }: Props) {
  const service = getServiceBySlug(params.slug)
  if (!service) notFound()

  const related = servicesData.filter((s) => s.slug !== service.slug).slice(0, 4)

  return (
    <>
      <Script id={`service-schema-${service.slug}`} type="application/ld+json" strategy="beforeInteractive">
        {JSON.stringify(serviceSchema(service.title, service.shortDescription, service.slug))}
      </Script>

      {/* Hero */}
      <div className="relative pt-20 h-80 sm:h-96 overflow-hidden">
        <Image
          src={service.heroImage}
          alt={`PK Landscaping ${service.title} in Fargo ND`}
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-pk-900/60 to-pk-950/95" />
        <div className="relative z-10 h-full flex flex-col justify-end pb-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <span className="text-3xl mb-3">{service.icon}</span>
          <h1 className="font-heading font-black text-white text-4xl sm:text-5xl mb-2">{service.title}</h1>
          <p className="text-gray-300 max-w-2xl">{service.shortDescription}</p>
        </div>
      </div>

      <div className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Main */}
            <div className="lg:col-span-2 space-y-10">
              <div>
                <SectionLabel>The Problem</SectionLabel>
                <p className="text-gray-600 leading-relaxed text-lg">{service.problem}</p>
              </div>
              <div>
                <SectionLabel>Our Solution</SectionLabel>
                <p className="text-gray-600 leading-relaxed text-lg">{service.solution}</p>
              </div>
              <div>
                <h2 className="font-heading font-bold text-pk-900 text-2xl mb-4">What&apos;s Included</h2>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {service.bullets.map((b) => (
                    <li key={b} className="flex items-start gap-2 text-gray-700">
                      <CheckCircle2 size={18} className="text-pk-500 mt-0.5 shrink-0" />
                      {b}
                    </li>
                  ))}
                </ul>
              </div>

              {/* CTA */}
              <div className="bg-pk-900 rounded-2xl p-8">
                <h3 className="font-heading font-bold text-white text-2xl mb-2">
                  Ready to Get Started with {service.title}?
                </h3>
                <p className="text-gray-400 mb-6">Fill out this quick form and we&apos;ll get back to you within one business day.</p>
                <QuoteForm dark />
              </div>
            </div>

            {/* Sidebar */}
            <aside className="space-y-6">
              <div className="bg-pk-900 rounded-2xl p-6">
                <h3 className="font-heading font-bold text-white mb-4">Other Services</h3>
                <ul className="space-y-2">
                  {related.map((s) => (
                    <li key={s.slug}>
                      <Link href={`/services/${s.slug}`} className="flex items-center gap-2 text-gray-400 hover:text-pk-500 text-sm transition-colors py-1">
                        <span>{s.icon}</span> {s.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="bg-pk-500 rounded-2xl p-6">
                <p className="font-heading font-black text-white text-3xl mb-1">10% OFF</p>
                <p className="text-white/90 text-sm mb-4">Your first service with PK Landscaping</p>
                <a href="tel:+12189791154" className="block w-full bg-white text-pk-900 font-bold text-center py-3 rounded-lg hover:bg-gray-100 transition-colors">
                  Call (218) 979-1154
                </a>
              </div>
            </aside>
          </div>
        </div>
      </div>
    </>
  )
}
