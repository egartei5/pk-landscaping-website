import { Shield, Star, BadgeCheck, Phone } from 'lucide-react'
import QuoteForm from './QuoteForm'

const trustBadges = [
  { icon: Shield, text: 'Fully Insured & Bonded' },
  { icon: Star, text: 'Free Estimates' },
  { icon: BadgeCheck, text: 'Locally Owned' },
  { icon: Phone, text: 'Fast Response' },
]

interface QuoteCTASectionProps {
  heading?: string
  subtext?: string
}

export default function QuoteCTASection({
  heading = 'Get a Free Estimate',
  subtext = 'Serving Fargo, Moorhead, West Fargo, and surrounding communities. We respond within one business day.',
}: QuoteCTASectionProps) {
  return (
    <section className="bg-pk-950 py-20 px-4 sm:px-6 lg:px-8 border-t border-pk-800">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-10">
          <span className="section-label justify-center">&mdash; Request a Quote &mdash;</span>
          <h2 className="font-heading font-black text-white text-4xl sm:text-5xl mt-3 mb-3">{heading}</h2>
          <p className="text-gray-400 text-lg max-w-xl mx-auto">{subtext}</p>
        </div>

        <div className="flex flex-wrap justify-center gap-x-8 gap-y-3 mb-10">
          {trustBadges.map(({ icon: Icon, text }) => (
            <div key={text} className="flex items-center gap-2 text-gray-300 text-sm">
              <Icon size={15} className="text-pk-500 shrink-0" />
              <span className="font-medium">{text}</span>
            </div>
          ))}
        </div>

        <div className="bg-pk-900 border border-pk-700 rounded-2xl p-6 sm:p-10">
          <QuoteForm dark />
        </div>

        <p className="text-center text-gray-500 text-sm mt-6">
          Prefer to call?{' '}
          <a href="tel:+12189791154" className="text-pk-400 font-semibold hover:text-pk-300 transition-colors">
            (218) 979-1154
          </a>{' '}
          · Mon–Sat 7am–8pm
        </p>
      </div>
    </section>
  )
}
