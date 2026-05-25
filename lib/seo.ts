import type { Metadata } from 'next'

const BASE_URL = 'https://pklandscapingmn.com'
const SITE_NAME = 'PK Landscaping Service'
const DEFAULT_IMAGE = `${BASE_URL}/og-image.jpg`

export function buildMetadata(opts: {
  title: string
  description: string
  path?: string
  image?: string
  type?: 'website' | 'article'
}): Metadata {
  const url = `${BASE_URL}${opts.path ?? ''}`
  return {
    title: opts.title,
    description: opts.description,
    alternates: { canonical: url },
    openGraph: {
      title: opts.title,
      description: opts.description,
      url,
      siteName: SITE_NAME,
      type: opts.type ?? 'website',
      images: [{ url: opts.image ?? DEFAULT_IMAGE, width: 1200, height: 630 }],
    },
    twitter: {
      card: 'summary_large_image',
      title: opts.title,
      description: opts.description,
      images: [opts.image ?? DEFAULT_IMAGE],
    },
  }
}

export function localBusinessSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: 'PK Landscaping Service',
    description: 'Professional landscaping, snow removal, road paving, and outdoor services in Fargo, ND. Fully insured & bonded. Free estimates.',
    url: BASE_URL,
    telephone: '+12189791154',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Fargo',
      addressLocality: 'Fargo',
      addressRegion: 'ND',
      postalCode: '58103',
      addressCountry: 'US',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 46.8772,
      longitude: -96.7898,
    },
    openingHoursSpecification: [
      { '@type': 'OpeningHoursSpecification', dayOfWeek: ['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'], opens: '07:00', closes: '20:00' },
    ],
    priceRange: '$$',
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '5',
      reviewCount: '8',
      bestRating: '5',
      worstRating: '1',
    },
    areaServed: [
      { '@type': 'City', name: 'Fargo', containedInPlace: { '@type': 'State', name: 'North Dakota' } },
      { '@type': 'City', name: 'Moorhead', containedInPlace: { '@type': 'State', name: 'Minnesota' } },
      { '@type': 'City', name: 'West Fargo', containedInPlace: { '@type': 'State', name: 'North Dakota' } },
      { '@type': 'City', name: 'Horace', containedInPlace: { '@type': 'State', name: 'North Dakota' } },
      { '@type': 'City', name: 'Dilworth', containedInPlace: { '@type': 'State', name: 'Minnesota' } },
      { '@type': 'City', name: 'Casselton', containedInPlace: { '@type': 'State', name: 'North Dakota' } },
    ],
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Landscaping Services',
      itemListElement: [
        'Lawn Mowing', 'Snow Removal', 'Paver Installation', 'Road Paving',
        'Tree Services', 'Gutter Cleaning', 'Seasonal Cleanup', 'Brick Lane Construction',
      ].map((name) => ({ '@type': 'Offer', itemOffered: { '@type': 'Service', name } })),
    },
  }
}

export function serviceSchema(name: string, description: string, slug: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name,
    description,
    provider: { '@type': 'LocalBusiness', name: 'PK Landscaping Service', url: BASE_URL },
    url: `${BASE_URL}/services/${slug}`,
    areaServed: { '@type': 'State', name: 'North Dakota' },
  }
}

export function blogPostingSchema(post: { title: string; excerpt: string; slug: string; publishedAt: Date | null; category: string }) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.excerpt,
    url: `${BASE_URL}/blog/${post.slug}`,
    datePublished: post.publishedAt?.toISOString(),
    author: { '@type': 'Organization', name: 'PK Landscaping Service' },
    publisher: { '@type': 'Organization', name: 'PK Landscaping Service', url: BASE_URL },
  }
}

export function faqSchema(faqs: { question: string; answer: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((f) => ({
      '@type': 'Question',
      name: f.question,
      acceptedAnswer: { '@type': 'Answer', text: f.answer },
    })),
  }
}
