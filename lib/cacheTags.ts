/**
 * Next data-cache tags.
 *
 * Public pages are rendered dynamically (Postgres is not reachable during the
 * Railway build) but their queries are cached. Admin mutations call
 * revalidateTag with these so edits show up immediately instead of waiting
 * out the 60s window.
 */
export const HOME_CONTENT_TAG = 'home-content'
export const GALLERY_CACHE_TAG = 'gallery-images'
