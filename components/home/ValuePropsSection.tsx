import { Shield, Percent, Users, Award } from 'lucide-react'
import SectionLabel from '@/components/ui/SectionLabel'

const props = [
  { icon: Shield, title: 'Insured & Bonded', desc: 'Full liability coverage on every job, so you can hire with complete confidence.' },
  { icon: Percent, title: '10% New Client Discount', desc: 'First-time customers receive 10% off any service — our way of welcoming you.' },
  { icon: Users, title: '5% Senior & Veteran Discount', desc: 'We honor our seniors, veterans, and loyal repeat clients with an ongoing 5% discount.' },
  { icon: Award, title: 'Warranties Provided', desc: 'Select projects come with written warranties, because we stand behind every job we do.' },
]

export default function ValuePropsSection() {
  return (
    <section className="bg-pk-off-white py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <SectionLabel>Why PK Landscaping</SectionLabel>
          <h2 className="font-heading font-black text-pk-900 text-4xl sm:text-5xl mb-4">
            Unleash the Full Potential<br />of Your Outdoor Space
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg leading-relaxed">
            At PK Landscaping Service, we go beyond surface appearances — focusing on sustainable practices, community-based values, and reliable follow-through on every job we accept.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {props.map(({ icon: Icon, title, desc }) => (
            <div key={title} className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md hover:-translate-y-0.5 transition-all duration-300">
              <div className="w-12 h-12 bg-pk-500/10 rounded-xl flex items-center justify-center mb-4">
                <Icon size={22} className="text-pk-500" />
              </div>
              <h3 className="font-heading font-bold text-pk-900 text-base mb-2">{title}</h3>
              <p className="text-gray-500 text-sm leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>

        <div className="text-center">
          <p className="text-gray-600 max-w-3xl mx-auto">
            We serve both residential and commercial properties across Fargo, ND with a mobile crew that uses specialized equipment — from lawn mowers to snow plows — delivering prompt, professional service year-round.
          </p>
        </div>
      </div>
    </section>
  )
}
