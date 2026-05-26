import TextReveal from '@/components/motion/TextReveal'
import FadeUpStagger, { FadeUpItem } from '@/components/motion/FadeUpStagger'
import LineDrawIn from '@/components/motion/LineDrawIn'
import BeforeAfterSlider from '@/components/ui/BeforeAfterSlider'

const transformations = [
  {
    label: 'Pool Area Landscaping',
    location: 'Fargo, ND',
    before: '/images/backyard-before-dirt-fargo.jpg',
    after: '/images/gravel-pool-landscaping-after-fargo.jpg',
    beforeAlt: 'Bare dirt backyard before landscaping in Fargo ND',
    afterAlt: 'Finished gravel and paver pool area landscaping in Fargo ND',
  },
  {
    label: 'Paver Patio Install',
    location: 'West Fargo, ND',
    before: '/images/landscape-before-bare-dirt.jpg',
    after: '/images/paver-patio-installation-fargo.jpg',
    beforeAlt: 'Bare dirt yard before paver installation in West Fargo',
    afterAlt: 'Completed multi-color paver patio installation in West Fargo ND',
  },
  {
    label: 'Lawn Restoration',
    location: 'Moorhead, MN',
    before: '/images/lawn-grading-prep-before.jpg',
    after: '/images/lawn-mowing-stripes-neighborhood-fargo.jpg',
    beforeAlt: 'Graded soil before lawn restoration in Moorhead MN',
    afterAlt: 'Beautiful striped lawn after restoration service in Moorhead MN',
  },
]

export default function BeforeAfterSection() {
  return (
    <div className="relative flex flex-col justify-center min-h-screen px-4 sm:px-6 lg:px-8 py-24">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_50%,rgba(76,175,80,0.08)_0%,transparent_70%)]" />

      <div className="absolute top-8 left-6 font-heading font-black text-[140px] leading-none text-pk-900 select-none pointer-events-none hidden lg:block">
        06
      </div>

      <div className="relative z-10 max-w-7xl mx-auto w-full">
        <div className="mb-14">
          <p className="section-label">Real Results</p>
          <LineDrawIn className="max-w-16 mt-2 mb-6" delay={0.1} />
          <TextReveal
            text="Before & After"
            as="h2"
            className="font-heading font-black text-white text-4xl sm:text-6xl lg:text-7xl tracking-tight mb-3"
          />
          <p className="text-gray-400 text-lg max-w-xl">
            Drag the handle on any photo to see the transformation for yourself.
          </p>
        </div>

        <FadeUpStagger className="grid grid-cols-1 md:grid-cols-3 gap-6" stagger={0.12} delay={0.3}>
          {transformations.map((t) => (
            <FadeUpItem key={t.label}>
              <BeforeAfterSlider
                before={t.before}
                after={t.after}
                beforeAlt={t.beforeAlt}
                afterAlt={t.afterAlt}
                label={t.label}
                location={t.location}
              />
            </FadeUpItem>
          ))}
        </FadeUpStagger>

        <FadeUpStagger className="text-center mt-12" delay={0.6}>
          <FadeUpItem>
            <a href="/contact" className="btn-primary inline-block px-8 py-3">
              Transform Your Property →
            </a>
          </FadeUpItem>
        </FadeUpStagger>
      </div>
    </div>
  )
}
