# Performance Optimization Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Cut page load time by compressing images, enabling ISR caching, lazy-loading below-fold sections, and skipping motion JS on mobile — then push to GitHub so Railway auto-deploys.

**Architecture:** Four independent changes applied in sequence: (1) compress source images in-place, (2) update Next.js config + homepage caching, (3) convert below-fold home sections to dynamic imports, (4) skip CustomCursor/ScrollProgress on touch devices. Each is a safe, isolated change.

**Tech Stack:** Next.js 14 App Router, `sips` (macOS), `next/dynamic`, Framer Motion, SQLite/Prisma on Railway.

## Global Constraints
- Keep all `.jpg` filenames unchanged — components reference these paths
- Do not change HeroSection — it must remain a static import with `priority` image
- Railway runs a persistent Node.js server (not serverless) — ISR with SQLite is safe
- Project root: `/Users/enochgartei/Documents/Codex/pk-landscaping-website`

---

## File Map

| File | Change |
|------|--------|
| `public/images/*.jpg` (30 files) | Compress in-place with `sips` |
| `next.config.mjs` | Add `formats`, `minimumCacheTTL`, `deviceSizes` |
| `app/page.tsx` | Remove `force-dynamic`, add `revalidate = 60`, convert imports to `next/dynamic` |
| `components/motion/CustomCursor.tsx` | Add touch-device early return |
| `components/motion/ScrollProgress.tsx` | Add touch-device early return |

---

### Task 1: Compress All Images

**Files:**
- Modify: `public/images/*.jpg` (30 files, in-place)

- [ ] **Step 1: Compress all JPEGs with sips**

Run from the project root:
```bash
cd /Users/enochgartei/Documents/Codex/pk-landscaping-website
for f in public/images/*.jpg; do
  sips -s formatOptions 60 "$f" --out "$f"
done
```
`-s formatOptions 60` sets JPEG quality to 60 (visually near-lossless for photos, typically 70-90% smaller).

- [ ] **Step 2: Verify compression worked**

```bash
du -sh public/images/
du -sh public/images/*.jpg | sort -rh | head -5
```
Expected: total drops from ~72MB to ~5-8MB; no file larger than ~400KB.

- [ ] **Step 3: Visually spot-check two images**

Open two of the largest before/after images in Preview to confirm quality is acceptable:
```bash
open public/images/landscape-planting-weed-barrier-fargo.jpg
open public/images/lawn-mowing-stripes-premium-fargo.jpg
```
If quality is unacceptable, re-run sips with quality 75 instead of 60.

- [ ] **Step 4: Commit**

```bash
git add public/images/
git commit -m "perf: compress 30 JPEGs from 72MB to ~6MB (sips quality 60)"
```

---

### Task 2: Next.js Config & Homepage Caching

**Files:**
- Modify: `next.config.mjs`
- Modify: `app/page.tsx`

- [ ] **Step 1: Update next.config.mjs**

Open `next.config.mjs`. Replace the entire `images` block:

Before:
```js
images: {
  remotePatterns: [
    { protocol: 'https', hostname: 'images.unsplash.com' },
    { protocol: 'https', hostname: 'plus.unsplash.com' },
  ],
},
```

After:
```js
images: {
  remotePatterns: [
    { protocol: 'https', hostname: 'images.unsplash.com' },
    { protocol: 'https', hostname: 'plus.unsplash.com' },
  ],
  formats: ['image/avif', 'image/webp'],
  minimumCacheTTL: 86400,
  deviceSizes: [640, 750, 828, 1080, 1200, 1920],
},
```

- [ ] **Step 2: Update app/page.tsx caching directive**

Open `app/page.tsx`. Replace line 22:

Before:
```ts
export const dynamic = 'force-dynamic'
```

After:
```ts
export const revalidate = 60
```

- [ ] **Step 3: Verify dev server still compiles**

```bash
# Kill existing dev server first if running, then:
cd /Users/enochgartei/Documents/Codex/pk-landscaping-website && npm run dev > /tmp/pk-dev.log 2>&1 &
sleep 6 && cat /tmp/pk-dev.log | tail -5
```
Expected: `✓ Ready` with no errors.

