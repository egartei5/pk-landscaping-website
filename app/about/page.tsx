import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { Shield, CheckCircle2 } from 'lucide-react'
import SectionLabel from '@/components/ui/SectionLabel'
import { servicesData } from '@/lib/services-data'
import { ServiceIcon } from '@/lib/service-icons'
import { buildMetadata } from '@/lib/seo'

export const metadata: Metadata = buildMetadata({
  title: 'About Us',
  description: 'PK Landscaping Service has served Fargo, ND since 2019. Fully insured, bonded, and committed to the community. Learn our story.',
  path: '/about',
})

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <div className="bg-pk-900 pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <SectionLabel>Our Story</SectionLabel>
          <h1 className="font-heading font-black text-white text-5xl sm:text-6xl mb-6">
            Experienced Landscaping Company Committed to Excellence
          </h1>
          <p className="text-gray-400 text-lg leading-relaxed">
            Looking for a professional landscaping company in Fargo, ND? Since 2019, our team at PK Landscaping Service has provided dependable service to both residential and commercial clients.
          </p>
        </div>
      </div>

      {/* Main content */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Main column */}
            <div className="lg:col-span-2 space-y-12">
              <div>
                <h2 className="font-heading font-black text-pk-900 text-3xl sm:text-4xl mb-4">
                  The Importance of Professional Landscaping Services
                </h2>
                <div className="space-y-4 text-gray-600 leading-relaxed">
                  <p>A well-maintained outdoor space enhances property value, curb appeal, and functionality. Whether it&apos;s routine lawn mowing or seasonal cleanups, our team ensures your landscape thrives year-round while ensuring your satisfaction.</p>
                  <p>Our team combines expertise with specialized equipment to meet the unique needs of every client. From precise land mowing to custom paver installations, our services are crafted to elevate both aesthetics and usability.</p>
                </div>
              </div>

              <div className="relative h-72 rounded-2xl overflow-hidden shadow-2xl">
                <Image
                  src="https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=1000&q=80"
                  alt="PK Landscaping Service professional crew at work"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 66vw"
                />
              </div>

              <div>
                <h2 className="font-heading font-black text-pk-900 text-3xl mb-4">Why Turn to Us?</h2>
                <p className="text-gray-600 leading-relaxed mb-6">
                  We pride ourselves on offering comprehensive services designed to meet diverse client needs. Our mobile team is fully bonded and insured, bringing expertise directly to your location. With advanced tools like snowplows and mowing machines, we handle projects efficiently and safely. We cater to both small residential yards and expansive commercial properties, delivering consistent results you can trust.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {[
                    'Fully insured & bonded',
                    'Mobile crew — we come to you',
                    'Residential & commercial',
                    'Transparent pricing',
                    'Warranty-backed work',
                    'Community-focused values',
                  ].map((item) => (
                    <div key={item} className="flex items-center gap-2 text-gray-700">
                      <CheckCircle2 size={16} className="text-pk-500 shrink-0" />
                      {item}
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h2 className="font-heading font-black text-pk-900 text-3xl mb-4">Your Partner for Exceptional Outdoor Solutions</h2>
                <p className="text-gray-600 leading-relaxed mb-4">
                  As a dedicated landscaping company, we focus on creating outdoor spaces that reflect our clients&apos; goals. From precise lawn mowing to custom paver installations, our services are crafted to elevate both aesthetics and usability.
                </p>
                <p className="text-gray-600 leading-relaxed">
                  Experience the peace of mind that comes from working with an experienced team committed to customer satisfaction. In Fargo, ND, our company offers reliable expertise tailored to your needs. Contact us today at (218) 979-1154 — our team is ready to bring your project to life.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/contact" className="btn-primary text-center">Contact Us</Link>
                <a href="tel:+12189791154" className="btn-outline-green text-center">Call (218) 979-1154</a>
              </div>
            </div>

            {/* Services sidebar */}
            <aside>
              <div className="bg-pk-900 rounded-2xl p-6 sticky top-24">
                <div className="flex items-center gap-2 mb-4">
                  <Shield size={18} className="text-pk-500" />
                  <h3 className="font-heading font-bold text-white">Our Services</h3>
                </div>
                <ul className="space-y-2">
                  {servicesData.map((s) => (
                    <li key={s.slug}>
                      <Link href={`/services/${s.slug}`} className="flex items-center gap-2 text-gray-400 hover:text-pk-500 text-sm transition-colors py-1">
                        <ServiceIcon slug={s.slug} size={13} className="text-pk-400 shrink-0" /> {s.title}
                      </Link>
                    </li>
                  ))}
                </ul>
                <div className="mt-6 pt-6 border-t border-pk-700">
                  <Link href="/contact" className="btn-primary w-full text-center block text-sm">Contact Us</Link>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </>
  )
}
