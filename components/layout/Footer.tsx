import Link from 'next/link'
import { Phone, MapPin, Mail, Clock, ExternalLink, Leaf } from 'lucide-react'

const serviceLinks = [
  { label: 'Snow Removal', href: '/services/snow-removal' },
  { label: 'Road Paving', href: '/services/road-paving' },
  { label: 'Paver Installation', href: '/services/paver-installation' },
  { label: 'Lawn Mowing', href: '/services/lawn-mowing' },
  { label: 'Tree Services', href: '/services/tree-services' },
  { label: 'Brick Lane Construction', href: '/services/brick-lane-construction' },
  { label: 'Gutter Cleaning', href: '/services/gutter-cleaning' },
  { label: 'Seasonal Cleanup', href: '/services/seasonal-cleanup' },
]

const navLinks = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about' },
  { label: 'Gallery', href: '/gallery' },
  { label: 'Testimonials', href: '/testimonials' },
  { label: 'Blog', href: '/blog' },
  { label: 'FAQ', href: '/faq' },
  { label: 'Contact', href: '/contact' },
]

export default function Footer() {
  return (
    <footer className="bg-pk-950 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div>
            <Link href="/" className="flex items-center gap-2.5 mb-4">
              <div className="w-9 h-9 bg-pk-500 rounded-lg flex items-center justify-center">
                <Leaf size={20} className="text-white" />
              </div>
              <div>
                <div className="font-heading font-black text-white text-sm tracking-wide">PK LANDSCAPING</div>
                <div className="text-pk-500 text-xs font-semibold tracking-widest">SERVICE</div>
              </div>
            </Link>
            <p className="text-gray-400 text-sm leading-relaxed mb-5">
              Professional landscaping, snow removal, and outdoor services in Fargo, ND. Fully insured, bonded, and community-focused since 2020.
            </p>
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="PK Landscaping on Facebook"
              className="w-9 h-9 bg-pk-800 hover:bg-pk-700 rounded-lg flex items-center justify-center transition-colors inline-flex"
            >
              <ExternalLink size={16} className="text-gray-300" />
            </a>
          </div>

          {/* Services */}
          <div>
            <h3 className="font-heading font-bold text-white text-xs tracking-widest uppercase mb-4">Services</h3>
            <ul className="space-y-2">
              {serviceLinks.map((s) => (
                <li key={s.href}>
                  <Link href={s.href} className="text-gray-400 hover:text-pk-500 text-sm transition-colors">
                    {s.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="font-heading font-bold text-white text-xs tracking-widest uppercase mb-4">Navigation</h3>
            <ul className="space-y-2 mb-6">
              {navLinks.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-gray-400 hover:text-pk-500 text-sm transition-colors">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
            <h4 className="font-heading font-bold text-white text-xs tracking-widest uppercase mb-3">Payment Accepted</h4>
            <div className="flex flex-wrap gap-2">
              {['Visa', 'Mastercard', 'Amex', 'Discover', 'Cash', 'Check'].map((p) => (
                <span key={p} className="text-xs bg-pk-800 text-gray-300 px-2 py-1 rounded">{p}</span>
              ))}
            </div>
          </div>

          {/* Contact & Hours */}
          <div>
            <h3 className="font-heading font-bold text-white text-xs tracking-widest uppercase mb-4">Contact</h3>
            <ul className="space-y-3 mb-6">
              <li>
                <a href="tel:+12189791154" className="flex items-start gap-2.5 text-gray-400 hover:text-pk-500 transition-colors text-sm">
                  <Phone size={14} className="mt-0.5 shrink-0 text-pk-500" />
                  (218) 979-1154
                </a>
              </li>
              <li>
                <a href="/contact" className="flex items-start gap-2.5 text-gray-400 hover:text-pk-500 transition-colors text-sm">
                  <Mail size={14} className="mt-0.5 shrink-0 text-pk-500" />
                  Contact us
                </a>
              </li>
              <li className="flex items-start gap-2.5 text-gray-400 text-sm">
                <MapPin size={14} className="mt-0.5 shrink-0 text-pk-500" />
                Fargo, ND 58103
              </li>
            </ul>
            <h4 className="font-heading font-bold text-white text-xs tracking-widest uppercase mb-3">Hours</h4>
            <ul className="space-y-1.5">
              <li className="flex items-start gap-2 text-sm">
                <Clock size={13} className="mt-0.5 shrink-0 text-pk-500" />
                <span><span className="text-gray-300">Mon – Sat:</span> <span className="text-gray-400">7:00am – 8:00pm</span></span>
              </li>
              <li className="flex items-start gap-2 text-sm">
                <Clock size={13} className="mt-0.5 shrink-0 text-pk-500" />
                <span><span className="text-gray-300">Sunday:</span> <span className="text-red-400">Closed</span></span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="border-t border-pk-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-gray-500 text-sm">© {new Date().getFullYear()} PK Landscaping Service. All rights reserved.</p>
          <p className="text-gray-500 text-sm">Serving Fargo, ND &amp; Surrounding Areas</p>
        </div>
      </div>
    </footer>
  )
}
