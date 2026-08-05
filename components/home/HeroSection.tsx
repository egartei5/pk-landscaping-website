'use client'
import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { Phone, ChevronDown, Shield, Star, Clock, BadgeCheck } from 'lucide-react'
import TextReveal from '@/components/motion/TextReveal'

const trustBadges = [
  { icon: BadgeCheck, text: 'Locally Owned' },
  { icon: Star, text: 'Free Estimates' },
  { icon: Shield, text: 'Insured & Bonded' },
  { icon: Clock, text: 'Fast Response' },
]

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden snap-start bg-pk-950">
      {/* Background image */}
      <motion.div
        className="absolute inset-0 scale-105"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2, ease: 'easeOut' }}
      >
        <Image
          src="/images/lawn-mowing-stripes-premium-fargo.jpg"
          alt="Premium lawn mowing with perfect stripes by PK Landscaping in Fargo ND"
          fill
          priority
          className="object-cover object-center"
          sizes="100vw"
        />
      </motion.div>

      {/* Dark gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-pk-950/40 via-pk-950/65 to-pk-950/95 z-[1]" />

      {/* Radial glow */}
      <div className="absolute inset-0 z-[1] bg-[radial-gradient(ellipse_60%_50%_at_50%_0%,rgba(76,175,80,0.12)_0%,transparent_70%)]" />

      {/* Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 text-center pt-20">
        {/* Google Reviews badge */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="inline-flex items-center gap-3 mb-8 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-5 py-2.5"
        >
          <svg viewBox="0 0 48 48" className="w-5 h-5 shrink-0">
            <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/>
            <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/>
            <path fill="#FBBC05" d="M10.53 28.59c-.5-1.45-.79-3-.79-4.59s.29-3.14.79-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"/>
            <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/>
          </svg>
          <div className="flex gap-0.5">
            {[...Array(5)].map((_, i) => (
              <Star key={i} size={12} className="text-yellow-400 fill-yellow-400" />
            ))}
          </div>
          <span className="text-white font-bold text-sm">5.0</span>
          <span className="text-white/60 text-sm hidden sm:inline">· Fargo-Moorhead&apos;s Top-Rated</span>
        </motion.div>

        {/* Giant cinematic headline */}
        <TextReveal
          text="Transforming Fargo Properties Into Beautiful Outdoor Spaces"
          as="h1"
          delay={0.5}
          immediate
          className="font-heading font-black text-white text-5xl sm:text-7xl lg:text-8xl leading-none tracking-tighter mb-8"
        />

        {/* Subtext */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.1, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="text-gray-300 text-lg sm:text-xl max-w-2xl mx-auto mb-10 leading-relaxed"
        >
          Lawn care, snow removal, paver installation, tree services & more — serving Fargo, Moorhead, and surrounding communities.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.4, duration: 0.6 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12"
        >
          <Link href="/contact" className="btn-primary text-base px-10 py-4 w-full sm:w-auto font-bold text-lg">
            Get a Free Estimate →
          </Link>
          <a
            href="tel:+12189791154"
            className="btn-outline text-base px-10 py-4 w-full sm:w-auto flex items-center justify-center gap-2 font-bold"
          >
            <Phone size={16} /> (218) 979-1154
          </a>
        </motion.div>

        {/* Trust badges */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.7, duration: 0.6 }}
          className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3"
        >
          {trustBadges.map(({ icon: Icon, text }) => (
            <div key={text} className="flex items-center gap-2 text-gray-400 text-sm">
              <Icon size={14} className="text-pk-400" />
              <span className="font-medium">{text}</span>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 2.5, ease: 'easeInOut' }}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 text-gray-500"
      >
        <span className="text-xs tracking-widest uppercase font-medium">Scroll</span>
        <ChevronDown size={20} />
      </motion.div>
    </section>
  )
}
