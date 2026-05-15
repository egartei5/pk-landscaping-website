# Cinematic Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rebuild the PK Landscaping homepage into a full-screen cinematic scroll-snap experience with dramatic Framer Motion animations on every scene.

**Architecture:** CSS `scroll-snap-type: y mandatory` on `html` makes each `SceneWrapper` section a snap target. Framer Motion `whileInView` drives entrance animations per scene. Eight reusable motion primitives in `components/motion/` serve all ten scenes.

**Tech Stack:** Next.js 14 App Router, TypeScript, Tailwind CSS v3, Framer Motion 12

---

## File Map

### New Files
| File | Responsibility |
|------|---------------|
| `components/motion/SceneWrapper.tsx` | Full-screen scroll-snap section container |
| `components/motion/TextReveal.tsx` | Word-by-word cinematic text entrance |
| `components/motion/ImageReveal.tsx` | Curtain-wipe photo reveal |
| `components/motion/FadeUpStagger.tsx` | Staggered fade-up children container + item |
| `components/motion/LineDrawIn.tsx` | Horizontal line that draws itself in |
| `components/motion/CountUp.tsx` | Number counter animating from 0 to target |
| `components/motion/CustomCursor.tsx` | Green dot cursor with hover ring expansion |
| `components/motion/ScrollProgress.tsx` | Fixed green progress bar at top of viewport |

### Modified Files
| File | Change |
|------|--------|
| `tailwind.config.ts` | Add `text-8xl`, `text-9xl`, snap utilities already present in Tailwind v3 |
| `app/globals.css` | Scroll snap on html, grain texture class, hide default cursor |
| `app/layout.tsx` | Mount `CustomCursor` + `ScrollProgress` |
| `app/page.tsx` | Wrap each section in `SceneWrapper` |
| `components/home/HeroSection.tsx` | Full cinematic rebuild — Scene 1 |
| `components/home/TrustStatsBar.tsx` | Dark scene with `CountUp` — Scene 2 |
| `components/home/ServicesSection.tsx` | `FadeUpStagger` cards — Scene 3 |
| `components/home/WhyChooseUs.tsx` | Split `ImageReveal` — Scene 4 |
| `components/home/ProcessSection.tsx` | Staggered stepper + `LineDrawIn` — Scene 5 |
| `components/home/TestimonialsCarousel.tsx` | Dramatic entrance — Scene 6 |
| `components/home/BeforeAfterSection.tsx` | `ImageReveal` per panel — Scene 7 |
| `components/home/FeaturedProjects.tsx` | Staggered `ImageReveal` grid — Scene 8 |
| `components/home/DiscountBanner.tsx` | Scale-slam entrance — Scene 9 |
| `components/home/ContactCTA.tsx` | Final full-screen scene — Scene 10 |

---

## Task 1: Tailwind + Global CSS Foundation

**Files:**
- Modify: `tailwind.config.ts`
- Modify: `app/globals.css`

- [ ] **Step 1: Add extended font sizes to tailwind.config.ts**

```ts
// tailwind.config.ts — add inside theme.extend:
fontSize: {
  '8xl': ['6rem', { lineHeight: '1' }],
  '9xl': ['8rem', { lineHeight: '1' }],
},
```

Full updated file:
```ts
import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'pk-950': '#0a1a0b',
        'pk-900': '#0f2910',
        'pk-800': '#1a3d1a',
        'pk-700': '#2a5a2a',
        'pk-500': '#4caf50',
        'pk-400': '#6fcf73',
        'pk-off-white': '#f8f8f6',
        'pk-earth': '#f0ede8',
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
        heading: ['var(--font-montserrat)', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        '8xl': ['6rem', { lineHeight: '1' }],
        '9xl': ['8rem', { lineHeight: '1' }],
      },
      animation: {
        'fade-up': 'fadeUp 0.6s ease-out forwards',
        'count-up': 'countUp 1s ease-out forwards',
        'marquee': 'marquee 35s linear infinite',
        'marquee-reverse': 'marqueeReverse 35s linear infinite',
      },
      keyframes: {
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(24px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        marqueeReverse: {
          '0%': { transform: 'translateX(-50%)' },
          '100%': { transform: 'translateX(0)' },
        },
      },
    },
  },
  plugins: [],
}

export default config
```

- [ ] **Step 2: Update globals.css with scroll snap, grain texture, and cursor override**

```css
/* app/globals.css — full replacement */
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  html {
    scroll-behavior: smooth;
    scroll-snap-type: y mandatory;
  }

  /* Hide default cursor site-wide — custom cursor replaces it */
  * {
    cursor: none !important;
  }

  h1, h2, h3, h4, h5, h6 {
    @apply font-heading;
  }
}

@layer components {
  .section-label {
    @apply inline-flex items-center gap-2 text-pk-500 font-heading font-bold text-xs tracking-widest uppercase mb-3;
  }
  .btn-primary {
    @apply bg-pk-500 hover:bg-pk-400 text-white font-bold px-6 py-3 rounded-lg transition-all duration-200 shadow-lg hover:-translate-y-0.5 active:translate-y-0;
  }
  .btn-outline {
    @apply border border-white/30 hover:border-white/60 text-white font-medium px-6 py-3 rounded-lg transition-all duration-200 hover:bg-white/5;
  }
  .btn-outline-green {
    @apply border border-pk-500 text-pk-500 hover:bg-pk-500 hover:text-white font-bold px-6 py-3 rounded-lg transition-all duration-200;
  }
  .card-dark {
    @apply bg-pk-800 border border-pk-700 rounded-xl p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_8px_32px_rgba(76,175,80,0.15)] hover:border-pk-500/50;
  }

  /* Grain texture overlay — add as a child div inside scenes */
  .scene-grain {
    @apply absolute inset-0 pointer-events-none z-0 opacity-[0.04];
    background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E");
    background-size: 256px 256px;
  }
}

@layer utilities {
  @keyframes gradient-shift {
    0%, 100% { background-position: 0% 50%; }
    50% { background-position: 100% 50%; }
  }
  .animate-gradient {
    background-size: 200% 200%;
    animation: gradient-shift 4s ease infinite;
  }
}
```

- [ ] **Step 3: Verify type check passes**

```bash
cd "/Volumes/Extreme SSD/PK Landscapind/pk-landscaping" && npx tsc --noEmit
```
Expected: no output (no errors)

- [ ] **Step 4: Commit**

```bash
git add tailwind.config.ts app/globals.css
git commit -m "feat: add scroll snap foundation and grain texture to globals"
```

---

## Task 2: SceneWrapper Component

**Files:**
- Create: `components/motion/SceneWrapper.tsx`

- [ ] **Step 1: Create the component**

```tsx
// components/motion/SceneWrapper.tsx
import { ReactNode } from 'react'

interface SceneWrapperProps {
  children: ReactNode
  className?: string
  id?: string
}

export default function SceneWrapper({ children, className = '', id }: SceneWrapperProps) {
  return (
    <section
      id={id}
      className={`relative min-h-screen flex flex-col snap-start overflow-hidden bg-pk-950 ${className}`}
    >
      {/* Grain texture */}
      <div className="scene-grain" />
      {children}
    </section>
  )
}
```

- [ ] **Step 2: Type check**

```bash
cd "/Volumes/Extreme SSD/PK Landscapind/pk-landscaping" && npx tsc --noEmit
```
Expected: no errors

- [ ] **Step 3: Commit**

```bash
git add components/motion/SceneWrapper.tsx
git commit -m "feat: add SceneWrapper component"
```

---

## Task 3: TextReveal Component

**Files:**
- Create: `components/motion/TextReveal.tsx`

- [ ] **Step 1: Create the component**

```tsx
// components/motion/TextReveal.tsx
'use client'
import { motion, useReducedMotion } from 'framer-motion'
import { ElementType } from 'react'

interface TextRevealProps {
  text: string
  className?: string
  delay?: number
  as?: ElementType
}

export default function TextReveal({ text, className = '', delay = 0, as: Tag = 'h2' }: TextRevealProps) {
  const shouldReduce = useReducedMotion()
  const words = text.split(' ')

  return (
    <Tag className={`overflow-hidden ${className}`}>
      <span className="flex flex-wrap gap-x-[0.3em] gap-y-1">
        {words.map((word, i) => (
          <span key={i} className="overflow-hidden inline-block">
            <motion.span
              className="inline-block"
              initial={{ y: shouldReduce ? 0 : 50, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true, margin: '-5%' }}
              transition={{
                delay: delay + i * 0.08,
                duration: 0.7,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              {word}
            </motion.span>
          </span>
        ))}
      </span>
    </Tag>
  )
}
```

