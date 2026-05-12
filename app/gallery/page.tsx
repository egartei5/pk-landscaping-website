'use client'
import { useState } from 'react'
import Image from 'next/image'
import Lightbox from 'yet-another-react-lightbox'
import 'yet-another-react-lightbox/styles.css'

const categories = ['All', 'Lawn Care', 'Landscaping', 'Pavers', 'Snow Removal', 'Hardscape']

const images = [
  // Lawn Care
  { src: '/images/lawn-mowing-stripes-premium-fargo.jpg', alt: 'Premium lawn mowing with perfect stripes in Fargo ND', category: 'Lawn Care' },
  { src: '/images/lawn-mowing-stripes-neighborhood-fargo.jpg', alt: 'Professionally mowed striped lawn in Fargo ND', category: 'Lawn Care' },
  { src: '/images/lawn-maintenance-deck-view-fargo.jpg', alt: 'Lawn maintenance and landscaping in Fargo ND', category: 'Lawn Care' },

  // Landscaping
  { src: '/images/rock-edging-spiral-bush-fargo.jpg', alt: 'Rock edging with spiral bushes landscaping in Fargo ND', category: 'Landscaping' },
  { src: '/images/rock-garden-bed-edging-fargo.jpg', alt: 'Rock garden bed with clean edging in Fargo ND', category: 'Landscaping' },
  { src: '/images/mulch-garden-rock-border-fargo.jpg', alt: 'Mulch garden with rock border landscaping in Fargo ND', category: 'Landscaping' },
  { src: '/images/tree-ring-paver-circle-fargo.jpg', alt: 'Tree ring with paver circle landscaping in Fargo ND', category: 'Landscaping' },
  { src: '/images/gravel-tree-ring-fargo.jpg', alt: 'Gravel tree ring landscaping in Fargo ND', category: 'Landscaping' },
  { src: '/images/gravel-pool-landscaping-after-fargo.jpg', alt: 'Gravel pool area landscaping completed in Fargo ND', category: 'Landscaping' },
  { src: '/images/lawn-rock-edging-blue-house-fargo.jpg', alt: 'Lawn rock edging installation in Fargo ND', category: 'Landscaping' },
  { src: '/images/landscaping-crew-work-fargo.jpg', alt: 'PK Landscaping crew working on residential property in Fargo ND', category: 'Landscaping' },
  { src: '/images/gravel-landscaping-install-fargo.jpg', alt: 'Gravel landscaping installation in Fargo ND', category: 'Landscaping' },
  { src: '/images/gravel-landscaping-compactor-2-fargo.jpg', alt: 'Professional gravel landscaping with compactor in Fargo ND', category: 'Landscaping' },
  { src: '/images/landscaping-crew-planting-fargo.jpg', alt: 'Landscaping crew planting project in Fargo ND', category: 'Landscaping' },
  { src: '/images/large-garden-planting-fargo.jpg', alt: 'Large garden planting with weed barrier in Fargo ND', category: 'Landscaping' },
  { src: '/images/landscape-planting-weed-barrier-fargo.jpg', alt: 'Weed barrier installation with new plantings in Fargo ND', category: 'Landscaping' },
  { src: '/images/landscaping-crew-barrier-install-fargo.jpg', alt: 'Landscaping crew installing barrier in Fargo ND', category: 'Landscaping' },

  // Pavers
  { src: '/images/paver-patio-installation-fargo.jpg', alt: 'Paver patio installation in Fargo ND', category: 'Pavers' },
  { src: '/images/paver-walkway-herringbone-fargo.jpg', alt: 'Herringbone paver walkway installation in Fargo ND', category: 'Pavers' },

  // Snow Removal
  { src: '/images/commercial-snow-removal-lot-fargo.jpg', alt: 'Commercial snow removal parking lot in Fargo ND', category: 'Snow Removal' },
  { src: '/images/snow-removal-parking-lot-fargo.jpg', alt: 'Snow removal from parking lot in West Fargo ND', category: 'Snow Removal' },
  { src: '/images/snow-removal-roof-fargo.jpg', alt: 'Snow removal from roof in Fargo ND', category: 'Snow Removal' },
  { src: '/images/snow-roof-icicles-fargo.jpg', alt: 'Winter roof snow and ice removal in Fargo ND', category: 'Snow Removal' },

  // Hardscape
  { src: '/images/deck-construction-fargo.jpg', alt: 'Deck construction and hardscape in Fargo ND', category: 'Hardscape' },

  // Transformations (shown in all)
  { src: '/images/lawn-seeding-prep-fargo.jpg', alt: 'Lawn seeding preparation in Fargo ND', category: 'Lawn Care' },
  { src: '/images/lawn-grading-prep-before.jpg', alt: 'Lawn grading and preparation in Fargo ND', category: 'Lawn Care' },
  { src: '/images/land-clearing-grading-fargo.jpg', alt: 'Land clearing and grading in Fargo ND', category: 'Landscaping' },
  { src: '/images/backyard-before-dirt-fargo.jpg', alt: 'Backyard landscaping project in progress in Fargo ND', category: 'Landscaping' },
  { src: '/images/backyard-landscaping-before-crew.jpg', alt: 'Backyard transformation project in Fargo ND', category: 'Landscaping' },
  { src: '/images/landscape-before-bare-dirt.jpg', alt: 'Landscape preparation before paver installation in Fargo ND', category: 'Pavers' },
]

