import Link from 'next/link'
import { Tag, Users, ArrowRight } from 'lucide-react'

export default function DiscountBanner() {
  return (
    <section className="relative py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Animated gradient background */}
      <div
        className="absolute inset-0 animate-gradient"
        style={{
          background: 'linear-gradient(135deg, #1a3d1a, #4caf50, #2a5a2a, #6fcf73, #1a3d1a)',
        }}
      />
      {/* Noise texture overlay for depth */}
      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(ellipse_at_top_left,_rgba(255,255,255,0.3)_0%,_transparent_60%)]" />

      <div className="relative z-10 max-w-5xl mx-auto text-center">
        <p className="inline-flex items-center gap-2 text-white/70 font-heading font-bold text-xs tracking-widest uppercase mb-4">
          <span className="w-6 h-px bg-white/40 inline-block" />
          Limited Time Offer
          <span className="w-6 h-px bg-white/40 inline-block" />
        </p>
        <h2 className="font-heading font-black text-white text-4xl sm:text-5xl mb-8 drop-shadow-sm">
          Save On Your First Service
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-2xl mx-auto mb-8">
          <div className="bg-white/15 backdrop-blur-sm border border-white/25 rounded-2xl p-6 flex items-center gap-4 hover:bg-white/20 transition-colors">
            <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center shrink-0">
              <Tag size={22} className="text-white" />
            </div>
            <div className="text-left">
              <p className="font-heading font-black text-white text-3xl leading-none">10% OFF</p>
              <p className="text-white/80 text-sm mt-1">For First-Time Customers</p>
            </div>
          </div>
          <div className="bg-white/15 backdrop-blur-sm border border-white/25 rounded-2xl p-6 flex items-center gap-4 hover:bg-white/20 transition-colors">
            <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center shrink-0">
              <Users size={22} className="text-white" />
            </div>
            <div className="text-left">
              <p className="font-heading font-black text-white text-3xl leading-none">5% OFF</p>
              <p className="text-white/80 text-sm mt-1">Seniors, Veterans &amp; Repeat Clients</p>
            </div>
          </div>
        </div>

        <p className="text-white/75 mb-8 max-w-lg mx-auto text-sm leading-relaxed">
          Mention your discount when requesting your estimate. We&apos;re proud to give back to the community that trusts us.
        </p>

        <Link
          href="/contact"
          className="inline-flex items-center gap-2 bg-white text-pk-900 hover:bg-gray-50 font-black px-8 py-4 rounded-xl transition-all duration-200 text-base shadow-xl hover:shadow-2xl hover:-translate-y-0.5 active:translate-y-0"
        >
          Claim Your Discount
          <ArrowRight size={16} />
        </Link>
      </div>
    </section>
  )
}
