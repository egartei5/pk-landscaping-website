import Image from 'next/image'
import Link from 'next/link'
import SectionLabel from '@/components/ui/SectionLabel'

const projects = [
  {
    src: '/images/paver-patio-installation-fargo.jpg',
    alt: 'Paver patio installation completed in Fargo ND',
    title: 'Paver Patio',
    location: 'Fargo, ND',
    size: 'large',
  },
  {
    src: '/images/lawn-mowing-stripes-neighborhood-fargo.jpg',
    alt: 'Professional lawn mowing service in Fargo ND',
    title: 'Lawn Care',
    location: 'Fargo, ND',
    size: 'small',
  },
  {
    src: '/images/commercial-snow-removal-lot-fargo.jpg',
    alt: 'Commercial snow removal service in Fargo ND',
    title: 'Snow Removal',
    location: 'West Fargo, ND',
    size: 'small',
  },
  {
    src: '/images/rock-edging-spiral-bush-fargo.jpg',
    alt: 'Rock edging and spiral bush landscaping in Fargo ND',
    title: 'Rock Landscaping',
    location: 'Moorhead, MN',
    size: 'small',
  },
  {
    src: '/images/paver-walkway-herringbone-fargo.jpg',
    alt: 'Herringbone paver walkway installation in Fargo ND',
    title: 'Paver Walkway',
    location: 'Fargo, ND',
    size: 'small',
  },
  {
    src: '/images/deck-construction-fargo.jpg',
    alt: 'Deck construction project in Fargo ND',
    title: 'Deck Build',
    location: 'Fargo, ND',
    size: 'large',
  },
]

export default function FeaturedProjects() {
  return (
    <section className="bg-pk-off-white py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between mb-12 gap-4">
          <div>
            <SectionLabel>Featured Projects</SectionLabel>
            <h2 className="font-heading font-black text-pk-950 text-4xl sm:text-5xl">
              Work We&apos;re Proud Of
            </h2>
          </div>
          <Link href="/gallery" className="btn-outline-green shrink-0 self-start sm:self-auto">
            View All Projects →
          </Link>
        </div>

        {/* Asymmetric cinematic grid */}
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
          {/* Large feature — top left, spans 2 rows */}
          <div className="col-span-2 lg:col-span-1 lg:row-span-2 group relative overflow-hidden rounded-2xl cursor-pointer">
            <Link href="/gallery">
              <div className="relative h-64 sm:h-80 lg:h-full min-h-[320px]">
                <Image
                  src={projects[0].src}
                  alt={projects[0].alt}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 100vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-pk-950/80 via-pk-950/10 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4">
                  <span className="text-pk-400 text-xs font-bold uppercase tracking-widest">{projects[0].location}</span>
                  <p className="text-white font-heading font-bold text-xl mt-0.5">{projects[0].title}</p>
                </div>
              </div>
            </Link>
          </div>

          {/* Four small tiles */}
          {projects.slice(1, 5).map((project) => (
            <div key={project.src} className="group relative overflow-hidden rounded-2xl cursor-pointer">
              <Link href="/gallery">
                <div className="relative aspect-[4/3]">
                  <Image
                    src={project.src}
                    alt={project.alt}
                    fill
                    loading="lazy"
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    sizes="(max-width: 640px) 50vw, (max-width: 1024px) 50vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-pk-950/70 via-transparent to-transparent" />
                  <div className="absolute bottom-3 left-3 right-3">
                    <span className="text-pk-400 text-xs font-bold uppercase tracking-widest hidden sm:block">{project.location}</span>
                    <p className="text-white font-heading font-bold text-sm">{project.title}</p>
                  </div>
                </div>
              </Link>
            </div>
          ))}

          {/* Wide feature — bottom row */}
          <div className="col-span-2 lg:col-span-2 group relative overflow-hidden rounded-2xl cursor-pointer">
            <Link href="/gallery">
              <div className="relative aspect-[16/7] sm:aspect-[16/6]">
                <Image
                  src={projects[5].src}
                  alt={projects[5].alt}
                  fill
                  loading="lazy"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 100vw, 66vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-pk-950/70 via-pk-950/10 to-transparent" />
                <div className="absolute bottom-4 left-4">
                  <span className="text-pk-400 text-xs font-bold uppercase tracking-widest">{projects[5].location}</span>
                  <p className="text-white font-heading font-bold text-xl mt-0.5">{projects[5].title}</p>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
