import Image from 'next/image'
import { Phone, MapPin, Clock } from 'lucide-react'

export default function ContactCTA() {
  return (
    <section className="relative py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
      <Image
        src="/images/paver-patio-installation-fargo.jpg"
        alt="Paver patio installation project by PK Landscaping in Fargo ND"
        fill
        className="object-cover object-center"
        sizes="100vw"
      />
      <div className="absolute inset-0 bg-pk-950/88" />

      <div className="relative z-10 max-w-3xl mx-auto text-center">
        <p className="section-label">Get In Touch</p>
        <h2 className="font-heading font-black text-white text-4xl sm:text-5xl mb-6">
          Ready to Get Started?
        </h2>
        <p className="text-gray-400 text-lg leading-relaxed mb-10">
          Call us today and we&apos;ll get you taken care of. Serving Fargo, Moorhead, and surrounding areas.
        </p>
        <ul className="flex flex-col sm:flex-row items-center justify-center gap-6">
          <li>
            <a href="tel:+12189791154" className="flex items-center gap-3 text-gray-300 hover:text-pk-500 transition-colors">
              <div className="w-10 h-10 bg-pk-800 rounded-lg flex items-center justify-center shrink-0">
                <Phone size={16} className="text-pk-500" />
              </div>
              <div className="text-left">
                <p className="text-xs text-gray-500 uppercase tracking-widest">Call Us</p>
                <p className="font-bold">(218) 979-1154</p>
              </div>
            </a>
          </li>
          <li className="flex items-center gap-3 text-gray-300">
            <div className="w-10 h-10 bg-pk-800 rounded-lg flex items-center justify-center shrink-0">
              <MapPin size={16} className="text-pk-500" />
            </div>
            <div className="text-left">
              <p className="text-xs text-gray-500 uppercase tracking-widest">Location</p>
              <p className="font-bold">Fargo, ND 58103</p>
            </div>
          </li>
          <li className="flex items-center gap-3 text-gray-300">
            <div className="w-10 h-10 bg-pk-800 rounded-lg flex items-center justify-center shrink-0">
              <Clock size={16} className="text-pk-500" />
            </div>
            <div className="text-left">
              <p className="text-xs text-gray-500 uppercase tracking-widest">Hours</p>
              <p className="font-bold">Mon–Sat: 7am–8pm | Sun: Closed</p>
            </div>
          </li>
        </ul>
        <a href="tel:+12189791154" className="inline-block mt-10 btn-primary text-lg px-10 py-4">
          Call (218) 979-1154
        </a>
      </div>
    </section>
  )
}