export default function GalleryPage() {
  const [activeCategory, setActiveCategory] = useState('All')
  const [lightboxIndex, setLightboxIndex] = useState(-1)

  const filtered = activeCategory === 'All' ? images : images.filter((img) => img.category === activeCategory)

  return (
    <>
      <div className="bg-pk-900 pt-32 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-pk-400 font-heading font-bold text-xs tracking-widest uppercase mb-3">Real Projects. Real Results.</p>
          <h1 className="font-heading font-black text-white text-5xl sm:text-6xl mb-4">Our Work</h1>
          <p className="text-gray-400 text-lg">Browse completed projects across Fargo, West Fargo, Moorhead, and surrounding areas. Click any photo to view full-size.</p>
        </div>
      </div>

      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-pk-950">
        <div className="max-w-7xl mx-auto">
          {/* Filter tabs */}
          <div className="flex flex-wrap gap-2 justify-center mb-10">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-full text-sm font-bold transition-colors ${
                  activeCategory === cat ? 'bg-pk-500 text-white' : 'bg-pk-800 text-gray-400 hover:text-white border border-pk-700'
                }`}
              >
                {cat} {cat === 'All' ? `(${images.length})` : `(${images.filter(i => i.category === cat).length})`}
              </button>
            ))}
          </div>

          {/* Masonry grid */}
          <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 space-y-4">
            {filtered.map((img, idx) => (
              <div
                key={img.src}
                className="break-inside-avoid cursor-pointer group relative overflow-hidden rounded-xl"
                onClick={() => setLightboxIndex(idx)}
              >
                <div className="relative aspect-[4/3]">
                  <Image
                    src={img.src}
                    alt={img.alt}
                    fill
                    loading="lazy"
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-pk-900/0 group-hover:bg-pk-900/40 transition-colors duration-300 flex items-center justify-center">
                    <span className="text-white font-bold text-sm opacity-0 group-hover:opacity-100 transition-opacity bg-black/40 px-4 py-2 rounded-full">
                      View Full Size
                    </span>
                  </div>
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-pk-950/90 to-transparent">
                  <span className="text-xs font-bold text-pk-400 uppercase tracking-widest">{img.category}</span>
                  <p className="text-white text-xs font-medium mt-0.5 line-clamp-1">{img.alt}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Lightbox
        open={lightboxIndex >= 0}
        index={lightboxIndex}
        close={() => setLightboxIndex(-1)}
        slides={filtered.map((img) => ({ src: img.src, alt: img.alt }))}
      />
    </>
  )
}
