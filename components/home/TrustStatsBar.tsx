import CountUp from '@/components/motion/CountUp'
import LineDrawIn from '@/components/motion/LineDrawIn'
import FadeUpStagger, { FadeUpItem } from '@/components/motion/FadeUpStagger'

const stats = [
  { value: 6, suffix: '+', label: 'Years in Business', desc: 'Serving Fargo since 2019' },
  { value: 500, suffix: '+', label: 'Projects Completed', desc: 'Residential & commercial' },
  { value: 5, prefix: '', suffix: '.0 ★', label: 'Google Rating', desc: 'Consistently top-rated' },
  { value: 100, suffix: '%', label: 'Satisfaction', desc: 'Guaranteed on every job' },
]

export default function TrustStatsBar() {
  return (
    <div className="relative flex flex-col justify-center min-h-screen px-4 sm:px-6 lg:px-8 py-24">
      {/* Radial glow — center */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_60%_at_50%_50%,rgba(76,175,80,0.10)_0%,transparent_70%)]" />

      {/* Ghost section number */}
      <div className="absolute top-8 left-6 font-heading font-black text-[140px] leading-none text-pk-900 select-none pointer-events-none hidden lg:block">
        01
      </div>

      <div className="relative z-10 max-w-7xl mx-auto w-full">
        <div className="text-center mb-16">
          <p className="section-label justify-center">By The Numbers</p>
          <LineDrawIn className="max-w-24 mx-auto mt-2" delay={0.2} />
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-0 lg:divide-x lg:divide-pk-800">
          {stats.map((stat, i) => (
            <FadeUpStagger key={stat.label} className="text-center px-8" delay={i * 0.1}>
              <FadeUpItem>
                <div className="font-heading font-black text-pk-400 text-6xl sm:text-7xl lg:text-8xl mb-2 leading-none">
                  <CountUp to={stat.value} suffix={stat.suffix} prefix={stat.prefix} duration={2.5} />
                </div>
              </FadeUpItem>
              <FadeUpItem>
                <p className="text-white font-heading font-bold text-lg mb-1">{stat.label}</p>
              </FadeUpItem>
              <FadeUpItem>
                <p className="text-gray-500 text-sm">{stat.desc}</p>
              </FadeUpItem>
            </FadeUpStagger>
          ))}
        </div>
      </div>
    </div>
  )
}