- [ ] **Step 2: Type check**

```bash
cd "/Volumes/Extreme SSD/PK Landscapind/pk-landscaping" && npx tsc --noEmit
```
Expected: no errors

- [ ] **Step 3: Commit**

```bash
git add components/motion/TextReveal.tsx
git commit -m "feat: add TextReveal word-by-word animation component"
```

---

## Task 4: ImageReveal Component

**Files:**
- Create: `components/motion/ImageReveal.tsx`

- [ ] **Step 1: Create the component**

```tsx
// components/motion/ImageReveal.tsx
'use client'
import { motion, useReducedMotion } from 'framer-motion'
import { ReactNode } from 'react'

interface ImageRevealProps {
  children: ReactNode
  className?: string
  delay?: number
}

export default function ImageReveal({ children, className = '', delay = 0 }: ImageRevealProps) {
  const shouldReduce = useReducedMotion()

  return (
    <div className={`relative overflow-hidden ${className}`}>
      {children}
      <motion.div
        className="absolute inset-0 bg-pk-950 z-10"
        style={{ transformOrigin: 'left' }}
        initial={{ scaleX: 1 }}
        whileInView={{ scaleX: 0 }}
        viewport={{ once: true, margin: '-5%' }}
        transition={{
          delay: shouldReduce ? 0 : delay,
          duration: shouldReduce ? 0.01 : 0.9,
          ease: [0.76, 0, 0.24, 1],
        }}
      />
    </div>
  )
}
```

- [ ] **Step 2: Type check**

```bash
cd "/Volumes/Extreme SSD/PK Landscapind/pk-landscaping" && npx tsc --noEmit
```
Expected: no errors

- [ ] **Step 3: Commit**

```bash
git add components/motion/ImageReveal.tsx
git commit -m "feat: add ImageReveal curtain-wipe component"
```

---

## Task 5: FadeUpStagger Component

**Files:**
- Create: `components/motion/FadeUpStagger.tsx`

- [ ] **Step 1: Create the component**

```tsx
// components/motion/FadeUpStagger.tsx
'use client'
import { motion, useReducedMotion } from 'framer-motion'
import { ReactNode } from 'react'

interface FadeUpStaggerProps {
  children: ReactNode
  className?: string
  delay?: number
  stagger?: number
}

interface FadeUpItemProps {
  children: ReactNode
  className?: string
}

const containerVariants = {
  hidden: {},
  visible: (stagger: number) => ({
    transition: { staggerChildren: stagger },
  }),
}

const itemVariants = {
  hidden: { y: 30, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
}

const itemReducedVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.3 } },
}

export function FadeUpItem({ children, className = '' }: FadeUpItemProps) {
  const shouldReduce = useReducedMotion()
  return (
    <motion.div variants={shouldReduce ? itemReducedVariants : itemVariants} className={className}>
      {children}
    </motion.div>
  )
}

export default function FadeUpStagger({
  children,
  className = '',
  delay = 0,
  stagger = 0.08,
}: FadeUpStaggerProps) {
  return (
    <motion.div
      className={className}
      variants={containerVariants}
      custom={stagger}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-5%' }}
      transition={{ delayChildren: delay }}
    >
      {children}
    </motion.div>
  )
}
```

- [ ] **Step 2: Type check**

```bash
cd "/Volumes/Extreme SSD/PK Landscapind/pk-landscaping" && npx tsc --noEmit
```
Expected: no errors

- [ ] **Step 3: Commit**

```bash
git add components/motion/FadeUpStagger.tsx
git commit -m "feat: add FadeUpStagger component with FadeUpItem"
```

---

## Task 6: LineDrawIn Component

**Files:**
- Create: `components/motion/LineDrawIn.tsx`

- [ ] **Step 1: Create the component**

```tsx
// components/motion/LineDrawIn.tsx
'use client'
import { motion, useReducedMotion } from 'framer-motion'

interface LineDrawInProps {
  className?: string
  delay?: number
  color?: string
}

export default function LineDrawIn({ className = '', delay = 0, color = 'bg-pk-700' }: LineDrawInProps) {
  const shouldReduce = useReducedMotion()

  return (
    <motion.div
      className={`h-px ${color} ${className}`}
      style={{ transformOrigin: 'left' }}
      initial={{ scaleX: 0 }}
      whileInView={{ scaleX: 1 }}
      viewport={{ once: true, margin: '-5%' }}
      transition={{
        delay: shouldReduce ? 0 : delay,
        duration: shouldReduce ? 0.01 : 0.7,
        ease: [0.22, 1, 0.36, 1],
      }}
    />
  )
}
```

- [ ] **Step 2: Type check**

```bash
cd "/Volumes/Extreme SSD/PK Landscapind/pk-landscaping" && npx tsc --noEmit
```
Expected: no errors

- [ ] **Step 3: Commit**

```bash
git add components/motion/LineDrawIn.tsx
git commit -m "feat: add LineDrawIn animated divider component"
```

---

## Task 7: CountUp Component

**Files:**
- Create: `components/motion/CountUp.tsx`

- [ ] **Step 1: Create the component**

```tsx
// components/motion/CountUp.tsx
'use client'
import { useEffect, useRef, useState } from 'react'
import { useInView, useReducedMotion } from 'framer-motion'

interface CountUpProps {
  to: number
  duration?: number
  prefix?: string
  suffix?: string
  className?: string
}

export default function CountUp({
  to,
  duration = 2,
  prefix = '',
  suffix = '',
  className = '',
}: CountUpProps) {
  const [value, setValue] = useState(0)
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, margin: '-5%' })
  const shouldReduce = useReducedMotion()

  useEffect(() => {
    if (!inView) return
    if (shouldReduce) {
      setValue(to)
      return
    }
    const start = performance.now()
    const tick = (now: number) => {
      const elapsed = (now - start) / 1000
      const progress = Math.min(elapsed / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setValue(Math.round(eased * to))
      if (progress < 1) requestAnimationFrame(tick)
    }
    requestAnimationFrame(tick)
  }, [inView, to, duration, shouldReduce])

  return (
    <span ref={ref} className={className}>
      {prefix}{value}{suffix}
    </span>
  )
}
```

- [ ] **Step 2: Type check**

```bash
cd "/Volumes/Extreme SSD/PK Landscapind/pk-landscaping" && npx tsc --noEmit
```
Expected: no errors

- [ ] **Step 3: Commit**

```bash
git add components/motion/CountUp.tsx
git commit -m "feat: add CountUp animated number component"
```

---

## Task 8: CustomCursor Component

**Files:**
- Create: `components/motion/CustomCursor.tsx`

- [ ] **Step 1: Create the component**

```tsx
// components/motion/CustomCursor.tsx
'use client'
import { useEffect, useState } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

export default function CustomCursor() {
  const [hovering, setHovering] = useState(false)
  const [visible, setVisible] = useState(false)

  const rawX = useMotionValue(-100)
  const rawY = useMotionValue(-100)

  const dotX = useSpring(rawX, { stiffness: 500, damping: 30 })
  const dotY = useSpring(rawY, { stiffness: 500, damping: 30 })
  const ringX = useSpring(rawX, { stiffness: 200, damping: 22 })
  const ringY = useSpring(rawY, { stiffness: 200, damping: 22 })

  useEffect(() => {
    if (typeof window === 'undefined') return
    // Disable on touch devices
    if (window.matchMedia('(pointer: coarse)').matches) return

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

  if (!visible) return null

  return (
    <>
      {/* Primary dot */}
      <motion.div
        className="fixed z-[9999] pointer-events-none rounded-full bg-pk-500"
        style={{
          x: dotX,
          y: dotY,
          translateX: '-50%',
          translateY: '-50%',
          width: 8,
          height: 8,
        }}
      />
      {/* Hover ring */}
      <motion.div
        className="fixed z-[9998] pointer-events-none rounded-full border border-pk-400"
        style={{
          x: ringX,
          y: ringY,
          translateX: '-50%',
          translateY: '-50%',
        }}
        animate={{
          width: hovering ? 44 : 0,
          height: hovering ? 44 : 0,
          opacity: hovering ? 0.7 : 0,
        }}
        transition={{ duration: 0.2, ease: 'easeOut' }}
      />
    </>
  )
}
```

- [ ] **Step 2: Type check**

```bash
cd "/Volumes/Extreme SSD/PK Landscapind/pk-landscaping" && npx tsc --noEmit
```
Expected: no errors

- [ ] **Step 3: Commit**

```bash
git add components/motion/CustomCursor.tsx
git commit -m "feat: add CustomCursor with spring physics and hover ring"
```

