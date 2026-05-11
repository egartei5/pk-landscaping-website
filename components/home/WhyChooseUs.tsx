import Image from 'next/image'
import { CheckCircle2 } from 'lucide-react'
import SectionLabel from '@/components/ui/SectionLabel'

const benefits = [
  'Create curb appeal effortlessly',
  'Free up your personal time',
  'Ensure safer walking paths and driveways',
  'Simplify ongoing yard maintenance',
  'Add structure and value to open spaces',
  'Support healthier, greener plant growth',
]

export default function WhyChooseUs() {
  return (
    <section className="bg-pk-off-white py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div>
            <SectionLabel>Why Choose Us</SectionLabel>
            <h2 className="font-heading font-black text-pk-900 text-4xl sm:text-5xl mb-6">
              A Team That Understands Nature — And Your Property
            </h2>
            <p className="text-gray-600 leading-relaxed mb-6">
              Working with a team that understands the rhythm of nature — and how it impacts your property — is key to maintaining peace of mind year-round. Our landscape services go beyond surface appearances by focusing on sustainable practices, community-based values, and reliable follow-through on every job we accept.
            </p>
            <p className="text-gray-600 leading-relaxed mb-8">
              For many homeowners and business managers alike, the emotional burden of neglected outdoor areas becomes overwhelming fast. We step in with responsive support built around real-life needs — from reviving frost-bitten lawns in springtime to approaching technical precision with thoughtful planning every step of the way.
            </p>
            <ul className="space-y-3">
              {benefits.map((benefit) => (
                <li key={benefit} className="flex items-center gap-3">
                  <CheckCircle2 size={18} className="text-pk-500 shrink-0" />
                  <span className="text-gray-700 font-medium">{benefit}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Image */}
          <div className="relative">
            <div className="relative h-96 lg:h-[500px] rounded-2xl overflow-hidden shadow-2xl">
              <Image
                src="https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?w=800&q=80"
                alt="PK Landscaping professional maintaining a residential property"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
            {/* Floating badge */}
            <div className="absolute -bottom-4 -left-4 bg-pk-900 text-white rounded-xl px-5 py-4 shadow-xl">
              <p className="font-heading font-black text-3xl text-pk-500">3+</p>
              <p className="text-sm text-gray-300">Years Serving Fargo</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
