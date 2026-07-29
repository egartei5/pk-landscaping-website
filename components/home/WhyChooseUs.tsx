import Image from 'next/image'
import { CheckCircle2 } from 'lucide-react'
import TextReveal from '@/components/motion/TextReveal'
import ImageReveal from '@/components/motion/ImageReveal'
import FadeUpStagger, { FadeUpItem } from '@/components/motion/FadeUpStagger'
import LineDrawIn from '@/components/motion/LineDrawIn'

const benefits = [
  'Free estimates — no commitment, no pressure',
  'Fully insured & bonded for your peace of mind',
  'Fast response — same-day or next-day service',
  '10% off for new customers, 5% for seniors & veterans',
  'Consistent crew — same team every visit',
  'Satisfaction guaranteed or we come back free',
]

export default function WhyChooseUs() {
  return (
    <div className="relative flex flex-col justify-center min-h-screen px-4 sm:px-6 lg:px-8 py-24">
      {/* Radial glow — top right */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_50%_60%_at_100%_0%,rgba(76,175,80,0.09)_0%,transparent_70%)]" />

      {/* Ghost section number */}
      <div className="absolute top-8 left-6 font-heading font-black text-[140px] leading-none text-pk-900 select-none pointer-events-none hidden lg:block">
        03
      </div>

      <div className="relative z-10 max-w-7xl mx-auto w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Content */}
          <div>
            <p className="section-label">Why Choose Us</p>
            <LineDrawIn className="max-w-16 mt-2 mb-6" delay={0.1} />
            <TextReveal
              text="A Team That Understands Nature And Your Property"
              as="h2"
              className="font-heading font-black text-white text-4xl sm:text-5xl lg:text-6xl leading-none tracking-tight mb-8"
            />

            <FadeUpStagger className="space-y-3 mb-8" delay={0.5}>
              {benefits.map((benefit) => (
                <FadeUpItem key={benefit} className="flex items-center gap-3">
                  <CheckCircle2 size={18} className="text-pk-500 shrink-0" />
                  <span className="text-gray-300 font-medium">{benefit}</span>
                </FadeUpItem>
              ))}
            </FadeUpStagger>

            <FadeUpStagger delay={0.9}>
              <FadeUpItem>
                <p className="text-gray-500 text-sm leading-relaxed">
                  Serving Fargo, Moorhead, and surrounding communities with responsive support built around real-life needs — from reviving frost-bitten lawns in spring to precision hardscape installation.
                </p>
              </FadeUpItem>
            </FadeUpStagger>
          </div>

          {/* Image with curtain reveal */}
          <div className="relative">
            <ImageReveal className="h-[500px] lg:h-[600px] rounded-2xl" delay={0.2}>
              <Image
                src="/images/rock-edging-spiral-bush-fargo.jpg"
                alt="PK Landscaping completed rock edging and spiral bush installation in Fargo ND"
                fill
                className="object-cover object-center rounded-2xl"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </ImageReveal>

            {/* Floating stat badge */}
            <FadeUpStagger className="absolute -bottom-6 -left-6" delay={1.0}>
              <FadeUpItem className="bg-pk-800 border border-pk-700 rounded-2xl px-6 py-5 shadow-2xl">
                <p className="font-heading font-black text-4xl text-pk-400 leading-none">3+</p>
                <p className="text-gray-400 text-sm mt-1">Years Serving Fargo</p>
              </FadeUpItem>
            </FadeUpStagger>
          </div>
        </div>
      </div>
    </div>
  )
}