---

## Task 9: ScrollProgress + Update layout.tsx

**Files:**
- Create: `components/motion/ScrollProgress.tsx`
- Modify: `app/layout.tsx`

- [ ] **Step 1: Create ScrollProgress**

```tsx
// components/motion/ScrollProgress.tsx
'use client'
import { motion, useScroll } from 'framer-motion'

export default function ScrollProgress() {
  const { scrollYProgress } = useScroll()

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-0.5 bg-pk-500 z-[200] origin-left"
      style={{ scaleX: scrollYProgress }}
    />
  )
}
```

- [ ] **Step 2: Read current layout.tsx**

Read `app/layout.tsx` in full before editing.

- [ ] **Step 3: Add CustomCursor and ScrollProgress to layout.tsx**

```tsx
// app/layout.tsx — add these two imports at the top alongside existing imports:
import CustomCursor from '@/components/motion/CustomCursor'
import ScrollProgress from '@/components/motion/ScrollProgress'
```

Then inside the returned JSX, add both components as the first children inside `<body>`:
```tsx
<body className={...}>
  <CustomCursor />
  <ScrollProgress />
  {/* existing content: AnnouncementBar, Header, main, Footer, etc. */}
</body>
```

- [ ] **Step 4: Type check**

```bash
cd "/Volumes/Extreme SSD/PK Landscapind/pk-landscaping" && npx tsc --noEmit
```
Expected: no errors

- [ ] **Step 5: Start dev server and verify cursor + progress bar appear**

```bash
cd "/Volumes/Extreme SSD/PK Landscapind/pk-landscaping" && npm run dev
```

Open http://localhost:3000 — you should see a green dot following your mouse and a green progress bar at the top.

- [ ] **Step 6: Commit**

```bash
git add components/motion/ScrollProgress.tsx app/layout.tsx
git commit -m "feat: add CustomCursor and ScrollProgress to layout"
```

---

## Task 10: Update page.tsx — Wrap Scenes

**Files:**
- Modify: `app/page.tsx`

- [ ] **Step 1: Add SceneWrapper import and wrap each section**

```tsx
// app/page.tsx — full replacement
export const dynamic = 'force-dynamic'

import Script from 'next/script'
import { db } from '@/lib/db'
import { localBusinessSchema } from '@/lib/seo'
import SceneWrapper from '@/components/motion/SceneWrapper'
import HeroSection from '@/components/home/HeroSection'
import TrustStatsBar from '@/components/home/TrustStatsBar'
import ServicesSection from '@/components/home/ServicesSection'
import WhyChooseUs from '@/components/home/WhyChooseUs'
import ProcessSection from '@/components/home/ProcessSection'
import TestimonialsCarousel from '@/components/home/TestimonialsCarousel'
import BeforeAfterSection from '@/components/home/BeforeAfterSection'
import FeaturedProjects from '@/components/home/FeaturedProjects'
import DiscountBanner from '@/components/home/DiscountBanner'
import ContactCTA from '@/components/home/ContactCTA'
import HomeBookingSection from '@/components/home/HomeBookingSection'
import BlogPreview from '@/components/home/BlogPreview'
import ValuePropsSection from '@/components/home/ValuePropsSection'
import ServiceAreasSection from '@/components/home/ServiceAreasSection'

export const revalidate = 3600

export default async function HomePage() {
  const [testimonials, posts] = await Promise.all([
    db.testimonial.findMany({ where: { published: true }, orderBy: { date: 'desc' } }),
    db.blogPost.findMany({ where: { published: true }, orderBy: { publishedAt: 'desc' }, take: 3 }),
  ])

  return (
    <>
      <Script id="local-business-schema" type="application/ld+json" strategy="beforeInteractive">
        {JSON.stringify(localBusinessSchema())}
      </Script>

      {/* Scene 1 — Hero: no SceneWrapper, hero manages its own full-screen */}
      <HeroSection />

      {/* Scene 2 — Stats */}
      <SceneWrapper id="stats">
        <TrustStatsBar />
      </SceneWrapper>

      {/* Scene 3 — Services */}
      <SceneWrapper id="services">
        <ServicesSection />
      </SceneWrapper>

      {/* Scene 4 — Why Choose Us */}
      <SceneWrapper id="why">
        <WhyChooseUs />
      </SceneWrapper>

      {/* Scene 5 — Process */}
      <SceneWrapper id="process">
        <ProcessSection />
      </SceneWrapper>

      {/* Scene 6 — Testimonials */}
      <SceneWrapper id="testimonials">
        <TestimonialsCarousel testimonials={testimonials} />
      </SceneWrapper>

      {/* Scene 7 — Before/After */}
      <SceneWrapper id="before-after">
        <BeforeAfterSection />
      </SceneWrapper>

      {/* Scene 8 — Projects */}
      <SceneWrapper id="projects">
        <FeaturedProjects />
      </SceneWrapper>

      {/* Scene 9 — Discount */}
      <SceneWrapper id="discount" className="bg-transparent">
        <DiscountBanner />
      </SceneWrapper>

      {/* Scene 10 — Contact */}
      <SceneWrapper id="contact">
        <ContactCTA />
      </SceneWrapper>

      {/* Non-snap supplementary sections */}
      <ValuePropsSection />
      <HomeBookingSection />
      <ServiceAreasSection />
      <BlogPreview posts={posts} />
    </>
  )
}
```

Note: `HeroSection` manages its own `min-h-screen snap-start` since it has the parallax background that spans the full viewport. Update `HeroSection` in Task 11 to add `snap-start` to its `<section>` element.

- [ ] **Step 2: Type check**

```bash
cd "/Volumes/Extreme SSD/PK Landscapind/pk-landscaping" && npx tsc --noEmit
```
Expected: no errors

- [ ] **Step 3: Commit**

```bash
git add app/page.tsx
git commit -m "feat: wrap homepage sections in SceneWrapper snap containers"
```

---

## Task 11: Rebuild HeroSection (Scene 1)

**Files:**
- Modify: `components/home/HeroSection.tsx`

- [ ] **Step 1: Rebuild HeroSection with cinematic animations**

```tsx
// components/home/HeroSection.tsx
'use client'
import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { Phone, ChevronDown, Shield, Star, Clock, BadgeCheck } from 'lucide-react'
import TextReveal from '@/components/motion/TextReveal'
import ImageReveal from '@/components/motion/ImageReveal'
import FadeUpStagger, { FadeUpItem } from '@/components/motion/FadeUpStagger'

const trustBadges = [
  { icon: BadgeCheck, text: 'Locally Owned' },
  { icon: Star, text: 'Free Estimates' },
  { icon: Shield, text: 'Insured & Bonded' },
  { icon: Clock, text: 'Fast Response' },
]

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden snap-start bg-pk-950">
      {/* Background image with curtain reveal */}
      <ImageReveal className="absolute inset-0 scale-105">
        <Image
          src="/images/lawn-mowing-stripes-premium-fargo.jpg"
          alt="Premium lawn mowing with perfect stripes by PK Landscaping in Fargo ND"
          fill
          priority
          className="object-cover object-center"
          sizes="100vw"
        />
      </ImageReveal>

      {/* Dark gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-pk-950/40 via-pk-950/65 to-pk-950/95 z-[1]" />

      {/* Radial glow — top center */}
      <div className="absolute inset-0 z-[1] bg-[radial-gradient(ellipse_60%_50%_at_50%_0%,rgba(76,175,80,0.12)_0%,transparent_70%)]" />

      {/* Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 text-center pt-20">
        {/* Rating label */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.1, duration: 0.6 }}
          className="inline-flex items-center gap-2 mb-8"
        >
          <div className="flex gap-0.5">
            {[...Array(5)].map((_, i) => (
              <Star key={i} size={11} className="text-yellow-400 fill-yellow-400" />
            ))}
          </div>
          <span className="text-pk-400 font-heading font-bold text-xs tracking-widest uppercase">
            Fargo-Moorhead&apos;s Top-Rated Landscaping Company
          </span>
        </motion.div>

        {/* Giant cinematic headline */}
        <TextReveal
          text="Transforming Fargo Properties Into Beautiful Outdoor Spaces"
          as="h1"
          delay={1.2}
          className="font-heading font-black text-white text-5xl sm:text-7xl lg:text-8xl leading-none tracking-tighter mb-8"
        />

        {/* Subtext */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2.2, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="text-gray-300 text-lg sm:text-xl max-w-2xl mx-auto mb-10 leading-relaxed"
        >
          Lawn care, snow removal, paver installation, tree services & more — serving Fargo, Moorhead, and surrounding communities.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2.5, duration: 0.6 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12"
        >
          <Link href="/contact" className="btn-primary text-base px-10 py-4 w-full sm:w-auto font-bold text-lg">
            Get a Free Estimate →
          </Link>
          <a
            href="tel:+12189791154"
            className="btn-outline text-base px-10 py-4 w-full sm:w-auto flex items-center justify-center gap-2 font-bold"
          >
            <Phone size={16} /> (218) 979-1154
          </a>
        </motion.div>

        {/* Trust badges */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.8, duration: 0.6 }}
          className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3"
        >
          {trustBadges.map(({ icon: Icon, text }) => (
            <div key={text} className="flex items-center gap-2 text-gray-400 text-sm">
              <Icon size={14} className="text-pk-400" />
              <span className="font-medium">{text}</span>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 2.5, ease: 'easeInOut' }}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 text-gray-500"
      >
        <span className="text-xs tracking-widest uppercase font-medium">Scroll</span>
        <ChevronDown size={20} />
      </motion.div>
    </section>
  )
}
```

