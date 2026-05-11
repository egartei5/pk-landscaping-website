import SectionLabel from '@/components/ui/SectionLabel'
import Image from 'next/image'

const transformations = [
  {
    label: 'Lawn Restoration',
    before: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80',
    after: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=600&q=80',
  },
  {
    label: 'Paver Installation',
    before: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=600&q=80',
    after: 'https://images.unsplash.com/photo-1558904541-efa843a96f01?w=600&q=80',
  },
  {
    label: 'Spring Cleanup',
    before: 'https://images.unsplash.com/photo-1611735341450-74d61e660ad2?w=600&q=80',
    after: 'https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?w=600&q=80',
  },
]

export default function BeforeAfterSection() {
  return (
    <section className="bg-pk-950 py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <SectionLabel>Real Results</SectionLabel>
          <h2 className="font-heading font-black text-white text-4xl sm:text-5xl mb-4">
            Before &amp; After
          </h2>
          <p className="text-gray-400 max-w-xl mx-auto">
            See the transformations we deliver — from neglected yards to stunning outdoor spaces.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {transformations.map((t) => (
            <div key={t.label} className="rounded-2xl overflow-hidden border border-pk-800">
              <div className="grid grid-cols-2">
                <div className="relative">
                  <div className="absolute top-2 left-2 z-10 bg-black/70 text-white text-xs font-bold px-2 py-1 rounded">
                    Before
                  </div>
                  <div className="aspect-[4/3] relative">
                    <Image
                      src={t.before}
                      alt={`${t.label} before`}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 50vw, 16vw"
                    />
                  </div>
                </div>
                <div className="relative">
                  <div className="absolute top-2 right-2 z-10 bg-pk-500/90 text-white text-xs font-bold px-2 py-1 rounded">
                    After
                  </div>
                  <div className="aspect-[4/3] relative">
                    <Image
                      src={t.after}
                      alt={`${t.label} after`}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 50vw, 16vw"
                    />
                  </div>
                </div>
              </div>
              <div className="bg-pk-900 px-4 py-3">
                <p className="text-white font-heading font-bold text-sm">{t.label}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
