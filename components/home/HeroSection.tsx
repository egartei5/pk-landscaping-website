'use client'
import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { Phone, ChevronDown, Shield, Star, Clock, BadgeCheck } from 'lucide-react'
import TextReveal from '@/components/motion/TextReveal'
import ImageReveal from '@/components/motion/ImageReveal'
import FadeUpStagger, { FadeUpItem } from '@/components/motion/FadeUpStagger'

const trustBadges = [
  { icon: BadgeCheck, text: 'Locally Owned' },
  { icon: Star, text: 'Free Estimates' },
  { icon: Shield, text: 'Insured & Bonded' },
  { icon: Clock, text: 'Fast Response' },
]

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden snap-start bg-pk-950">
      {/* Background image with curtain reveal */}
      <ImageReveal className="absolute inset-0 scale-105">
        <Image
          src="/images/lawn-mowing-stripes-premium-fargo.jpg"
          alt="Premium lawn mowing with perfect stripes by PK Landscaping in Fargo ND"
          fill
          priority
          className="object-cover object-center"
          sizes="100vw"
        />
      </ImageReveal>

      {/* Dark gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-pk-950/40 via-pk-950/65 to-pk-950/95 z-[1]" />

      {/* Radial glow */}
      <div className="absolute inset-0 z-[1] bg-[radial-gradient(ellipse_60%_50%_at_50%_0%,rgba(76,175,80,0.12)_0%,transparent_70%)]" />

      {/* Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 text-center pt-20">
        {/* Rating label */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.1, duration: 0.6 }}
          className="inline-flex items-center gap-2 mb-8"
        >
          <div className="flex gap-0.5">
            {[...Array(5)].map((_, i) => (
              <Star key={i} size={11} className="text-yellow-400 fill-yellow-400" />
            ))}
          </div>
          <span className="text-pk-400 font-heading font-bold text-xs tracking-widest uppercase">
            Fargo-Moorhead&apos;s Top-Rated Landscaping Company
          </span>
        </motion.div>

        {/* Giant cinematic headline */}
        <TextReveal
          text="Transforming Fargo Properties Into Beautiful Outdoor Spaces"
          as="h1"
          delay={1.2}
          className="font-heading font-black text-white text-5xl sm:text-7xl lg:text-8xl leading-none tracking-tighter mb-8"
        />

        {/* Subtext */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2.2, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="text-gray-300 text-lg sm:text-xl max-w-2xl mx-auto mb-10 leading-relaxed"
        >
          Lawn care, snow removal, paver installation, tree services & more — serving Fargo, Moorhead, and surrounding communities.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2.5, duration: 0.6 }}
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
          transition={{ delay: 2.8, duration: 0.6 }}
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
