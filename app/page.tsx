import Script from 'next/script'
import { db } from '@/lib/db'
import { localBusinessSchema } from '@/lib/seo'
import HeroSection from '@/components/home/HeroSection'
import TrustStatsBar from '@/components/home/TrustStatsBar'
import ValuePropsSection from '@/components/home/ValuePropsSection'
import ServicesSection from '@/components/home/ServicesSection'
import WhyChooseUs from '@/components/home/WhyChooseUs'
import ProcessSection from '@/components/home/ProcessSection'
import TestimonialsCarousel from '@/components/home/TestimonialsCarousel'
import ServiceAreasSection from '@/components/home/ServiceAreasSection'
import DiscountBanner from '@/components/home/DiscountBanner'
import BlogPreview from '@/components/home/BlogPreview'
import ContactCTA from '@/components/home/ContactCTA'

export const revalidate = 3600

export default async function HomePage() {
  const [testimonials, posts] = await Promise.all([
    db.testimonial.findMany({ where: { published: true }, orderBy: { date: 'desc' } }),
    db.blogPost.findMany({ where: { published: true }, orderBy: { publishedAt: 'desc' }, take: 3 }),
  ])

  return (
    <>
      <Script
        id="local-business-schema"
        type="application/ld+json"
        strategy="beforeInteractive"
      >
        {JSON.stringify(localBusinessSchema())}
      </Script>
      <HeroSection />
      <TrustStatsBar />
      <ValuePropsSection />
      <ServicesSection />
      <WhyChooseUs />
      <ProcessSection />
      <TestimonialsCarousel testimonials={testimonials} />
      <ServiceAreasSection />
      <DiscountBanner />
      <BlogPreview posts={posts} />
      <ContactCTA />
    </>
  )
}
