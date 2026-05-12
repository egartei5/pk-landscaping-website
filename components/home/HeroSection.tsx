'use client'
import { useRef } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion, useScroll, useTransform } from 'framer-motion'
import { Phone, ChevronDown, Shield, Star, Clock, BadgeCheck } from 'lucide-react'

const words = ['Transforming', 'Fargo', 'Properties', 'Into', 'Beautiful', 'Outdoor', 'Spaces']

const trustBadges = [
  { icon: BadgeCheck, text: 'Locally Owned' },
  { icon: Star, text: 'Free Estimates' },
  { icon: Shield, text: 'Insured & Bonded' },
  { icon: Clock, text: 'Fast Response' },
]

export default function HeroSection() {
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const bgY = useTransform(scrollYProgress, [0, 1], ['0%', '40%'])

  return (
    <section ref={ref} className="relative h-screen min-h-[600px] flex items-center justify-center overflow-hidden">
      {/* Parallax background */}
      <motion.div style={{ y: bgY }} className="absolute inset-0 scale-110">
        <Image
          src="/images/lawn-mowing-stripes-premium-fargo.jpg"
          alt="Premium lawn mowing with perfect stripes by PK Landscaping in Fargo ND"
          fill
          priority
          className="object-cover object-center"
          sizes="100vw"
        />
      </motion.div>

      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-pk-900/60 via-pk-900/72 to-pk-950/97" />

      {/* Content */}
      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 text-center">
        {/* Rating label */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="inline-flex items-center gap-2 mb-6"
        >
          <div className="flex gap-0.5">
            {[...Array(5)].map((_, i) => <Star key={i} size={12} className="text-yellow-400 fill-yellow-400" />)}
          </div>
          <span className="text-pk-400 font-heading font-bold text-xs tracking-widest uppercase">
            Fargo-Moorhead&apos;s Top-Rated Landscaping Company
          </span>
        </motion.div>

        {/* Staggered headline */}
        <h1 className="font-heading font-black text-white text-5xl sm:text-6xl lg:text-7xl leading-tight tracking-tight mb-6">
          {words.map((word, i) => (
            <motion.span
              key={i}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + i * 0.08, ease: 'easeOut' }}
              className="inline-block mr-[0.25em]"
            >
              {i >= 5 ? <span className="text-pk-400">{word}</span> : word}
            </motion.span>
          ))}
        </h1>

        {/* Sub-headline */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.0 }}
          className="text-gray-300 text-lg sm:text-xl max-w-2xl mx-auto mb-8 leading-relaxed"
        >
          Lawn care, snow removal, paver installation, tree services & more — serving Fargo, Moorhead, and surrounding communities.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.1 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-10"
        >
          <Link href="/contact" className="btn-primary text-base px-8 py-4 w-full sm:w-auto font-bold">
            Contact Us →
          </Link>
          <a href="tel:+12189791154" className="btn-outline text-base px-8 py-4 w-full sm:w-auto flex items-center justify-center gap-2 font-bold">
            <Phone size={16} /> Call Now: (218) 979-1154
          </a>
        </motion.div>

        {/* Trust badges */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="flex flex-wrap items-center justify-center gap-x-6 gap-y-3"
        >
          {trustBadges.map(({ icon: Icon, text }) => (
            <div key={text} className="flex items-center gap-1.5 text-gray-300 text-sm">
              <Icon size={14} className="text-pk-400" />
              <span className="font-medium">{text}</span>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        animate={{ y: [0, 8, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-gray-400"
      >
        <ChevronDown size={24} />
      </motion.div>
    </section>
  )
}
