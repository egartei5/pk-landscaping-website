import Image from 'next/image'
import { Phone, MapPin, Clock } from 'lucide-react'
import QuoteForm from '@/components/ui/QuoteForm'

export default function ContactCTA() {
  return (
    <section className="relative py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
      <Image
        src="https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=1920&q=80"
        alt="PK Landscaping paver project background"
        fill
        className="object-cover"
        sizes="100vw"
      />
      <div className="absolute inset-0 bg-pk-950/88" />

      <div className="relative z-10 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Business info */}
          <div>
            <p className="section-label">Get In Touch</p>
            <h2 className="font-heading font-black text-white text-4xl sm:text-5xl mb-6">
              Get a Free Estimate Today
            </h2>
            <p className="text-gray-400 text-lg leading-relaxed mb-8">
              Ready to transform your outdoor space? Fill out the form and we&apos;ll get back to you within one business day with a clear, no-obligation estimate.
            </p>
            <ul className="space-y-4">
              <li>
                <a href="tel:+12189791154" className="flex items-center gap-3 text-gray-300 hover:text-pk-500 transition-colors">
                  <div className="w-10 h-10 bg-pk-800 rounded-lg flex items-center justify-center shrink-0">
                    <Phone size={16} className="text-pk-500" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 uppercase tracking-widest">Call Us</p>
                    <p className="font-bold">(218) 979-1154</p>
                  </div>
                </a>
              </li>
              <li className="flex items-center gap-3 text-gray-300">
                <div className="w-10 h-10 bg-pk-800 rounded-lg flex items-center justify-center shrink-0">
                  <MapPin size={16} className="text-pk-500" />
                </div>
                <div>
                  <p className="text-xs text-gray-500 uppercase tracking-widest">Location</p>
                  <p className="font-bold">Fargo, ND 58103</p>
                </div>
              </li>
              <li className="flex items-center gap-3 text-gray-300">
                <div className="w-10 h-10 bg-pk-800 rounded-lg flex items-center justify-center shrink-0">
                  <Clock size={16} className="text-pk-500" />
                </div>
                <div>
                  <p className="text-xs text-gray-500 uppercase tracking-widest">Hours</p>
                  <p className="font-bold">Mon–Sat: 7am–8pm | Sun: Closed</p>
                </div>
              </li>
            </ul>
          </div>

          {/* Form */}
          <div className="bg-pk-900/80 backdrop-blur border border-pk-700 rounded-2xl p-6 sm:p-8">
            <h3 className="font-heading font-bold text-white text-xl mb-6">Request a Free Estimate</h3>
            <QuoteForm dark />
          </div>
        </div>
      </div>
    </section>
  )
}