- [ ] **Step 2: Type check**

```bash
cd "/Volumes/Extreme SSD/PK Landscapind/pk-landscaping" && npx tsc --noEmit
```
Expected: no errors

- [ ] **Step 3: Check in browser**

Open http://localhost:3000 — the hero image should curtain-wipe from left, then text animates in word by word.

- [ ] **Step 4: Commit**

```bash
git add components/home/HeroSection.tsx
git commit -m "feat: rebuild HeroSection with cinematic ImageReveal + TextReveal"
```

---

## Task 12: Rebuild TrustStatsBar (Scene 2)

**Files:**
- Modify: `components/home/TrustStatsBar.tsx`

- [ ] **Step 1: Rebuild with giant CountUp numbers and cinematic layout**

```tsx
// components/home/TrustStatsBar.tsx
import CountUp from '@/components/motion/CountUp'
import TextReveal from '@/components/motion/TextReveal'
import LineDrawIn from '@/components/motion/LineDrawIn'
import FadeUpStagger, { FadeUpItem } from '@/components/motion/FadeUpStagger'

const stats = [
  { value: 6, suffix: '+', label: 'Years in Business', desc: 'Serving Fargo since 2019' },
  { value: 500, suffix: '+', label: 'Projects Completed', desc: 'Residential & commercial' },
  { value: 5, prefix: '', suffix: '.0 ★', label: 'Google Rating', desc: 'Consistently top-rated' },
  { value: 100, suffix: '%', label: 'Satisfaction', desc: 'Guaranteed on every job' },
]

export default function TrustStatsBar() {
  return (
    <div className="relative flex flex-col justify-center min-h-screen px-4 sm:px-6 lg:px-8 py-24">
      {/* Radial glow — center */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_60%_at_50%_50%,rgba(76,175,80,0.10)_0%,transparent_70%)]" />

      {/* Ghost section number */}
      <div className="absolute top-8 left-6 font-heading font-black text-[140px] leading-none text-pk-900 select-none pointer-events-none hidden lg:block">
        01
      </div>

      <div className="relative z-10 max-w-7xl mx-auto w-full">
        <div className="text-center mb-16">
          <p className="section-label justify-center">By The Numbers</p>
          <LineDrawIn className="max-w-24 mx-auto mt-2" delay={0.2} />
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-0 lg:divide-x lg:divide-pk-800">
          {stats.map((stat, i) => (
            <FadeUpStagger key={stat.label} className="text-center px-8" delay={i * 0.1}>
              <FadeUpItem>
                <div className="font-heading font-black text-pk-400 text-6xl sm:text-7xl lg:text-8xl mb-2 leading-none">
                  <CountUp to={stat.value} suffix={stat.suffix} prefix={stat.prefix} duration={2.5} />
                </div>
              </FadeUpItem>
              <FadeUpItem>
                <p className="text-white font-heading font-bold text-lg mb-1">{stat.label}</p>
              </FadeUpItem>
              <FadeUpItem>
                <p className="text-gray-500 text-sm">{stat.desc}</p>
              </FadeUpItem>
            </FadeUpStagger>
          ))}
        </div>
      </div>
    </div>
  )
}
```

- [ ] **Step 2: Type check**

```bash
cd "/Volumes/Extreme SSD/PK Landscapind/pk-landscaping" && npx tsc --noEmit
```
Expected: no errors

- [ ] **Step 3: Commit**

```bash
git add components/home/TrustStatsBar.tsx
git commit -m "feat: rebuild TrustStatsBar as cinematic stats scene"
```

---

## Task 13: Rebuild ServicesSection (Scene 3)

**Files:**
- Modify: `components/home/ServicesSection.tsx`

- [ ] **Step 1: Rebuild with FadeUpStagger cards and cinematic header**

```tsx
// components/home/ServicesSection.tsx
import Link from 'next/link'
import ServiceCard from '@/components/ui/ServiceCard'
import TextReveal from '@/components/motion/TextReveal'
import FadeUpStagger, { FadeUpItem } from '@/components/motion/FadeUpStagger'
import LineDrawIn from '@/components/motion/LineDrawIn'
import { servicesData } from '@/lib/services-data'

const otherServices = [
  'Tree Planting', 'Grass Planting', 'Tree Pruning', 'Tree Trimming',
  'Tree Removal', 'Residential Brick Lane', 'Commercial Brick Lane',
  'Tree Care', 'Spring Cleanup', 'Fall Cleanup',
]

export default function ServicesSection() {
  const featured = servicesData.slice(0, 6)

  return (
    <div className="relative flex flex-col justify-center min-h-screen px-4 sm:px-6 lg:px-8 py-24">
      {/* Radial glow — bottom left */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_50%_60%_at_0%_100%,rgba(76,175,80,0.09)_0%,transparent_70%)]" />

      {/* Ghost section number */}
      <div className="absolute top-8 right-6 font-heading font-black text-[140px] leading-none text-pk-900 select-none pointer-events-none hidden lg:block">
        02
      </div>

      <div className="relative z-10 max-w-7xl mx-auto w-full">
        <div className="mb-12">
          <p className="section-label">What We Do</p>
          <LineDrawIn className="max-w-16 mt-2 mb-6" delay={0.1} />
          <TextReveal
            text="We Specialize In These Services"
            as="h2"
            className="font-heading font-black text-white text-4xl sm:text-6xl lg:text-7xl tracking-tight"
          />
        </div>

        <FadeUpStagger className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-8" stagger={0.07}>
          {featured.map((service) => (
            <FadeUpItem key={service.slug}>
              <ServiceCard
                slug={service.slug}
                title={service.title}
                shortDescription={service.shortDescription}
                icon={service.icon}
                image={service.cardImage}
                imageAlt={service.cardImageAlt}
              />
            </FadeUpItem>
          ))}
        </FadeUpStagger>

        <FadeUpStagger className="bg-pk-800/40 border border-pk-700 rounded-2xl p-6 mb-8" delay={0.4}>
          <FadeUpItem>
            <p className="font-heading font-bold text-pk-400 text-xs uppercase tracking-widest mb-4">Also Offering</p>
          </FadeUpItem>
          <FadeUpItem>
            <div className="flex flex-wrap gap-2">
              {otherServices.map((s) => (
                <span key={s} className="text-sm bg-pk-800 border border-pk-700 text-gray-400 px-3 py-1.5 rounded-full hover:border-pk-500 hover:text-pk-400 transition-colors cursor-default">
                  {s}
                </span>
              ))}
            </div>
          </FadeUpItem>
        </FadeUpStagger>

        <FadeUpStagger delay={0.5}>
          <FadeUpItem className="text-center">
            <Link href="/services" className="btn-primary inline-block text-base px-8 py-3">
              View All Services →
            </Link>
          </FadeUpItem>
        </FadeUpStagger>
      </div>
    </div>
  )
}
```

- [ ] **Step 2: Type check**

```bash
cd "/Volumes/Extreme SSD/PK Landscapind/pk-landscaping" && npx tsc --noEmit
```
Expected: no errors

- [ ] **Step 3: Commit**

```bash
git add components/home/ServicesSection.tsx
git commit -m "feat: rebuild ServicesSection with cinematic stagger animations"
```

---

## Task 14: Rebuild WhyChooseUs (Scene 4)

**Files:**
- Modify: `components/home/WhyChooseUs.tsx`

- [ ] **Step 1: Rebuild as split-screen with ImageReveal**

