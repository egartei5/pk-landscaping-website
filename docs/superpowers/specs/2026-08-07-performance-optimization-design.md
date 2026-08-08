# Performance Optimization & GitHub Deploy — Design Spec
**Date:** 2026-08-07  
**Status:** Approved

## Goal
Fix site slowness and deploy to Railway via GitHub push.

## Root Causes
| Issue | Impact |
|-------|--------|
| 30 JPEGs totaling 72MB (avg 2.4MB each) | Dominant — causes slow LCP and high memory |
| `force-dynamic` on homepage | No caching — every visitor hits SQLite |
| All 15 sections loaded upfront | Large JS bundle, slow TTI |
| CustomCursor/ScrollProgress on mobile | Wasted JS on touch devices |

---

## Section 1 — Image Compression
- Use `sips` (macOS built-in) to compress all 30 JPEGs in `public/images/` in-place
- Target: ≤300KB per image (from current 2–4MB)
- No format change — keep `.jpg` extension; Next.js Image serves WebP/AVIF to browsers automatically
- Expected result: 72MB → ~5MB total

## Section 2 — Caching & Next.js Config

**`app/page.tsx`**
- Remove `export const dynamic = 'force-dynamic'`
- Add `export const revalidate = 60` — Railway runs a persistent server (not serverless), SQLite is always available, ISR is safe

**`next.config.mjs`**  
Add to the `images` config:
```js
formats: ['image/avif', 'image/webp'],
minimumCacheTTL: 86400,  // 24hr cache for processed images
deviceSizes: [640, 750, 828, 1080, 1200, 1920],
```

## Section 3 — Lazy Load Below-Fold Sections

Convert all homepage sections **except HeroSection** to `next/dynamic` imports in `app/page.tsx`. Sections that are `'use client'` get `ssr: false`; pure server components get `ssr: true` with a loading fallback.

Sections to lazy-load:
- TrustStatsBar, ServicesSection, WhyChooseUs, ProcessSection
- TestimonialsCarousel, BeforeAfterSection, FeaturedProjects
- DiscountBanner, ContactCTA, GoogleReviewsBanner
- MaintenancePlansSection, ValuePropsSection, HomeBookingSection
- ServiceAreasSection, BlogPreview

## Section 4 — Mobile Optimizations

**`components/motion/CustomCursor.tsx`**  
Add at top of component:
```ts
const isTouchDevice = typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches
if (isTouchDevice) return null
```

**`components/motion/ScrollProgress.tsx`**  
Same touch device check — return null on mobile.

## Section 5 — Deploy
```bash
git add -A
git commit -m "perf: compress images, enable ISR, lazy-load sections, skip cursor on mobile"
git push origin main
```
Railway auto-deploys from `main` branch.

---

## Expected Outcomes
- **LCP**: from ~4-6s → ~0.8-1.2s (image compression alone)
- **JS bundle**: ~40% smaller initial load (lazy sections)
- **Homepage TTFB**: from uncached DB hit → 60s ISR cache
- **Mobile**: no wasted cursor/progress JS
