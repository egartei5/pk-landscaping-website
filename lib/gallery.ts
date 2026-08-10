import { unstable_cache } from 'next/cache'
import { db } from './db'
import { GALLERY_CACHE_TAG } from './cacheTags'
import galleryFallback from '@/data/gallery.json'

export interface GalleryItem {
  url: string
  alt: string
  category: string
}

/** Re-exported for convenience; canonical definition lives in lib/cacheTags. */
export { GALLERY_CACHE_TAG }

/**
 * The project photos that ship with the repo. Used to seed an empty database
 * and as a render-time fallback so /gallery is never blank if the DB is
 * unreachable.
 */
export const fallbackGallery: GalleryItem[] = galleryFallback as GalleryItem[]

/**
 * Source of truth for the public gallery: the GalleryImage table, which is
 * what the admin panel writes to. Falls back to the bundled photos when the
 * table is empty or the database can't be reached.
 *
 * Wrapped in the Next data cache rather than page-level ISR: Railway's private
 * network is unavailable during the build, so prerendering this page would
 * fail to reach Postgres. Keeping the page dynamic and caching the query gets
 * the same "don't hit the DB on every request" benefit without that risk.
 */
export const getGalleryImages = unstable_cache(
  async (): Promise<GalleryItem[]> => {
    try {
      const rows = await db.galleryImage.findMany({
        orderBy: [{ sortOrder: 'asc' }, { createdAt: 'desc' }],
        select: { url: true, alt: true, category: true },
      })
      if (rows.length > 0) return rows
      console.warn('[gallery] GalleryImage table is empty — serving bundled photos.')
    } catch (err) {
      console.error('[gallery] Database read failed — serving bundled photos.', err)
    }
    return fallbackGallery
  },
  ['gallery-images'],
  { tags: [GALLERY_CACHE_TAG], revalidate: 60 }
)

/** Category filter tabs, derived from whatever is actually in the gallery. */
export function galleryCategories(images: GalleryItem[]): string[] {
  const seen: string[] = []
  for (const img of images) {
    if (img.category && !seen.includes(img.category)) seen.push(img.category)
  }
  return ['All', ...seen.sort((a, b) => a.localeCompare(b))]
}
