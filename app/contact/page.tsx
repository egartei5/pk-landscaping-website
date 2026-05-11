import type { Metadata } from 'next'
import { Phone, MapPin, Clock, Mail } from 'lucide-react'
import QuoteForm from '@/components/ui/QuoteForm'
import SectionLabel from '@/components/ui/SectionLabel'
import { buildMetadata } from '@/lib/seo'

export const metadata: Metadata = buildMetadata({
  title: 'Contact Us',
  description: 'Contact PK Landscaping Service in Fargo, ND. Get a free estimate for lawn care, snow removal, paving, and more. Call (218) 979-1154.',
  path: '/contact',
})

const hours = [
  { day: 'Monday', time: '7:00am – 8:00pm' },
  { day: 'Tuesday', time: '7:00am – 8:00pm' },
  { day: 'Wednesday', time: '7:00am – 8:00pm' },
  { day: 'Thursday', time: '7:00am – 8:00pm' },
  { day: 'Friday', time: '7:00am – 8:00pm' },
  { day: 'Saturday', time: '7:00am – 8:00pm' },
  { day: 'Sunday', time: 'Closed' },
]

const payments = ['Visa', 'Mastercard', 'American Express', 'Discover', 'Cash', 'Check']

export default function ContactPage() {
  return (
    <>
      <div className="bg-pk-900 pt-32 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <SectionLabel>Get In Touch</SectionLabel>
          <h1 className="font-heading font-black text-white text-5xl sm:text-6xl mb-4">
            Connect With Our Landscape Experts
          </h1>
          <p className="text-gray-400 text-lg">
            For expert landscape support, we proudly serve clients throughout Fargo, ND and respond promptly to all inquiries.
          </p>
        </div>
      </div>

      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Info column */}
            <div className="space-y-8">
              <div>
                <h2 className="font-heading font-bold text-pk-900 text-2xl mb-4">PK Landscaping Service</h2>
                <ul className="space-y-4">
                  <li>
                    <a href="tel:+12189791154" className="flex items-start gap-3 group">
                      <div className="w-10 h-10 bg-pk-500/10 rounded-lg flex items-center justify-center shrink-0 group-hover:bg-pk-500/20 transition-colors">
                        <Phone size={16} className="text-pk-500" />
                      </div>
                      <div>
                        <p className="text-xs text-gray-500 uppercase tracking-widest mb-0.5">Phone</p>
                        <p className="font-bold text-pk-900 group-hover:text-pk-500 transition-colors">(218) 979-1154</p>
                      </div>
                    </a>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-10 h-10 bg-pk-500/10 rounded-lg flex items-center justify-center shrink-0">
                      <MapPin size={16} className="text-pk-500" />
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 uppercase tracking-widest mb-0.5">Location</p>
                      <p className="font-bold text-pk-900">Fargo, ND 58103</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-10 h-10 bg-pk-500/10 rounded-lg flex items-center justify-center shrink-0">
                      <Mail size={16} className="text-pk-500" />
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 uppercase tracking-widest mb-0.5">Email</p>
                      <p className="text-gray-600 text-sm">Fill out the form — we respond within one business day</p>
                    </div>
                  </li>
                </ul>
              </div>

              {/* Hours */}
              <div>
                <h3 className="font-heading font-bold text-pk-900 text-lg mb-3 flex items-center gap-2">
                  <Clock size={18} className="text-pk-500" /> Working Hours
                </h3>
                <div className="border border-gray-100 rounded-xl overflow-hidden">
                  {hours.map((h, i) => (
                    <div key={h.day} className={`flex justify-between px-4 py-2.5 text-sm ${i % 2 === 0 ? 'bg-gray-50' : 'bg-white'}`}>
                      <span className="font-medium text-gray-700">{h.day}</span>
                      <span className={h.time === 'Closed' ? 'text-red-500 font-bold' : 'text-gray-600'}>{h.time}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Payment */}
              <div>
                <h3 className="font-heading font-bold text-pk-900 text-lg mb-3">Payment Accepted</h3>
                <div className="flex flex-wrap gap-2">
                  {payments.map((p) => (
                    <span key={p} className="text-sm bg-gray-100 text-gray-600 px-3 py-1.5 rounded-lg">{p}</span>
                  ))}
                </div>
              </div>

              {/* Map */}
              <div className="rounded-xl overflow-hidden border border-gray-100 h-48">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d86540.85!2d-96.789!3d46.877!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x52cf53b4ee08aab5%3A0x9f2d2ff1a87f024!2sFargo%2C%20ND!5e0!3m2!1sen!2sus"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="PK Landscaping Service location map"
                />
              </div>
            </div>

            {/* Form column */}
            <div className="bg-pk-off-white rounded-2xl p-6 sm:p-8 border border-gray-100">
              <h2 className="font-heading font-bold text-pk-900 text-2xl mb-2">Get a Free Estimate</h2>
              <p className="text-gray-500 text-sm mb-6">Fill out the form below and we&apos;ll get back to you promptly.</p>
              <QuoteForm />
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
