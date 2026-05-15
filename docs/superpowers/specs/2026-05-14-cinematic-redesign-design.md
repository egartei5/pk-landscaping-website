# PK Landscaping — Cinematic Redesign Spec
**Date:** 2026-05-14
**Stack:** Next.js 14, TypeScript, Tailwind CSS, Framer Motion

---

## Goal

Rebuild the homepage into a full-screen, scroll-jacking cinematic experience. Every section is a scene. The site should feel like a high-end agency built it — dark, dramatic, unmistakably premium.

---

## Approach

CSS Scroll Snap (mandatory on desktop, proximity on mobile) combined with Framer Motion `whileInView` animations. No new dependencies. The scroll snap locks each scene to the viewport while its entrance sequence plays.

---

## Page Architecture

The current 13 stacked sections are rebuilt as 10 full-screen scenes:

| # | Scene | Key Moment |
|---|-------|------------|
| 1 | Hero | Text materializes word by word over full-screen photo |
| 2 | Stats | Numbers race up from zero on dark background |
| 3 | Services | Cards emerge from black, staggered left-right |
| 4 | Why Choose Us | Split screen — photo curtain-reveals on left, text on right |
| 5 | Process | Steps draw themselves in sequence with connecting lines |
| 6 | Testimonials | Marquee enters from darkness with dramatic fade |
| 7 | Before/After | Side-by-side curtain reveal |
| 8 | Projects Gallery | Images blink into existence with stagger |
| 9 | Discount | Bold text slams in, animated gradient background |
| 10 | Contact CTA | Final scene, full-screen photo, one big CTA |

A green progress bar runs along the top of the viewport tracking scroll position across all scenes.

---

## Animation System

All primitives live in `components/motion/`. Each is a standalone component — reusable, not coupled to any scene.

### `SceneWrapper`
- Full viewport height (`min-h-screen`)
- `scroll-snap-align: start`
- `overflow: hidden`
- Accepts `delay` prop for staggering child entrance
- Wraps every scene

### `TextReveal`
- Splits text into words
- Each word wrapped in `overflow-hidden` container
- Word slides up from `y: 40` to `y: 0` with `opacity: 0 → 1`
- Stagger: 0.08s per word
- Props: `text`, `className`, `delay`, `as` (h1/h2/p)

### `ImageReveal`
- Image sits inside a relative container
- A `motion.div` overlay (bg-pk-950) covers the image
- On enter: overlay animates `scaleX: 1 → 0`, `transformOrigin: left`
- Duration: 0.9s, ease: `[0.76, 0, 0.24, 1]` (cubic sharp)
- Result: curtain wipes left to expose the photo

### `FadeUpStagger`
- Wraps children with staggered `y: 30 → 0`, `opacity: 0 → 1`
- Stagger: 0.08s between children
- Used for lists, badge rows, card grids

### `LineDrawIn`
- `motion.div` with `height: 1px`, `bg: pk-700`
- Animates `scaleX: 0 → 1`, `transformOrigin: left`
- Duration: 0.6s
- Used as section dividers and accent lines

### `CountUp`
- Rebuilt from scratch — uses Framer Motion `useMotionValue` + `useTransform`
- Animates from 0 to target over 2s with `easeOut`
- Only fires when scene enters viewport

### Custom Cursor
- Small green dot (8px, `bg-pk-500`)
- Follows mouse with spring physics (`stiffness: 400, damping: 28`)
- Expands to 40px ring on hover over links/buttons
- Desktop only — hidden on touch devices
- Lives in root layout, rendered once

---

## Visual Design

