'use client'
import Link from 'next/link'
import { Tag, Users, ArrowRight } from 'lucide-react'
import { motion } from 'framer-motion'
import FadeUpStagger, { FadeUpItem } from '@/components/motion/FadeUpStagger'
import LineDrawIn from '@/components/motion/LineDrawIn'

export default function DiscountBanner() {
  return (
    <div className="relative flex flex-col justify-center min-h-screen px-4 sm:px-6 lg:px-8 py-24 overflow-hidden">
      {/* Animated gradient background */}
      <div
        className="absolute inset-0 animate-gradient"
        style={{ background: 'linear-gradient(135deg, #0a1a0b, #1a3d1a, #2a5a2a, #1a3d1a, #0a1a0b)' }}
      />
      {/* Green radial spotlight */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_60%_at_50%_50%,rgba(76,175,80,0.18)_0%,transparent_70%)]" />

      <div className="absolute top-8 left-6 font-heading font-black text-[140px] leading-none text-pk-900/60 select-none pointer-events-none hidden lg:block">
        08
      </div>

      <div className="relative z-10 max-w-4xl mx-auto w-full text-center">
        <FadeUpStagger delay={0.1}>
          <FadeUpItem>
            <div className="flex items-center justify-center gap-3 mb-6">
              <LineDrawIn className="w-12" color="bg-pk-500/40" />
              <p className="text-pk-400 font-heading font-bold text-xs tracking-widest uppercase">Limited Time Offer</p>
              <LineDrawIn className="w-12" color="bg-pk-500/40" />
            </div>
          </FadeUpItem>
        </FadeUpStagger>

        {/* Scale-slam headline */}
        <motion.div
          initial={{ scale: 1.15, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          viewport={{ once: true, margin: '-5%' }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="mb-10"
        >
          <h2 className="font-heading font-black text-white text-5xl sm:text-7xl lg:text-8xl tracking-tight leading-none">
            Save On Your<br />
            <span className="text-pk-400">First Service</span>
          </h2>
        </motion.div>

        {/* Spring-bounce discount cards */}
        <FadeUpStagger className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-2xl mx-auto mb-10" delay={0.4} stagger={0.12}>
          <FadeUpItem>
            <motion.div
              className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-6 flex items-center gap-4 hover:bg-white/15 transition-colors"
              whileInView={{ scale: [0.9, 1.03, 1] }}
              viewport={{ once: true }}
              transition={{ delay: 0.45, duration: 0.5, ease: 'easeOut' }}
            >
              <div className="w-12 h-12 bg-white/15 rounded-xl flex items-center justify-center shrink-0">
                <Tag size={22} className="text-white" />
              </div>
              <div className="text-left">
                <p className="font-heading font-black text-white text-4xl leading-none">10%</p>
                <p className="text-white/80 text-sm mt-1">For First-Time Customers</p>
              </div>
            </motion.div>
          </FadeUpItem>

          <FadeUpItem>
            <motion.div
              className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-6 flex items-center gap-4 hover:bg-white/15 transition-colors"
              whileInView={{ scale: [0.9, 1.03, 1] }}
              viewport={{ once: true }}
              transition={{ delay: 0.57, duration: 0.5, ease: 'easeOut' }}
            >
              <div className="w-12 h-12 bg-white/15 rounded-xl flex items-center justify-center shrink-0">
                <Users size={22} className="text-white" />
              </div>
              <div className="text-left">
                <p className="font-heading font-black text-white text-4xl leading-none">5%</p>
                <p className="text-white/80 text-sm mt-1">Seniors, Veterans &amp; Repeat Clients</p>
              </div>
            </motion.div>
          </FadeUpItem>
        </FadeUpStagger>

        <FadeUpStagger delay={0.7}>
          <FadeUpItem>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 bg-white text-pk-950 hover:bg-gray-100 font-black px-10 py-4 rounded-xl transition-all duration-200 text-base shadow-2xl hover:-translate-y-0.5 active:translate-y-0"
            >
              Claim Your Discount
              <ArrowRight size={16} />
            </Link>
          </FadeUpItem>
        </FadeUpStagger>
      </div>
    </div>
  )
}