```tsx
// components/home/WhyChooseUs.tsx
import Image from 'next/image'
import { CheckCircle2 } from 'lucide-react'
import TextReveal from '@/components/motion/TextReveal'
import ImageReveal from '@/components/motion/ImageReveal'
import FadeUpStagger, { FadeUpItem } from '@/components/motion/FadeUpStagger'
import LineDrawIn from '@/components/motion/LineDrawIn'

const benefits = [
  'Create curb appeal effortlessly',
  'Free up your personal time',
  'Ensure safer walking paths and driveways',
  'Simplify ongoing yard maintenance',
  'Add structure and value to open spaces',
  'Support healthier, greener plant growth',
]

export default function WhyChooseUs() {
  return (
    <div className="relative flex flex-col justify-center min-h-screen px-4 sm:px-6 lg:px-8 py-24">
      {/* Radial glow — top right */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_50%_60%_at_100%_0%,rgba(76,175,80,0.09)_0%,transparent_70%)]" />

      {/* Ghost section number */}
      <div className="absolute top-8 left-6 font-heading font-black text-[140px] leading-none text-pk-900 select-none pointer-events-none hidden lg:block">
        03
      </div>

      <div className="relative z-10 max-w-7xl mx-auto w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Content */}
          <div>
            <p className="section-label">Why Choose Us</p>
            <LineDrawIn className="max-w-16 mt-2 mb-6" delay={0.1} />
            <TextReveal
              text="A Team That Understands Nature And Your Property"
              as="h2"
              className="font-heading font-black text-white text-4xl sm:text-5xl lg:text-6xl leading-none tracking-tight mb-8"
            />

            <FadeUpStagger className="space-y-3 mb-8" delay={0.5}>
              {benefits.map((benefit) => (
                <FadeUpItem key={benefit} className="flex items-center gap-3">
                  <CheckCircle2 size={18} className="text-pk-500 shrink-0" />
                  <span className="text-gray-300 font-medium">{benefit}</span>
                </FadeUpItem>
              ))}
            </FadeUpStagger>

            <FadeUpStagger delay={0.9}>
              <FadeUpItem>
                <p className="text-gray-500 text-sm leading-relaxed">
                  Serving Fargo, Moorhead, and surrounding communities with responsive support built around real-life needs — from reviving frost-bitten lawns in spring to precision hardscape installation.
                </p>
              </FadeUpItem>
            </FadeUpStagger>
          </div>

          {/* Image with curtain reveal */}
          <div className="relative">
            <ImageReveal className="h-[500px] lg:h-[600px] rounded-2xl" delay={0.2}>
              <Image
                src="/images/rock-edging-spiral-bush-fargo.jpg"
                alt="PK Landscaping completed rock edging and spiral bush installation in Fargo ND"
                fill
                className="object-cover object-center rounded-2xl"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </ImageReveal>

            {/* Floating stat badge */}
            <FadeUpStagger className="absolute -bottom-6 -left-6" delay={1.0}>
              <FadeUpItem className="bg-pk-800 border border-pk-700 rounded-2xl px-6 py-5 shadow-2xl">
                <p className="font-heading font-black text-4xl text-pk-400 leading-none">3+</p>
                <p className="text-gray-400 text-sm mt-1">Years Serving Fargo</p>
              </FadeUpItem>
            </FadeUpStagger>
          </div>
        </div>
      </div>
    </div>
  )
}
```

- [ ] **Step 2: Type check**

```bash
cd "/Volumes/Extreme SSD/PK Landscapind/pk-landscaping" && npx tsc --noEmit
```
Expected: no errors

- [ ] **Step 3: Commit**

```bash
git add components/home/WhyChooseUs.tsx
git commit -m "feat: rebuild WhyChooseUs with split-screen ImageReveal"
```

---

## Task 15: Rebuild ProcessSection (Scene 5)

**Files:**
- Modify: `components/home/ProcessSection.tsx`

- [ ] **Step 1: Rebuild with staggered step animations and LineDrawIn connectors**

```tsx
// components/home/ProcessSection.tsx
'use client'
import { motion } from 'framer-motion'
import TextReveal from '@/components/motion/TextReveal'
import LineDrawIn from '@/components/motion/LineDrawIn'
import FadeUpStagger, { FadeUpItem } from '@/components/motion/FadeUpStagger'

const steps = [
  { num: '01', title: 'Schedule', desc: 'Book a no-obligation consultation — we come to you.' },
  { num: '02', title: 'Assess', desc: 'We listen first, then evaluate your site and vision.' },
  { num: '03', title: 'Estimate', desc: 'Clear, itemized pricing with no hidden fees.' },
  { num: '04', title: 'Schedule', desc: 'We lock in a start date and keep you updated.' },
  { num: '05', title: 'Execute', desc: 'Crew arrives on time, uses proper tools, cleans up.' },
  { num: '06', title: 'Follow Up', desc: 'We check in after every project — guaranteed.' },
]

export default function ProcessSection() {
  return (
    <div className="relative flex flex-col justify-center min-h-screen px-4 sm:px-6 lg:px-8 py-24">
      {/* Radial glow — center bottom */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_100%,rgba(76,175,80,0.10)_0%,transparent_70%)]" />

      {/* Ghost number */}
      <div className="absolute top-8 right-6 font-heading font-black text-[140px] leading-none text-pk-900 select-none pointer-events-none hidden lg:block">
        04
      </div>

      <div className="relative z-10 max-w-7xl mx-auto w-full">
        <div className="text-center mb-20">
          <p className="section-label justify-center">Our Process</p>
          <LineDrawIn className="max-w-24 mx-auto mt-2 mb-6" delay={0.1} />
          <TextReveal
            text="How We Work With You"
            as="h2"
            className="font-heading font-black text-white text-4xl sm:text-6xl lg:text-7xl tracking-tight"
          />
        </div>

        {/* Desktop stepper */}
        <div className="hidden md:grid md:grid-cols-3 lg:grid-cols-6 gap-8">
          {steps.map((step, i) => (
            <FadeUpStagger key={step.num} delay={i * 0.12} className="flex flex-col items-center text-center">
              <FadeUpItem>
                <motion.div
                  className="w-14 h-14 rounded-full border-2 border-pk-500 flex items-center justify-center font-heading font-black text-pk-400 text-sm mb-4 relative"
                  whileInView={{
                    boxShadow: ['0 0 0px rgba(76,175,80,0)', '0 0 20px rgba(76,175,80,0.4)', '0 0 10px rgba(76,175,80,0.2)'],
                  }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.12 + 0.4, duration: 0.6 }}
                >
                  {step.num}
                </motion.div>
              </FadeUpItem>
              <FadeUpItem>
                <h3 className="font-heading font-bold text-white text-sm mb-2">{step.title}</h3>
              </FadeUpItem>
              <FadeUpItem>
                <p className="text-gray-500 text-xs leading-relaxed">{step.desc}</p>
              </FadeUpItem>
            </FadeUpStagger>
          ))}
        </div>

        {/* Mobile vertical timeline */}
        <div className="md:hidden space-y-8">
          {steps.map((step, i) => (
            <FadeUpStagger key={step.num} delay={i * 0.1} className="flex gap-5">
              <FadeUpItem className="flex flex-col items-center">
                <div className="w-10 h-10 rounded-full border border-pk-500 flex items-center justify-center font-heading font-black text-pk-400 text-xs shrink-0">
                  {step.num}
                </div>
                {i < steps.length - 1 && <div className="w-px flex-1 bg-pk-800 mt-2" />}
              </FadeUpItem>
              <FadeUpItem className="pb-8">
                <h3 className="font-heading font-bold text-white text-base mb-1">{step.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{step.desc}</p>
              </FadeUpItem>
            </FadeUpStagger>
          ))}
        </div>
      </div>
    </div>
  )
}
```

- [ ] **Step 2: Type check**

```bash
cd "/Volumes/Extreme SSD/PK Landscapind/pk-landscaping" && npx tsc --noEmit
```
Expected: no errors

- [ ] **Step 3: Commit**

```bash
git add components/home/ProcessSection.tsx
git commit -m "feat: rebuild ProcessSection with staggered glow steps"
```

---

## Task 16: Update TestimonialsCarousel (Scene 6)

**Files:**
- Modify: `components/home/TestimonialsCarousel.tsx`

- [ ] **Step 1: Add dramatic entrance animation to the existing marquee**

At the top of the component, wrap the entire return in a scene layout with `TextReveal` on the heading and a fade-in on the marquee rows. Find the current `return (` and replace the section's outer div:

