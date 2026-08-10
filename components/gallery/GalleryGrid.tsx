'use client'
import { useState, useMemo } from 'react'
import Image from 'next/image'
import Lightbox from 'yet-another-react-lightbox'
import 'yet-another-react-lightbox/styles.css'
import type { GalleryItem } from '@/lib/gallery'

interface Props {
  images: GalleryItem[]
  categories: string[]
}

export default function GalleryGrid({ images, categories }: Props) {
  const [activeCategory, setActiveCategory] = useState('All')
  const [lightboxIndex, setLightboxIndex] = useState(-1)

  const filtered = useMemo(
    () => (activeCategory === 'All' ? images : images.filter((img) => img.category === activeCategory)),
    [images, activeCategory]
  )

  function selectCategory(cat: string) {
    setActiveCategory(cat)
    // Indexes are relative to the filtered list, so close the lightbox on filter change.
    setLightboxIndex(-1)
  }

  return (
    <>
      <div className="flex flex-wrap gap-2 justify-center mb-10">
        {categories.map((cat) => {
          const count = cat === 'All' ? images.length : images.filter((i) => i.category === cat).length
          return (
            <button
              key={cat}
              onClick={() => selectCategory(cat)}
              className={`px-4 py-2 rounded-full text-sm font-bold transition-colors ${
                activeCategory === cat ? 'bg-pk-500 text-white' : 'bg-pk-800 text-gray-400 hover:text-white border border-pk-700'
              }`}
            >
              {cat} ({count})
            </button>
          )
        })}
      </div>

      <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 space-y-4">
        {filtered.map((img, idx) => (
          <div
            key={img.url}
            className="break-inside-avoid cursor-pointer group relative overflow-hidden rounded-xl"
            onClick={() => setLightboxIndex(idx)}
          >
            <div className="relative aspect-[4/3]">
              <Image
                src={img.url}
                alt={img.alt}
                fill
                loading="lazy"
                // Images added through the admin panel are arbitrary remote URLs,
                // which the Next optimizer would reject. Serve those as-is.
                unoptimized={!img.url.startsWith('/')}
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

      {filtered.length === 0 && (
        <p className="text-center text-gray-400 py-16">No photos in this category yet.</p>
      )}

      <Lightbox
        open={lightboxIndex >= 0}
        index={lightboxIndex}
        close={() => setLightboxIndex(-1)}
        slides={filtered.map((img) => ({ src: img.url, alt: img.alt }))}
      />
    </>
  )
}