### Color
- **Base:** `pk-950` (#0a1a0b) — near-black dark green, all scenes
- **Accent:** `pk-500` (#4caf50), `pk-400` (#6fcf73)
- **Text:** white for headlines, `gray-300` for body, `gray-500` for labels
- **No white or light sections** — entire site stays dark

### Lighting / Atmosphere
- Each scene has a radial gradient glow (`pk-500` at 8–12% opacity)
- Glow position shifts per scene (top-left → center → bottom-right → etc.)
- Creates impression of a single light source traveling down the page
- Implemented as an absolutely positioned `div` with Tailwind arbitrary value `bg-[radial-gradient(ellipse_at_center,_rgba(76,175,80,0.10)_0%,_transparent_70%)]` behind content

### Grain Texture
- SVG data URI noise pattern as a `before:` pseudo-element on `SceneWrapper`
- Implemented via `globals.css` class `.scene-grain` using `background-image: url("data:image/svg+xml,...")`
- Opacity ~4% — visible on close inspection, invisible at a glance
- Adds depth and prevents flat dark look

### Typography
- Hero h1: `text-8xl sm:text-9xl`, `font-black`, `tracking-tighter`
- Section h2: `text-5xl sm:text-7xl`, `font-black`, `tracking-tight`
- One key word per headline in `text-pk-400` (green accent)
- Section labels: `text-xs`, `tracking-widest`, `uppercase`, `text-pk-500`
- Body: `text-gray-300`, `text-lg`, `leading-relaxed`

### Decorative Elements
- Thin horizontal `LineDrawIn` rules under section labels
- Large muted section numbers (`01`, `02`...) in `text-pk-900` at `text-[120px]` behind content
- Floating badge cards (years in business, rating) with `backdrop-blur` and `border-pk-700`

---

## Scene-by-Scene Detail

### Scene 1 — Hero
- Full-screen background image with `ImageReveal` (curtain wipes left on load)
- Overlay: `bg-gradient-to-b from-pk-950/50 via-pk-950/70 to-pk-950`
- `TextReveal` on h1: "Transforming Fargo Properties Into Beautiful Outdoor Spaces"
- "Beautiful Outdoor Spaces" in `text-pk-400`
- Subtext `FadeUpStagger` after headline completes
- CTA buttons animate up last
- Trust badges row fades in final
- Scroll indicator: animated chevron with text "Scroll to explore"

### Scene 2 — Stats
- Dark scene, green radial glow center
- Large section number `01` ghost text behind
- 4 stats in a 2×2 grid (mobile) or row (desktop)
- Each stat: giant `CountUp` number + label fades up
- Thin `LineDrawIn` separators between stats on desktop

### Scene 3 — Services
- Section label + `TextReveal` heading top
- 6 service cards in 2×3 grid
- `FadeUpStagger` — cards enter left-to-right, top-to-bottom
- Each card: `ImageReveal` on the card image
- Hover: card lifts with green glow shadow

### Scene 4 — Why Choose Us
- Left: `ImageReveal` full-height photo
- Right: `TextReveal` headline, paragraphs `FadeUpStagger`, checklist items stagger
- Floating badge (3+ Years) enters with spring animation from bottom-left of image

### Scene 5 — Process
- Horizontal stepper on desktop, vertical on mobile
- Steps enter one by one with 0.15s stagger
- Connecting line draws between steps using `LineDrawIn`
- Each circle pulses with green glow when it enters

### Scene 6 — Testimonials
- Section header `TextReveal`
- `LineDrawIn` separator
- Marquee rows fade in from below
- Background has subtle green glow bottom-left

### Scene 7 — Before/After
- Each before/after card uses `ImageReveal` on both panels
- After panel reveals with slight delay after before
- Cards stagger with 0.1s between them

### Scene 8 — Projects Gallery
- Heading `TextReveal`
- Asymmetric grid: each image enters with `ImageReveal` staggered
- Hover: subtle scale + green border glow

### Scene 9 — Discount
- Animated gradient background (already built, enhanced)
- Headline "Save On Your First Service" slams in with scale: `1.2 → 1`
- Discount cards bounce in from below with spring physics

### Scene 10 — Contact CTA
- Full-screen background photo with `ImageReveal`
- Deep overlay: `bg-pk-950/90`
- Single massive `TextReveal` headline
- One primary CTA button scales in
- Phone number and hours fade below

---

## File Changes

### New Files
- `components/motion/SceneWrapper.tsx`
- `components/motion/TextReveal.tsx`
- `components/motion/ImageReveal.tsx`
- `components/motion/FadeUpStagger.tsx`
- `components/motion/LineDrawIn.tsx`
- `components/motion/CountUp.tsx` (replaces `components/ui/AnimatedCounter.tsx`)
- `components/motion/CustomCursor.tsx`
- `components/motion/ScrollProgress.tsx`

### Modified Files
- `app/layout.tsx` — add `CustomCursor` + `ScrollProgress`
- `app/globals.css` — add noise texture, remove light section classes
- `app/page.tsx` — restructure with `SceneWrapper` per scene
- All 10 home section components — integrate motion primitives
- `tailwind.config.ts` — add `text-8xl`, `text-9xl` if not present, snap utilities

### Removed Patterns
- All `bg-white` and `bg-pk-off-white` sections on homepage
- `AnimatedCounter` (replaced by `CountUp`)
- Manual carousel logic (testimonials already marquee)

### Out of Scope
- Header and Footer styling unchanged — header already dark (`bg-pk-900/97`), footer stays as-is
- Inner pages (services, about, blog, etc.) unchanged — this spec covers homepage only
- Admin panel unchanged

---

## Mobile Behavior

- `scroll-snap-type: y mandatory` on desktop (≥768px)
- `scroll-snap-type: y proximity` on mobile — snaps but doesn't trap
- Custom cursor disabled on touch devices
- Typography scales down but stays dramatic
- Animations play — same system, shorter durations (150ms vs 200ms)

---

## Accessibility

- All animations respect `prefers-reduced-motion` — fallback to instant `opacity` fade
- Focus states preserved on all interactive elements
- Screen reader content unaffected — animations are visual only
- Scroll snap does not prevent keyboard navigation