```tsx
// In TestimonialsCarousel.tsx, replace the return statement:
  return (
    <div className="relative flex flex-col justify-center min-h-screen overflow-hidden py-24">
      {/* Radial glow */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_50%_60%_at_0%_100%,rgba(76,175,80,0.09)_0%,transparent_70%)]" />

      {/* Ghost number */}
      <div className="absolute top-8 right-6 font-heading font-black text-[140px] leading-none text-pk-900 select-none pointer-events-none hidden lg:block">
        05
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-14 w-full">
        <p className="section-label">Client Reviews</p>
        <LineDrawIn className="max-w-16 mt-2 mb-6" delay={0.1} />
        <TextReveal
          text="What Our Clients Say"
          as="h2"
          className="font-heading font-black text-white text-4xl sm:text-6xl lg:text-7xl tracking-tight mb-4"
        />
        <div className="flex items-center gap-2">
          <div className="flex gap-0.5">
            {[...Array(5)].map((_, i) => <Star key={i} size={14} className="text-yellow-400 fill-yellow-400" />)}
          </div>
          <span className="text-yellow-400 font-bold text-sm">5.0</span>
          <span className="text-gray-600 text-sm">· {reviews.length}+ reviews</span>
        </div>
      </div>

      <motion.div
        className="flex flex-col gap-4"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-5%' }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}
      >
        <MarqueeRow reviews={ensuredRow1} />
        <MarqueeRow reviews={ensuredRow2} reverse />
      </motion.div>
    </div>
  )
```

Also add these imports at the top of the file (alongside existing imports):
```tsx
import { motion } from 'framer-motion'
import TextReveal from '@/components/motion/TextReveal'
import LineDrawIn from '@/components/motion/LineDrawIn'
```

And remove the outer `<section>` wrapper tag since `SceneWrapper` in `page.tsx` provides it.

- [ ] **Step 2: Type check**

```bash
cd "/Volumes/Extreme SSD/PK Landscapind/pk-landscaping" && npx tsc --noEmit
```
Expected: no errors

- [ ] **Step 3: Commit**

```bash
git add components/home/TestimonialsCarousel.tsx
git commit -m "feat: add cinematic entrance to TestimonialsCarousel scene"
```

---

## Task 17: Rebuild BeforeAfterSection (Scene 7)

**Files:**
- Modify: `components/home/BeforeAfterSection.tsx`

- [ ] **Step 1: Add ImageReveal to both panels of each card**

```tsx
// components/home/BeforeAfterSection.tsx
'use client'
import { useState } from 'react'
import Image from 'next/image'
import TextReveal from '@/components/motion/TextReveal'
import ImageReveal from '@/components/motion/ImageReveal'
import FadeUpStagger, { FadeUpItem } from '@/components/motion/FadeUpStagger'
import LineDrawIn from '@/components/motion/LineDrawIn'

const transformations = [
  {
    label: 'Pool Area Landscaping',
    location: 'Fargo, ND',
    before: '/images/backyard-before-dirt-fargo.jpg',
    after: '/images/gravel-pool-landscaping-after-fargo.jpg',
    beforeAlt: 'Bare dirt backyard before landscaping in Fargo ND',
    afterAlt: 'Finished gravel and paver pool area landscaping in Fargo ND',
  },
  {
    label: 'Paver Patio Install',
    location: 'West Fargo, ND',
    before: '/images/landscape-before-bare-dirt.jpg',
    after: '/images/paver-patio-installation-fargo.jpg',
    beforeAlt: 'Bare dirt yard before paver installation in West Fargo',
    afterAlt: 'Completed multi-color paver patio installation in West Fargo ND',
  },
  {
    label: 'Lawn Restoration',
    location: 'Moorhead, MN',
    before: '/images/lawn-grading-prep-before.jpg',
    after: '/images/lawn-mowing-stripes-neighborhood-fargo.jpg',
    beforeAlt: 'Graded soil before lawn restoration in Moorhead MN',
    afterAlt: 'Beautiful striped lawn after restoration service in Moorhead MN',
  },
]

export default function BeforeAfterSection() {
  return (
    <div className="relative flex flex-col justify-center min-h-screen px-4 sm:px-6 lg:px-8 py-24">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_50%,rgba(76,175,80,0.08)_0%,transparent_70%)]" />

      <div className="absolute top-8 left-6 font-heading font-black text-[140px] leading-none text-pk-900 select-none pointer-events-none hidden lg:block">
        06
      </div>

      <div className="relative z-10 max-w-7xl mx-auto w-full">
        <div className="mb-14">
          <p className="section-label">Real Results</p>
          <LineDrawIn className="max-w-16 mt-2 mb-6" delay={0.1} />
          <TextReveal
            text="Before & After"
            as="h2"
            className="font-heading font-black text-white text-4xl sm:text-6xl lg:text-7xl tracking-tight"
          />
        </div>

        <FadeUpStagger className="grid grid-cols-1 md:grid-cols-3 gap-6" stagger={0.12} delay={0.3}>
          {transformations.map((t, cardIdx) => (
            <FadeUpItem key={t.label}>
              <div className="rounded-2xl overflow-hidden border border-pk-800 hover:border-pk-500/50 transition-colors duration-300 group">
                <div className="grid grid-cols-2 relative">
                  {/* Before */}
                  <div className="relative">
                    <div className="absolute top-2 left-2 z-20 bg-black/80 text-white text-xs font-bold px-2.5 py-1 rounded-full tracking-wide">
                      Before
                    </div>
                    <ImageReveal className="aspect-[3/4]" delay={0.1 + cardIdx * 0.15}>
                      <Image
                        src={t.before}
                        alt={t.beforeAlt}
                        fill
                        loading="lazy"
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                        sizes="16vw"
                      />
                      <div className="absolute inset-0 bg-pk-900/20" />
                    </ImageReveal>
                  </div>

                  {/* Arrow */}
                  <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20 w-8 h-8 bg-pk-500 rounded-full flex items-center justify-center shadow-lg shadow-pk-500/50 group-hover:scale-110 transition-transform duration-300">
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                      <path d="M5 2L9 7L5 12" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>

                  {/* After */}
                  <div className="relative">
                    <div className="absolute top-2 right-2 z-20 bg-pk-500 text-white text-xs font-bold px-2.5 py-1 rounded-full tracking-wide">
                      After
                    </div>
                    <ImageReveal className="aspect-[3/4]" delay={0.35 + cardIdx * 0.15}>
                      <Image
                        src={t.after}
                        alt={t.afterAlt}
                        fill
                        loading="lazy"
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                        sizes="16vw"
                      />
                    </ImageReveal>
                  </div>
                </div>

                <div className="bg-pk-900/80 px-4 py-3 flex items-center justify-between">
                  <div>
                    <p className="text-white font-heading font-bold text-sm">{t.label}</p>
                    <p className="text-pk-400 text-xs mt-0.5">{t.location}</p>
                  </div>
                </div>
              </div>
            </FadeUpItem>
          ))}
        </FadeUpStagger>

        <FadeUpStagger className="text-center mt-12" delay={0.6}>
          <FadeUpItem>
            <a href="/contact" className="btn-primary inline-block px-8 py-3">
              Transform Your Property →
            </a>
          </FadeUpItem>
        </FadeUpStagger>
      </div>
    </div>
  )
}
```

- [ ] **Step 2: Type check**

```bash
cd "/Volumes/Extreme SSD/PK Landscapind/pk-landscaping" && npx tsc --noEmit
```
Expected: no errors

- [ ] **Step 3: Commit**

```bash
git add components/home/BeforeAfterSection.tsx
git commit -m "feat: rebuild BeforeAfterSection with ImageReveal on each panel"
```

---

## Task 18: Rebuild FeaturedProjects (Scene 8)

**Files:**
- Modify: `components/home/FeaturedProjects.tsx`

- [ ] **Step 1: Rebuild with staggered ImageReveal on every tile**

