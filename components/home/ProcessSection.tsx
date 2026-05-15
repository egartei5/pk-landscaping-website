'use client'
import { motion } from 'framer-motion'
import TextReveal from '@/components/motion/TextReveal'
import LineDrawIn from '@/components/motion/LineDrawIn'
import FadeUpStagger, { FadeUpItem } from '@/components/motion/FadeUpStagger'

const steps = [
  { num: '01', title: 'Schedule', desc: 'Book a no-obligation consultation — we come to you.' },
  { num: '02', title: 'Assess', desc: 'We listen first, then evaluate your site and vision.' },
  { num: '03', title: 'Estimate', desc: 'Clear, itemized pricing with no hidden fees.' },
  { num: '04', title: 'Schedule', desc: 'We lock in a start date and keep you updated.' },
  { num: '05', title: 'Execute', desc: 'Crew arrives on time, uses proper tools, cleans up.' },
  { num: '06', title: 'Follow Up', desc: 'We check in after every project — guaranteed.' },
]

export default function ProcessSection() {
  return (
    <div className="relative flex flex-col justify-center min-h-screen px-4 sm:px-6 lg:px-8 py-24">
      {/* Radial glow — center bottom */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_100%,rgba(76,175,80,0.10)_0%,transparent_70%)]" />

      {/* Ghost number */}
      <div className="absolute top-8 right-6 font-heading font-black text-[140px] leading-none text-pk-900 select-none pointer-events-none hidden lg:block">
        04
      </div>

      <div className="relative z-10 max-w-7xl mx-auto w-full">
        <div className="text-center mb-20">
          <p className="section-label justify-center">Our Process</p>
          <LineDrawIn className="max-w-24 mx-auto mt-2 mb-6" delay={0.1} />
          <TextReveal
            text="How We Work With You"
            as="h2"
            className="font-heading font-black text-white text-4xl sm:text-6xl lg:text-7xl tracking-tight"
          />
        </div>

        {/* Desktop stepper */}
        <div className="hidden md:grid md:grid-cols-3 lg:grid-cols-6 gap-8">
          {steps.map((step, i) => (
            <FadeUpStagger key={step.num} delay={i * 0.12} className="flex flex-col items-center text-center">
              <FadeUpItem>
                <motion.div
                  className="w-14 h-14 rounded-full border-2 border-pk-500 flex items-center justify-center font-heading font-black text-pk-400 text-sm mb-4"
                  whileInView={{
                    boxShadow: ['0 0 0px rgba(76,175,80,0)', '0 0 20px rgba(76,175,80,0.4)', '0 0 10px rgba(76,175,80,0.2)'],
                  }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.12 + 0.4, duration: 0.6 }}
                >
                  {step.num}
                </motion.div>
              </FadeUpItem>
              <FadeUpItem>
                <h3 className="font-heading font-bold text-white text-sm mb-2">{step.title}</h3>
              </FadeUpItem>
              <FadeUpItem>
                <p className="text-gray-500 text-xs leading-relaxed">{step.desc}</p>
              </FadeUpItem>
            </FadeUpStagger>
          ))}
        </div>

        {/* Mobile vertical timeline */}
        <div className="md:hidden space-y-8">
          {steps.map((step, i) => (
            <FadeUpStagger key={step.num} delay={i * 0.1} className="flex gap-5">
              <FadeUpItem className="flex flex-col items-center">
                <div className="w-10 h-10 rounded-full border border-pk-500 flex items-center justify-center font-heading font-black text-pk-400 text-xs shrink-0">
                  {step.num}
                </div>
                {i < steps.length - 1 && <div className="w-px flex-1 bg-pk-800 mt-2" />}
              </FadeUpItem>
              <FadeUpItem className="pb-8">
                <h3 className="font-heading font-bold text-white text-base mb-1">{step.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{step.desc}</p>
              </FadeUpItem>
            </FadeUpStagger>
          ))}
        </div>
      </div>
    </div>
  )
}
