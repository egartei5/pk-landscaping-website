import { getGalleryImages, galleryCategories } from '@/lib/gallery'
import GalleryGrid from '@/components/gallery/GalleryGrid'

// Rendered per request (the database is not reachable during the Railway
// build), but the query itself is cached for 60s — see lib/gallery.ts.
export const dynamic = 'force-dynamic'

export default async function GalleryPage() {
  const images = await getGalleryImages()
  const categories = galleryCategories(images)

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
          <GalleryGrid images={images} categories={categories} />
        </div>
      </section>
    </>
  )
}