```tsx
// components/home/FeaturedProjects.tsx
import Image from 'next/image'
import Link from 'next/link'
import TextReveal from '@/components/motion/TextReveal'
import ImageReveal from '@/components/motion/ImageReveal'
import FadeUpStagger, { FadeUpItem } from '@/components/motion/FadeUpStagger'
import LineDrawIn from '@/components/motion/LineDrawIn'

const projects = [
  { src: '/images/paver-patio-installation-fargo.jpg', alt: 'Paver patio installation completed in Fargo ND', title: 'Paver Patio', location: 'Fargo, ND', size: 'large' },
  { src: '/images/lawn-mowing-stripes-neighborhood-fargo.jpg', alt: 'Professional lawn mowing service in Fargo ND', title: 'Lawn Care', location: 'Fargo, ND', size: 'small' },
  { src: '/images/commercial-snow-removal-lot-fargo.jpg', alt: 'Commercial snow removal service in Fargo ND', title: 'Snow Removal', location: 'West Fargo, ND', size: 'small' },
  { src: '/images/rock-edging-spiral-bush-fargo.jpg', alt: 'Rock edging and spiral bush landscaping in Fargo ND', title: 'Rock Landscaping', location: 'Moorhead, MN', size: 'small' },
  { src: '/images/paver-walkway-herringbone-fargo.jpg', alt: 'Herringbone paver walkway installation in Fargo ND', title: 'Paver Walkway', location: 'Fargo, ND', size: 'small' },
  { src: '/images/deck-construction-fargo.jpg', alt: 'Deck construction project in Fargo ND', title: 'Deck Build', location: 'Fargo, ND', size: 'large' },
]

export default function FeaturedProjects() {
  return (
    <div className="relative flex flex-col justify-center min-h-screen px-4 sm:px-6 lg:px-8 py-24">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_50%_60%_at_100%_50%,rgba(76,175,80,0.09)_0%,transparent_70%)]" />

      <div className="absolute top-8 right-6 font-heading font-black text-[140px] leading-none text-pk-900 select-none pointer-events-none hidden lg:block">
        07
      </div>

      <div className="relative z-10 max-w-7xl mx-auto w-full">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between mb-12 gap-4">
          <div>
            <p className="section-label">Featured Projects</p>
            <LineDrawIn className="max-w-16 mt-2 mb-6" delay={0.1} />
            <TextReveal
              text="Work We're Proud Of"
              as="h2"
              className="font-heading font-black text-white text-4xl sm:text-6xl lg:text-7xl tracking-tight"
            />
          </div>
          <FadeUpStagger delay={0.4}>
            <FadeUpItem>
              <Link href="/gallery" className="btn-outline text-sm shrink-0">
                View All Projects →
              </Link>
            </FadeUpItem>
          </FadeUpStagger>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-3 gap-3">
          {/* Large tile — spans 2 rows */}
          <div className="col-span-2 lg:col-span-1 lg:row-span-2 group">
            <Link href="/gallery">
              <ImageReveal className="h-64 sm:h-80 lg:h-full min-h-[320px] rounded-2xl" delay={0.2}>
                <Image src={projects[0].src} alt={projects[0].alt} fill className="object-cover transition-transform duration-700 group-hover:scale-105" sizes="33vw" />
                <div className="absolute inset-0 bg-gradient-to-t from-pk-950/80 via-pk-950/10 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4">
                  <span className="text-pk-400 text-xs font-bold uppercase tracking-widest">{projects[0].location}</span>
                  <p className="text-white font-heading font-bold text-xl mt-0.5">{projects[0].title}</p>
                </div>
              </ImageReveal>
            </Link>
          </div>

          {/* Four small tiles */}
          {projects.slice(1, 5).map((project, i) => (
            <div key={project.src} className="group">
              <Link href="/gallery">
                <ImageReveal className="aspect-[4/3] rounded-2xl" delay={0.3 + i * 0.08}>
                  <Image src={project.src} alt={project.alt} fill loading="lazy" className="object-cover transition-transform duration-700 group-hover:scale-105" sizes="33vw" />
                  <div className="absolute inset-0 bg-gradient-to-t from-pk-950/70 via-transparent to-transparent" />
                  <div className="absolute bottom-3 left-3 right-3">
                    <span className="text-pk-400 text-xs font-bold uppercase tracking-widest hidden sm:block">{project.location}</span>
                    <p className="text-white font-heading font-bold text-sm">{project.title}</p>
                  </div>
                </ImageReveal>
              </Link>
            </div>
          ))}

          {/* Wide bottom tile */}
          <div className="col-span-2 group">
            <Link href="/gallery">
              <ImageReveal className="aspect-[16/7] sm:aspect-[16/6] rounded-2xl" delay={0.65}>
                <Image src={projects[5].src} alt={projects[5].alt} fill loading="lazy" className="object-cover transition-transform duration-700 group-hover:scale-105" sizes="66vw" />
                <div className="absolute inset-0 bg-gradient-to-t from-pk-950/70 via-pk-950/10 to-transparent" />
                <div className="absolute bottom-4 left-4">
                  <span className="text-pk-400 text-xs font-bold uppercase tracking-widest">{projects[5].location}</span>
                  <p className="text-white font-heading font-bold text-xl mt-0.5">{projects[5].title}</p>
                </div>
              </ImageReveal>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
```

- [ ] **Step 2: Type check**

```bash
cd "/Volumes/Extreme SSD/PK Landscapind/pk-landscaping" && npx tsc --noEmit
```
Expected: no errors

- [ ] **Step 3: Commit**

```bash
git add components/home/FeaturedProjects.tsx
git commit -m "feat: rebuild FeaturedProjects with staggered ImageReveal grid"
```

---

## Task 19: Rebuild DiscountBanner (Scene 9)

**Files:**
- Modify: `components/home/DiscountBanner.tsx`

- [ ] **Step 1: Add scale-slam entrance to headline and spring bounce to cards**

```tsx
// components/home/DiscountBanner.tsx
'use client'
import Link from 'next/link'
import { Tag, Users, ArrowRight } from 'lucide-react'
import { motion } from 'framer-motion'
import TextReveal from '@/components/motion/TextReveal'
import FadeUpStagger, { FadeUpItem } from '@/components/motion/FadeUpStagger'
import LineDrawIn from '@/components/motion/LineDrawIn'

export default function DiscountBanner() {
  return (
    <div className="relative flex flex-col justify-center min-h-screen px-4 sm:px-6 lg:px-8 py-24 overflow-hidden">
      {/* Animated gradient background */}
      <div
        className="absolute inset-0 animate-gradient"
        style={{ background: 'linear-gradient(135deg, #0a1a0b, #1a3d1a, #2a5a2a, #1a3d1a, #0a1a0b)' }}
      />
      {/* Green radial spotlight */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_60%_at_50%_50%,rgba(76,175,80,0.18)_0%,transparent_70%)]" />

      <div className="absolute top-8 left-6 font-heading font-black text-[140px] leading-none text-pk-900/60 select-none pointer-events-none hidden lg:block">
        08
      </div>

      <div className="relative z-10 max-w-4xl mx-auto w-full text-center">
        <FadeUpStagger delay={0.1}>
          <FadeUpItem>
            <div className="flex items-center justify-center gap-3 mb-6">
              <LineDrawIn className="w-12" color="bg-pk-500/40" />
              <p className="text-pk-400 font-heading font-bold text-xs tracking-widest uppercase">Limited Time Offer</p>
              <LineDrawIn className="w-12" color="bg-pk-500/40" />
            </div>
          </FadeUpItem>
        </FadeUpStagger>

        {/* Scale-slam headline */}
        <motion.div
          initial={{ scale: 1.15, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          viewport={{ once: true, margin: '-5%' }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="mb-10"
        >
          <h2 className="font-heading font-black text-white text-5xl sm:text-7xl lg:text-8xl tracking-tight leading-none">
            Save On Your<br />
            <span className="text-pk-400">First Service</span>
          </h2>
        </motion.div>

        {/* Spring-bounce discount cards */}
        <FadeUpStagger className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-2xl mx-auto mb-10" delay={0.4} stagger={0.12}>
          <FadeUpItem>
            <motion.div
              className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-6 flex items-center gap-4 hover:bg-white/15 transition-colors"
              whileInView={{ scale: [0.9, 1.03, 1] }}
              viewport={{ once: true }}
              transition={{ delay: 0.45, duration: 0.5, ease: 'easeOut' }}
            >
              <div className="w-12 h-12 bg-white/15 rounded-xl flex items-center justify-center shrink-0">
                <Tag size={22} className="text-white" />
              </div>
              <div className="text-left">
                <p className="font-heading font-black text-white text-4xl leading-none">10%</p>
                <p className="text-white/80 text-sm mt-1">For First-Time Customers</p>
              </div>
            </motion.div>
          </FadeUpItem>

          <FadeUpItem>
            <motion.div
              className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-6 flex items-center gap-4 hover:bg-white/15 transition-colors"
              whileInView={{ scale: [0.9, 1.03, 1] }}
              viewport={{ once: true }}
              transition={{ delay: 0.57, duration: 0.5, ease: 'easeOut' }}
            >
              <div className="w-12 h-12 bg-white/15 rounded-xl flex items-center justify-center shrink-0">
                <Users size={22} className="text-white" />
              </div>
              <div className="text-left">
                <p className="font-heading font-black text-white text-4xl leading-none">5%</p>
                <p className="text-white/80 text-sm mt-1">Seniors, Veterans &amp; Repeat Clients</p>
              </div>
            </motion.div>
          </FadeUpItem>
        </FadeUpStagger>

        <FadeUpStagger delay={0.7}>
          <FadeUpItem>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 bg-white text-pk-950 hover:bg-gray-100 font-black px-10 py-4 rounded-xl transition-all duration-200 text-base shadow-2xl hover:-translate-y-0.5 active:translate-y-0"
            >
              Claim Your Discount
              <ArrowRight size={16} />
            </Link>
          </FadeUpItem>
        </FadeUpStagger>
      </div>
    </div>
  )
}
```

