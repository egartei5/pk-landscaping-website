'use client'
import { useState } from 'react'
import Image from 'next/image'
import Lightbox from 'yet-another-react-lightbox'
import 'yet-another-react-lightbox/styles.css'

const categories = ['All', 'Lawn Care', 'Paving', 'Pavers', 'Snow Removal', 'Trees']

const images = [
  { src: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=800&q=80', alt: 'Freshly mowed lawn with clean stripes', category: 'Lawn Care' },
  { src: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80', alt: 'Professional road paving in progress', category: 'Paving' },
  { src: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&q=80', alt: 'Beautiful paver patio installation', category: 'Pavers' },
  { src: 'https://images.unsplash.com/photo-1607472586893-edb57bdc0e39?w=800&q=80', alt: 'Snow removal from residential driveway', category: 'Snow Removal' },
  { src: 'https://images.unsplash.com/photo-1518599904199-0ca897819ddb?w=800&q=80', alt: 'Professional tree trimming service', category: 'Trees' },
  { src: 'https://images.unsplash.com/photo-1542773998-9325f0a098d7?w=800&q=80', alt: 'Fall cleanup of leaf-covered lawn', category: 'Lawn Care' },
  { src: 'https://images.unsplash.com/photo-1513836279014-a89f7a76ae86?w=800&q=80', alt: 'Lush green residential lawn after mowing', category: 'Lawn Care' },
  { src: 'https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?w=800&q=80', alt: 'Brick paver walkway installation', category: 'Pavers' },
]

export default function GalleryPage() {
  const [activeCategory, setActiveCategory] = useState('All')
  const [lightboxIndex, setLightboxIndex] = useState(-1)

  const filtered = activeCategory === 'All' ? images : images.filter((img) => img.category === activeCategory)

  return (
    <>
      <div className="bg-pk-900 pt-32 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="font-heading font-black text-white text-5xl sm:text-6xl mb-4">Our Work</h1>
          <p className="text-gray-400 text-lg">Browse completed projects across Fargo, ND and surrounding areas. Click any photo to view full-size.</p>
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
                {cat}
              </button>
            ))}
          </div>

          {/* Grid */}
          <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 space-y-4">
            {filtered.map((img) => (
              <div
                key={img.src}
                className="break-inside-avoid cursor-pointer group relative overflow-hidden rounded-xl"
                onClick={() => setLightboxIndex(filtered.indexOf(img))}
              >
                <div className="relative aspect-[4/3]">
                  <Image
                    src={img.src}
                    alt={img.alt}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-pk-900/0 group-hover:bg-pk-900/40 transition-colors duration-300 flex items-center justify-center">
                    <span className="text-white font-bold opacity-0 group-hover:opacity-100 transition-opacity">View Full Size</span>
                  </div>
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-pk-950/80 to-transparent">
                  <span className="text-xs font-bold text-pk-500 uppercase tracking-widest">{img.category}</span>
                  <p className="text-white text-sm font-medium">{img.alt}</p>
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
