import Link from 'next/link'
import { Check, Star, Zap, Shield } from 'lucide-react'
import FadeUpStagger, { FadeUpItem } from '@/components/motion/FadeUpStagger'

const plans = [
  {
    name: 'Basic Care',
    icon: Shield,
    price: 'From $120',
    period: '/ month',
    description: 'Essential lawn maintenance to keep your yard looking clean and healthy all season.',
    features: [
      'Bi-weekly lawn mowing',
      'Edging & trimming',
      'Clipping cleanup',
      'Free spring consultation',
    ],
    cta: 'Get Started',
    highlight: false,
  },
  {
    name: 'Premium Care',
    icon: Star,
    price: 'From $220',
    period: '/ month',
    description: 'Full-service maintenance including seasonal treatments — our most popular plan.',
    features: [
      'Weekly lawn mowing',
      'Edging, trimming & blowing',
      'Seasonal fertilization',
      'Fall & spring cleanup',
      'Priority scheduling',
      'Free annual estimate',
    ],
    cta: 'Most Popular',
    highlight: true,
  },
  {
    name: 'Full Service',
    icon: Zap,
    price: 'Custom',
    period: 'quote',
    description: 'Everything in Premium plus snow removal, tree services, and year-round coverage.',
    features: [
      'Everything in Premium',
      'Snow removal (seasonal)',
      'Tree trimming (1x/year)',
      'Gutter cleaning (2x/year)',
      'Dedicated account manager',
      'Same-day response guarantee',
    ],
    cta: 'Get a Quote',
    highlight: false,
  },
]

export default function MaintenancePlansSection() {
  return (
    <section className="bg-pk-off-white py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <FadeUpStagger className="text-center mb-16">
          <FadeUpItem>
            <p className="section-label !text-pk-700">Maintenance Plans</p>
          </FadeUpItem>
          <FadeUpItem>
            <h2 className="font-heading font-black text-gray-900 text-4xl sm:text-5xl lg:text-6xl tracking-tight mt-3 mb-4">
              Set It & Forget It
            </h2>
          </FadeUpItem>
          <FadeUpItem>
            <p className="text-gray-500 text-lg max-w-2xl mx-auto">
              Lock in a seasonal plan and never worry about scheduling again. We show up, you enjoy the results.
            </p>
          </FadeUpItem>
        </FadeUpStagger>

        <FadeUpStagger className="grid grid-cols-1 md:grid-cols-3 gap-8" delay={0.2}>
          {plans.map((plan) => {
            const Icon = plan.icon
            return (
              <FadeUpItem key={plan.name}>
                <div
                  className={`relative rounded-2xl p-8 h-full flex flex-col transition-all duration-300 hover:-translate-y-1 ${
                    plan.highlight
                      ? 'bg-pk-900 border-2 border-pk-500 shadow-[0_0_40px_rgba(76,175,80,0.2)]'
                      : 'bg-white border border-gray-200 hover:border-pk-500/40 hover:shadow-lg'
                  }`}
                >
                  {plan.highlight && (
                    <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-pk-500 text-white text-xs font-bold px-4 py-1.5 rounded-full tracking-widest uppercase">
                      Most Popular
                    </div>
                  )}

                  <div className={`w-11 h-11 rounded-xl flex items-center justify-center mb-5 ${plan.highlight ? 'bg-pk-500' : 'bg-pk-50 bg-opacity-10 border border-pk-500/20'}`}>
                    <Icon size={20} className={plan.highlight ? 'text-white' : 'text-pk-500'} />
                  </div>

                  <h3 className={`font-heading font-black text-xl mb-1 ${plan.highlight ? 'text-white' : 'text-gray-900'}`}>
                    {plan.name}
                  </h3>
                  <p className={`text-sm mb-4 ${plan.highlight ? 'text-gray-400' : 'text-gray-500'}`}>
                    {plan.description}
                  </p>

                  <div className="flex items-end gap-1 mb-6">
                    <span className={`font-heading font-black text-3xl ${plan.highlight ? 'text-pk-400' : 'text-gray-900'}`}>
                      {plan.price}
                    </span>
                    <span className={`text-sm mb-1 ${plan.highlight ? 'text-gray-500' : 'text-gray-400'}`}>
                      {plan.period}
                    </span>
                  </div>

                  <ul className="space-y-3 mb-8 flex-1">
                    {plan.features.map((f) => (
                      <li key={f} className="flex items-center gap-2.5">
                        <Check size={15} className="text-pk-500 shrink-0" />
                        <span className={`text-sm ${plan.highlight ? 'text-gray-300' : 'text-gray-600'}`}>{f}</span>
                      </li>
                    ))}
                  </ul>

                  <Link
                    href="/contact"
                    className={`block text-center font-bold py-3.5 rounded-xl transition-all duration-200 ${
                      plan.highlight
                        ? 'bg-pk-500 hover:bg-pk-400 text-white shadow-lg hover:-translate-y-0.5'
                        : 'border border-pk-500 text-pk-500 hover:bg-pk-500 hover:text-white'
                    }`}
                  >
                    {plan.cta} →
                  </Link>
                </div>
              </FadeUpItem>
            )
          })}
        </FadeUpStagger>

        <FadeUpStagger className="mt-10 text-center" delay={0.4}>
          <FadeUpItem>
            <p className="text-gray-500 text-sm">
              All plans include free estimates · No long-term contracts · Cancel anytime
            </p>
          </FadeUpItem>
        </FadeUpStagger>
      </div>
    </section>
  )
}