- [ ] **Step 2: Type check**

```bash
cd "/Volumes/Extreme SSD/PK Landscapind/pk-landscaping" && npx tsc --noEmit
```
Expected: no errors

- [ ] **Step 3: Commit**

```bash
git add components/home/DiscountBanner.tsx
git commit -m "feat: rebuild DiscountBanner with scale-slam and spring card entrances"
```

---

## Task 20: Rebuild ContactCTA (Scene 10)

**Files:**
- Modify: `components/home/ContactCTA.tsx`

- [ ] **Step 1: Rebuild as final cinematic scene with full-screen ImageReveal**

```tsx
// components/home/ContactCTA.tsx
import Image from 'next/image'
import { Phone, MapPin, Clock } from 'lucide-react'
import TextReveal from '@/components/motion/TextReveal'
import ImageReveal from '@/components/motion/ImageReveal'
import FadeUpStagger, { FadeUpItem } from '@/components/motion/FadeUpStagger'
import LineDrawIn from '@/components/motion/LineDrawIn'

export default function ContactCTA() {
  return (
    <div className="relative flex flex-col justify-center min-h-screen px-4 sm:px-6 lg:px-8 py-24 overflow-hidden">
      {/* Full-screen background with curtain reveal */}
      <ImageReveal className="absolute inset-0">
        <Image
          src="/images/paver-patio-installation-fargo.jpg"
          alt="Paver patio installation project by PK Landscaping in Fargo ND"
          fill
          className="object-cover object-center"
          sizes="100vw"
        />
      </ImageReveal>

      {/* Deep overlay */}
      <div className="absolute inset-0 bg-pk-950/88 z-[1]" />

      {/* Green radial glow top */}
      <div className="absolute inset-0 z-[1] bg-[radial-gradient(ellipse_60%_50%_at_50%_0%,rgba(76,175,80,0.12)_0%,transparent_70%)]" />

      <div className="absolute top-8 right-6 font-heading font-black text-[140px] leading-none text-pk-900/60 select-none pointer-events-none hidden lg:block z-[2]">
        09
      </div>

      <div className="relative z-10 max-w-4xl mx-auto text-center">
        <FadeUpStagger delay={0.3}>
          <FadeUpItem>
            <p className="section-label justify-center">Get In Touch</p>
          </FadeUpItem>
        </FadeUpStagger>

        <LineDrawIn className="max-w-24 mx-auto mt-2 mb-8" delay={0.4} />

        <TextReveal
          text="Ready to Get Started?"
          as="h2"
          delay={0.4}
          className="font-heading font-black text-white text-5xl sm:text-7xl lg:text-8xl tracking-tight leading-none mb-8"
        />

        <FadeUpStagger delay={0.8}>
          <FadeUpItem>
            <p className="text-gray-400 text-lg leading-relaxed mb-12 max-w-xl mx-auto">
              Call us today and we&apos;ll get you taken care of. Serving Fargo, Moorhead, and surrounding areas.
            </p>
          </FadeUpItem>
        </FadeUpStagger>

        <FadeUpStagger className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-14" delay={1.0} stagger={0.1}>
          <FadeUpItem>
            <a href="tel:+12189791154" className="flex items-center gap-3 text-gray-300 hover:text-pk-400 transition-colors group">
              <div className="w-11 h-11 bg-pk-800 rounded-xl flex items-center justify-center shrink-0 group-hover:bg-pk-700 transition-colors">
                <Phone size={16} className="text-pk-500" />
              </div>
              <div className="text-left">
                <p className="text-xs text-gray-500 uppercase tracking-widest">Call Us</p>
                <p className="font-bold text-white">(218) 979-1154</p>
              </div>
            </a>
          </FadeUpItem>
          <FadeUpItem>
            <div className="flex items-center gap-3 text-gray-300">
              <div className="w-11 h-11 bg-pk-800 rounded-xl flex items-center justify-center shrink-0">
                <MapPin size={16} className="text-pk-500" />
              </div>
              <div className="text-left">
                <p className="text-xs text-gray-500 uppercase tracking-widest">Location</p>
                <p className="font-bold text-white">Fargo, ND 58103</p>
              </div>
            </div>
          </FadeUpItem>
          <FadeUpItem>
            <div className="flex items-center gap-3 text-gray-300">
              <div className="w-11 h-11 bg-pk-800 rounded-xl flex items-center justify-center shrink-0">
                <Clock size={16} className="text-pk-500" />
              </div>
              <div className="text-left">
                <p className="text-xs text-gray-500 uppercase tracking-widest">Hours</p>
                <p className="font-bold text-white">Mon–Sat: 7am–8pm</p>
              </div>
            </div>
          </FadeUpItem>
        </FadeUpStagger>

        <FadeUpStagger delay={1.3}>
          <FadeUpItem>
            <a
              href="tel:+12189791154"
              className="inline-block btn-primary text-xl px-14 py-5 shadow-2xl shadow-pk-500/20"
            >
              Call (218) 979-1154
            </a>
          </FadeUpItem>
        </FadeUpStagger>
      </div>
    </div>
  )
}
```

- [ ] **Step 2: Type check**

```bash
cd "/Volumes/Extreme SSD/PK Landscapind/pk-landscaping" && npx tsc --noEmit
```
Expected: no errors

- [ ] **Step 3: Commit**

```bash
git add components/home/ContactCTA.tsx
git commit -m "feat: rebuild ContactCTA as final cinematic scene with ImageReveal"
```

---

## Task 21: Final Integration Test + Polish

**Files:** All modified files

- [ ] **Step 1: Full type check**

```bash
cd "/Volumes/Extreme SSD/PK Landscapind/pk-landscaping" && npx tsc --noEmit
```
Expected: no output

- [ ] **Step 2: Verify dev server**

```bash
cd "/Volumes/Extreme SSD/PK Landscapind/pk-landscaping" && npm run dev
```

Open http://localhost:3000 and verify:
- [ ] Custom green dot cursor follows mouse
- [ ] Green progress bar tracks scroll position
- [ ] Hero image curtain-wipes open on load
- [ ] Hero headline animates word-by-word
- [ ] Sections snap to viewport as you scroll
- [ ] Each scene's entrance animation fires when snapped into view
- [ ] Stats count up from 0 when Stats scene enters
- [ ] Service cards stagger in
- [ ] Before/after panels each curtain-wipe open
- [ ] Gallery images reveal with stagger
- [ ] Discount banner headline scales in
- [ ] Contact CTA background image curtain-wipes open

- [ ] **Step 3: Check mobile (375px)**

Use browser DevTools device emulation at 375×812.
- Scroll snap should use proximity (less aggressive)
- Typography scales down appropriately
- Custom cursor dot not visible (touch device)

- [ ] **Step 4: Fix the cursor on mobile — verify globals.css only hides cursor on non-touch**

The `cursor: none !important` in globals.css hides cursor on all devices. On touch devices this is fine (there's no cursor). But on desktops with touch screens, test that the cursor dot appears. No code change needed — just verify behavior is acceptable.

- [ ] **Step 5: Production build check**

```bash
cd "/Volumes/Extreme SSD/PK Landscapind/pk-landscaping" && npm run build 2>&1 | tail -20
```
Expected: `✓ Compiled successfully` with no errors

- [ ] **Step 6: Final commit and push**

```bash
git add -A
git commit -m "feat: complete cinematic homepage redesign

- 8 motion primitives: SceneWrapper, TextReveal, ImageReveal, FadeUpStagger, LineDrawIn, CountUp, CustomCursor, ScrollProgress
- 10 full-screen scroll-snap scenes with entrance animations
- Custom green cursor with hover ring expansion
- Curtain-wipe ImageReveal on hero, why-choose-us, before/after, projects, contact
- Word-by-word TextReveal headlines on all scenes
- CountUp stats racing from 0 on entry
- Ghost section numbers, radial glows, grain texture throughout

Co-Authored-By: Claude Sonnet 4.6 <noreply@anthropic.com>"

git push origin main
```