- [ ] **Step 4: Commit**

```bash
git add next.config.mjs app/page.tsx
git commit -m "perf: enable ISR (60s), add avif/webp formats, 24hr image cache TTL"
```

---

### Task 3: Lazy-Load Below-Fold Home Sections

**Files:**
- Modify: `app/page.tsx`

The homepage has 14 sections below HeroSection. Converting them to `next/dynamic` splits them into separate JS chunks that only load when needed. Client components (`'use client'`) get `ssr: false`; server components get default `ssr: true` with a loading placeholder so they still SSR but their JS is deferred.

**Which sections are client components (`'use client'`):**
- `ProcessSection` ✓
- `TestimonialsCarousel` ✓
- `DiscountBanner` ✓

**All others are server components.**

- [ ] **Step 1: Replace static imports with dynamic imports in app/page.tsx**

Replace the entire import block at the top of `app/page.tsx` (lines 1–20) with:

```ts
import Script from 'next/script'
import dynamic from 'next/dynamic'
import { db } from '@/lib/db'
import { localBusinessSchema } from '@/lib/seo'
import HeroSection from '@/components/home/HeroSection'
import SceneWrapper from '@/components/motion/SceneWrapper'

// Server components — SSR'd but JS deferred
const TrustStatsBar        = dynamic(() => import('@/components/home/TrustStatsBar'))
const ServicesSection      = dynamic(() => import('@/components/home/ServicesSection'))
const WhyChooseUs          = dynamic(() => import('@/components/home/WhyChooseUs'))
const BeforeAfterSection   = dynamic(() => import('@/components/home/BeforeAfterSection'))
const FeaturedProjects     = dynamic(() => import('@/components/home/FeaturedProjects'))
const ContactCTA           = dynamic(() => import('@/components/home/ContactCTA'))
const GoogleReviewsBanner  = dynamic(() => import('@/components/home/GoogleReviewsBanner'))
const MaintenancePlansSection = dynamic(() => import('@/components/home/MaintenancePlansSection'))
const ValuePropsSection    = dynamic(() => import('@/components/home/ValuePropsSection'))
const HomeBookingSection   = dynamic(() => import('@/components/home/HomeBookingSection'))
const ServiceAreasSection  = dynamic(() => import('@/components/home/ServiceAreasSection'))
const BlogPreview          = dynamic(() => import('@/components/home/BlogPreview'))

// Client components — skip SSR, load only on client
const ProcessSection       = dynamic(() => import('@/components/home/ProcessSection'), { ssr: false })
const TestimonialsCarousel = dynamic(() => import('@/components/home/TestimonialsCarousel'), { ssr: false })
const DiscountBanner       = dynamic(() => import('@/components/home/DiscountBanner'), { ssr: false })
```

- [ ] **Step 2: Verify page still renders correctly**

With dev server running, open `http://localhost:3000` and scroll through the full page. All 15 sections should appear. Check browser console for errors.

- [ ] **Step 3: Commit**

```bash
git add app/page.tsx
git commit -m "perf: lazy-load 14 below-fold sections with next/dynamic"
```

---

### Task 4: Skip Motion Components on Touch Devices

**Files:**
- Modify: `components/motion/CustomCursor.tsx`
- Modify: `components/motion/ScrollProgress.tsx`

The CustomCursor already returns `null` if `visible` is false (and never sets visible on touch), so it's already mostly a no-op. But all the Framer Motion hooks still run. Adding an early check eliminates the hook cost entirely by wrapping in a client-only conditional.

The correct pattern for 'use client' components is to use a `useState` initialized with the touch check, then return null before rendering motion elements.

- [ ] **Step 1: Update CustomCursor.tsx**

Replace the full contents of `components/motion/CustomCursor.tsx` with:

```tsx
'use client'
import { useEffect, useState } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

export default function CustomCursor() {
  const [isTouch, setIsTouch] = useState(true)
  const [hovering, setHovering] = useState(false)
  const [visible, setVisible] = useState(false)

  const rawX = useMotionValue(-100)
  const rawY = useMotionValue(-100)
  const dotX = useSpring(rawX, { stiffness: 500, damping: 30 })
  const dotY = useSpring(rawY, { stiffness: 500, damping: 30 })
  const ringX = useSpring(rawX, { stiffness: 200, damping: 22 })
  const ringY = useSpring(rawY, { stiffness: 200, damping: 22 })

  useEffect(() => {
    if (window.matchMedia('(pointer: coarse)').matches) return
    setIsTouch(false)

    const onMove = (e: MouseEvent) => {
      rawX.set(e.clientX)
      rawY.set(e.clientY)
      setVisible(true)
    }
    const onOver = (e: MouseEvent) => {
      const el = e.target as HTMLElement
      setHovering(!!el.closest('a, button, [role="button"], input, textarea, label'))
    }

    window.addEventListener('mousemove', onMove)
    window.addEventListener('mouseover', onOver)
    return () => {
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('mouseover', onOver)
    }
  }, [rawX, rawY])

  if (isTouch || !visible) return null

  return (
    <>
      <motion.div
        className="fixed z-[9999] pointer-events-none rounded-full bg-pk-500"
        style={{ x: dotX, y: dotY, translateX: '-50%', translateY: '-50%', width: 8, height: 8 }}
      />
      <motion.div
        className="fixed z-[9998] pointer-events-none rounded-full border border-pk-400"
        style={{ x: ringX, y: ringY, translateX: '-50%', translateY: '-50%' }}
        animate={{ width: hovering ? 44 : 0, height: hovering ? 44 : 0, opacity: hovering ? 0.7 : 0 }}
        transition={{ duration: 0.2, ease: 'easeOut' }}
      />
    </>
  )
}
```

- [ ] **Step 2: Update ScrollProgress.tsx**

Replace the full contents of `components/motion/ScrollProgress.tsx` with:

```tsx
'use client'
import { useEffect, useState } from 'react'
import { motion, useScroll } from 'framer-motion'

export default function ScrollProgress() {
  const [isTouch, setIsTouch] = useState(true)
  const { scrollYProgress } = useScroll()

  useEffect(() => {
    if (!window.matchMedia('(pointer: coarse)').matches) {
      setIsTouch(false)
    }
  }, [])

  if (isTouch) return null

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-0.5 bg-pk-500 z-[200] origin-left"
      style={{ scaleX: scrollYProgress }}
    />
  )
}
```

- [ ] **Step 3: Test on desktop and mobile viewport**

With dev server running:
1. On desktop (`http://localhost:3000`): verify custom cursor appears and scroll progress bar shows.
2. Open DevTools → Toggle device toolbar (mobile viewport): verify neither component renders (no cursor element, no progress bar in DOM).

- [ ] **Step 4: Commit**

```bash
git add components/motion/CustomCursor.tsx components/motion/ScrollProgress.tsx
git commit -m "perf: skip cursor and scroll-progress on touch/mobile devices"
```

---

### Task 5: Push to GitHub (Railway Auto-Deploy)

**Files:** None — git operation only.

- [ ] **Step 1: Confirm all 4 task commits are in place**

```bash
git log --oneline -6
```
Expected: see commits from Tasks 1-4 plus the design spec commit above them.

- [ ] **Step 2: Push to GitHub**

```bash
git push origin main
```

- [ ] **Step 3: Verify Railway picks up the deploy**

Railway auto-deploys on push to `main`. Check the Railway dashboard or run:
```bash
# If Railway CLI is installed:
railway status
```
Or watch the Railway dashboard at railway.app for the new deployment to go green.

---

## Expected Outcomes After Deploy
| Metric | Before | After |
|--------|--------|-------|
| Image total size | 72MB | ~6MB |
| Homepage TTFB (cold) | uncached DB hit every req | 60s ISR cache |
| Initial JS bundle | all 15 sections | hero + deferred chunks |
| Mobile cursor/progress JS | always loaded | skipped entirely |
| LCP estimate | 4–6s | 0.8–1.5s |
