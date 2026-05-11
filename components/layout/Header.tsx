'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu, X, ChevronDown, Phone, Leaf } from 'lucide-react'

const services = [
  { label: 'Snow Removal', slug: 'snow-removal', icon: '❄️' },
  { label: 'Road Paving', slug: 'road-paving', icon: '🛣️' },
  { label: 'Paver Installation', slug: 'paver-installation', icon: '🧱' },
  { label: 'Lawn Mowing', slug: 'lawn-mowing', icon: '🌿' },
  { label: 'Tree Services', slug: 'tree-services', icon: '🌳' },
  { label: 'Brick Lane Construction', slug: 'brick-lane-construction', icon: '🏗️' },
  { label: 'Gutter Cleaning', slug: 'gutter-cleaning', icon: '🏠' },
  { label: 'Seasonal Cleanup', slug: 'seasonal-cleanup', icon: '🍂' },
]

const navLinks = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about' },
  { label: 'Services', href: '/services', hasDropdown: true },
  { label: 'Gallery', href: '/gallery' },
  { label: 'Testimonials', href: '/testimonials' },
  { label: 'Blog', href: '/blog' },
  { label: 'FAQ', href: '/faq' },
  { label: 'Contact', href: '/contact' },
]

export default function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => { setMobileOpen(false) }, [pathname])

  const isHome = pathname === '/'

  return (
    <header className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
      scrolled || !isHome ? 'bg-pk-900/97 backdrop-blur-md shadow-xl' : 'bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="w-9 h-9 bg-pk-500 rounded-lg flex items-center justify-center shadow-lg group-hover:bg-pk-400 transition-colors">
              <Leaf size={20} className="text-white" />
            </div>
            <div>
              <div className="font-heading font-black text-white text-sm leading-none tracking-wide">PK LANDSCAPING</div>
              <div className="text-pk-500 text-xs font-semibold tracking-widest">SERVICE</div>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-0.5">
            {navLinks.map((link) =>
              link.hasDropdown ? (
                <div
                  key={link.label}
                  className="relative"
                  onMouseEnter={() => setDropdownOpen(true)}
                  onMouseLeave={() => setDropdownOpen(false)}
                >
                  <button className={`flex items-center gap-1 px-3 py-2 text-sm font-medium transition-colors rounded-md ${
                    pathname.startsWith('/services') ? 'text-pk-500' : 'text-gray-300 hover:text-white'
                  }`}>
                    {link.label}
                    <ChevronDown size={14} className={`transition-transform ${dropdownOpen ? 'rotate-180' : ''}`} />
                  </button>
                  {dropdownOpen && (
                    <div className="absolute top-full left-1/2 -translate-x-1/2 pt-2 w-60">
                      <div className="bg-pk-800 border border-pk-700 rounded-xl shadow-2xl overflow-hidden">
                        {services.map((s) => (
                          <Link key={s.slug} href={`/services/${s.slug}`} className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-300 hover:bg-pk-700 hover:text-white transition-colors">
                            <span>{s.icon}</span>
                            {s.label}
                          </Link>
                        ))}
                        <div className="border-t border-pk-700">
                          <Link href="/services" className="flex items-center gap-2 px-4 py-2.5 text-sm font-bold text-pk-500 hover:bg-pk-700 transition-colors">
                            View All Services →
                          </Link>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <Link key={link.label} href={link.href} className={`px-3 py-2 text-sm font-medium transition-colors rounded-md ${
                  pathname === link.href ? 'text-pk-500' : 'text-gray-300 hover:text-white'
                }`}>
                  {link.label}
                </Link>
              )
            )}
          </nav>

          {/* Desktop CTA */}
          <div className="hidden lg:flex items-center gap-3">
            <a href="tel:+12189791154" className="flex items-center gap-1.5 text-sm text-gray-300 hover:text-white transition-colors">
              <Phone size={14} className="text-pk-500" />
              (218) 979-1154
            </a>
            <Link href="/book" className="text-sm px-4 py-2.5 border border-pk-500 text-pk-400 hover:bg-pk-500 hover:text-white rounded-lg font-semibold transition-colors">
              Book Now
            </Link>
            <Link href="/contact" className="btn-primary text-sm px-5 py-2.5">
              Free Estimate
            </Link>
          </div>

          {/* Mobile toggle */}
          <button onClick={() => setMobileOpen(!mobileOpen)} className="lg:hidden text-white p-2" aria-label="Toggle menu">
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="lg:hidden bg-pk-900/98 backdrop-blur-md border-t border-pk-800 px-4 pb-6 pt-3">
          <nav className="flex flex-col gap-0.5 mb-4">
            {navLinks.map((link) => (
              <Link key={link.label} href={link.href} className={`px-4 py-3 text-base font-medium rounded-lg transition-colors ${
                pathname === link.href || (link.hasDropdown && pathname.startsWith('/services'))
                  ? 'text-pk-500 bg-pk-800' : 'text-gray-300 hover:text-white hover:bg-pk-800'
              }`}>
                {link.label}
              </Link>
            ))}
          </nav>
          <div className="border-t border-pk-800 pt-3 mb-3">
            <p className="text-xs text-gray-500 uppercase tracking-widest px-2 mb-2">Services</p>
            <div className="grid grid-cols-2 gap-1">
              {services.map((s) => (
                <Link key={s.slug} href={`/services/${s.slug}`} className="flex items-center gap-2 px-3 py-2 text-sm text-gray-400 hover:text-white hover:bg-pk-800 rounded-lg transition-colors">
                  <span>{s.icon}</span> {s.label}
                </Link>
              ))}
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <a href="tel:+12189791154" className="flex items-center justify-center gap-2 text-white border border-pk-700 rounded-lg py-3 font-medium hover:bg-pk-800 transition-colors">
              <Phone size={16} className="text-pk-500" /> (218) 979-1154
            </a>
            <Link href="/book" className="text-center py-3 border border-pk-500 text-pk-400 rounded-lg font-semibold hover:bg-pk-500 hover:text-white transition-colors">
              Book a Service
            </Link>
            <Link href="/contact" className="btn-primary text-center py-3">
              Get Free Estimate
            </Link>
          </div>
        </div>
      )}
    </header>
  )
}
