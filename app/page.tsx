import Script from 'next/script'
import dynamic from 'next/dynamic'
import { db } from '@/lib/db'
import { localBusinessSchema } from '@/lib/seo'
import SceneWrapper from '@/components/motion/SceneWrapper'
import HeroSection from '@/components/home/HeroSection'

// Server components — code-split, still SSR'd
const TrustStatsBar           = dynamic(() => import('@/components/home/TrustStatsBar'))
const ServicesSection         = dynamic(() => import('@/components/home/ServicesSection'))
const WhyChooseUs             = dynamic(() => import('@/components/home/WhyChooseUs'))
const BeforeAfterSection      = dynamic(() => import('@/components/home/BeforeAfterSection'))
const FeaturedProjects        = dynamic(() => import('@/components/home/FeaturedProjects'))
const ContactCTA              = dynamic(() => import('@/components/home/ContactCTA'))
const GoogleReviewsBanner     = dynamic(() => import('@/components/home/GoogleReviewsBanner'))
const MaintenancePlansSection = dynamic(() => import('@/components/home/MaintenancePlansSection'))
const ValuePropsSection       = dynamic(() => import('@/components/home/ValuePropsSection'))
const HomeBookingSection      = dynamic(() => import('@/components/home/HomeBookingSection'))
const ServiceAreasSection     = dynamic(() => import('@/components/home/ServiceAreasSection'))
const BlogPreview             = dynamic(() => import('@/components/home/BlogPreview'))

// Client components — skip SSR, load only client-side
const ProcessSection       = dynamic(() => import('@/components/home/ProcessSection'), { ssr: false })
const TestimonialsCarousel = dynamic(() => import('@/components/home/TestimonialsCarousel'), { ssr: false })
const DiscountBanner       = dynamic(() => import('@/components/home/DiscountBanner'), { ssr: false })

export const revalidate = 60

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

      {/* Scene 1 — Hero */}
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
      <GoogleReviewsBanner />
      <MaintenancePlansSection />
      <ValuePropsSection />
      <HomeBookingSection />
      <ServiceAreasSection />
      <BlogPreview posts={posts} />
    </>
  )
}
