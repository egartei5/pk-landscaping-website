import Image from 'next/image'
import Link from 'next/link'
import TextReveal from '@/components/motion/TextReveal'
import ImageReveal from '@/components/motion/ImageReveal'
import FadeUpStagger, { FadeUpItem } from '@/components/motion/FadeUpStagger'
import LineDrawIn from '@/components/motion/LineDrawIn'

const projects = [
  { src: '/images/paver-patio-installation-fargo.jpg', alt: 'Paver patio installation completed in Fargo ND', title: 'Paver Patio', location: 'Fargo, ND', size: 'large' },
  { src: '/images/lawn-mowing-stripes-neighborhood-fargo.jpg', alt: 'Professional lawn mowing service in Fargo ND', title: 'Lawn Care', location: 'Fargo, ND', size: 'small' },
  { src: '/images/commercial-snow-removal-lot-fargo.jpg', alt: 'Commercial snow removal service in Fargo ND', title: 'Snow Removal', location: 'West Fargo, ND', size: 'small' },
  { src: '/images/rock-edging-spiral-bush-fargo.jpg', alt: 'Rock edging and spiral bush landscaping in Fargo ND', title: 'Rock Landscaping', location: 'Moorhead, MN', size: 'small' },
  { src: '/images/paver-walkway-herringbone-fargo.jpg', alt: 'Herringbone paver walkway installation in Fargo ND', title: 'Paver Walkway', location: 'Fargo, ND', size: 'small' },
  { src: '/images/deck-construction-fargo.jpg', alt: 'Deck construction project in Fargo ND', title: 'Deck Build', location: 'Fargo, ND', size: 'large' },
]

export default function FeaturedProjects() {
  return (
    <div className="relative flex flex-col justify-center min-h-screen px-4 sm:px-6 lg:px-8 py-24">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_50%_60%_at_100%_50%,rgba(76,175,80,0.09)_0%,transparent_70%)]" />

      <div className="absolute top-8 right-6 font-heading font-black text-[140px] leading-none text-pk-900 select-none pointer-events-none hidden lg:block">
        07
      </div>

      <div className="relative z-10 max-w-7xl mx-auto w-full">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between mb-12 gap-4">
          <div>
            <p className="section-label">Featured Projects</p>
            <LineDrawIn className="max-w-16 mt-2 mb-6" delay={0.1} />
            <TextReveal
              text="Work We're Proud Of"
              as="h2"
              className="font-heading font-black text-white text-4xl sm:text-6xl lg:text-7xl tracking-tight"
            />
          </div>
          <FadeUpStagger delay={0.4}>
            <FadeUpItem>
              <Link href="/gallery" className="btn-outline text-sm shrink-0">
                View All Projects →
              </Link>
            </FadeUpItem>
          </FadeUpStagger>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-3 gap-3">
          {/* Large tile — spans 2 rows */}
          <div className="col-span-2 lg:col-span-1 lg:row-span-2 group">
            <Link href="/gallery">
              <ImageReveal className="h-64 sm:h-80 lg:h-full min-h-[320px] rounded-2xl" delay={0.2}>
                <Image src={projects[0].src} alt={projects[0].alt} fill className="object-cover transition-transform duration-700 group-hover:scale-105" sizes="33vw" />
                <div className="absolute inset-0 bg-gradient-to-t from-pk-950/80 via-pk-950/10 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4">
                  <span className="text-pk-400 text-xs font-bold uppercase tracking-widest">{projects[0].location}</span>
                  <p className="text-white font-heading font-bold text-xl mt-0.5">{projects[0].title}</p>
                </div>
              </ImageReveal>
            </Link>
          </div>

          {/* Four small tiles */}
          {projects.slice(1, 5).map((project, i) => (
            <div key={project.src} className="group">
              <Link href="/gallery">
                <ImageReveal className="aspect-[4/3] rounded-2xl" delay={0.3 + i * 0.08}>
                  <Image src={project.src} alt={project.alt} fill loading="lazy" className="object-cover transition-transform duration-700 group-hover:scale-105" sizes="33vw" />
                  <div className="absolute inset-0 bg-gradient-to-t from-pk-950/70 via-transparent to-transparent" />
                  <div className="absolute bottom-3 left-3 right-3">
                    <span className="text-pk-400 text-xs font-bold uppercase tracking-widest hidden sm:block">{project.location}</span>
                    <p className="text-white font-heading font-bold text-sm">{project.title}</p>
                  </div>
                </ImageReveal>
              </Link>
            </div>
          ))}

          {/* Wide bottom tile */}
          <div className="col-span-2 group">
            <Link href="/gallery">
              <ImageReveal className="aspect-[16/7] sm:aspect-[16/6] rounded-2xl" delay={0.65}>
                <Image src={projects[5].src} alt={projects[5].alt} fill loading="lazy" className="object-cover transition-transform duration-700 group-hover:scale-105" sizes="66vw" />
                <div className="absolute inset-0 bg-gradient-to-t from-pk-950/70 via-pk-950/10 to-transparent" />
                <div className="absolute bottom-4 left-4">
                  <span className="text-pk-400 text-xs font-bold uppercase tracking-widest">{projects[5].location}</span>
                  <p className="text-white font-heading font-bold text-xl mt-0.5">{projects[5].title}</p>
                </div>
              </ImageReveal>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
