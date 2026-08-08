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
import MaintenancePlansSection from '@/components/home/MaintenancePlansSection'
import GoogleReviewsBanner from '@/components/home/GoogleReviewsBanner'

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
