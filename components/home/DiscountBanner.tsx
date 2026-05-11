import Link from 'next/link'
import { Tag, Users } from 'lucide-react'

export default function DiscountBanner() {
  return (
    <section className="bg-pk-500 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto text-center">
        <h2 className="font-heading font-black text-white text-4xl sm:text-5xl mb-6">
          Save On Your First Service
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-2xl mx-auto mb-8">
          <div className="bg-white/20 backdrop-blur rounded-xl p-5 flex items-center gap-4">
            <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center shrink-0">
              <Tag size={22} className="text-white" />
            </div>
            <div className="text-left">
              <p className="font-heading font-black text-white text-2xl">10% OFF</p>
              <p className="text-white/90 text-sm">For First-Time Customers</p>
            </div>
          </div>
          <div className="bg-white/20 backdrop-blur rounded-xl p-5 flex items-center gap-4">
            <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center shrink-0">
              <Users size={22} className="text-white" />
            </div>
            <div className="text-left">
              <p className="font-heading font-black text-white text-2xl">5% OFF</p>
              <p className="text-white/90 text-sm">Seniors, Veterans & Repeat Clients</p>
            </div>
          </div>
        </div>
        <p className="text-white/80 mb-8 max-w-lg mx-auto">
          Mention your discount when requesting your estimate. We&apos;re proud to give back to the community that trusts us.
        </p>
        <Link href="/contact" className="inline-block bg-white text-pk-900 hover:bg-gray-100 font-black px-8 py-4 rounded-lg transition-colors text-base shadow-xl">
          Claim Your Discount →
        </Link>
      </div>
    </section>
  )
}
