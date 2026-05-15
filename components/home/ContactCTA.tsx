import Image from 'next/image'
import { Phone, MapPin, Clock } from 'lucide-react'
import TextReveal from '@/components/motion/TextReveal'
import ImageReveal from '@/components/motion/ImageReveal'
import FadeUpStagger, { FadeUpItem } from '@/components/motion/FadeUpStagger'
import LineDrawIn from '@/components/motion/LineDrawIn'

export default function ContactCTA() {
  return (
    <div className="relative flex flex-col justify-center min-h-screen px-4 sm:px-6 lg:px-8 py-24 overflow-hidden">
      {/* Full-screen background with curtain reveal */}
      <ImageReveal className="absolute inset-0">
        <Image
          src="/images/paver-patio-installation-fargo.jpg"
          alt="Paver patio installation project by PK Landscaping in Fargo ND"
          fill
          className="object-cover object-center"
          sizes="100vw"
        />
      </ImageReveal>

      {/* Deep overlay */}
      <div className="absolute inset-0 bg-pk-950/88 z-[1]" />

      {/* Green radial glow top */}
      <div className="absolute inset-0 z-[1] bg-[radial-gradient(ellipse_60%_50%_at_50%_0%,rgba(76,175,80,0.12)_0%,transparent_70%)]" />

      <div className="absolute top-8 right-6 font-heading font-black text-[140px] leading-none text-pk-900/60 select-none pointer-events-none hidden lg:block z-[2]">
        09
      </div>

      <div className="relative z-10 max-w-4xl mx-auto text-center">
        <FadeUpStagger delay={0.3}>
          <FadeUpItem>
            <p className="section-label justify-center">Get In Touch</p>
          </FadeUpItem>
        </FadeUpStagger>

        <LineDrawIn className="max-w-24 mx-auto mt-2 mb-8" delay={0.4} />

        <TextReveal
          text="Ready to Get Started?"
          as="h2"
          delay={0.4}
          className="font-heading font-black text-white text-5xl sm:text-7xl lg:text-8xl tracking-tight leading-none mb-8"
        />

        <FadeUpStagger delay={0.8}>
          <FadeUpItem>
            <p className="text-gray-400 text-lg leading-relaxed mb-12 max-w-xl mx-auto">
              Call us today and we&apos;ll get you taken care of. Serving Fargo, Moorhead, and surrounding areas.
            </p>
          </FadeUpItem>
        </FadeUpStagger>

        <FadeUpStagger className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-14" delay={1.0} stagger={0.1}>
          <FadeUpItem>
            <a href="tel:+12189791154" className="flex items-center gap-3 text-gray-300 hover:text-pk-400 transition-colors group">
              <div className="w-11 h-11 bg-pk-800 rounded-xl flex items-center justify-center shrink-0 group-hover:bg-pk-700 transition-colors">
                <Phone size={16} className="text-pk-500" />
              </div>
              <div className="text-left">
                <p className="text-xs text-gray-500 uppercase tracking-widest">Call Us</p>
                <p className="font-bold text-white">(218) 979-1154</p>
              </div>
            </a>
          </FadeUpItem>
          <FadeUpItem>
            <div className="flex items-center gap-3 text-gray-300">
              <div className="w-11 h-11 bg-pk-800 rounded-xl flex items-center justify-center shrink-0">
                <MapPin size={16} className="text-pk-500" />
              </div>
              <div className="text-left">
                <p className="text-xs text-gray-500 uppercase tracking-widest">Location</p>
                <p className="font-bold text-white">Fargo, ND 58103</p>
              </div>
            </div>
          </FadeUpItem>
          <FadeUpItem>
            <div className="flex items-center gap-3 text-gray-300">
              <div className="w-11 h-11 bg-pk-800 rounded-xl flex items-center justify-center shrink-0">
                <Clock size={16} className="text-pk-500" />
              </div>
              <div className="text-left">
                <p className="text-xs text-gray-500 uppercase tracking-widest">Hours</p>
                <p className="font-bold text-white">Mon–Sat: 7am–8pm</p>
              </div>
            </div>
          </FadeUpItem>
        </FadeUpStagger>

        <FadeUpStagger delay={1.3}>
          <FadeUpItem>
            <a
              href="tel:+12189791154"
              className="inline-block btn-primary text-xl px-14 py-5 shadow-2xl shadow-pk-500/20"
            >
              Call (218) 979-1154
            </a>
          </FadeUpItem>
        </FadeUpStagger>
      </div>
    </div>
  )
}
