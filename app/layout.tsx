import type { Metadata } from 'next'
import { Inter, Montserrat } from 'next/font/google'
import './globals.css'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import AnnouncementBar from '@/components/layout/AnnouncementBar'
import MobileCTABar from '@/components/layout/MobileCTABar'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter', display: 'swap' })
const montserrat = Montserrat({
  subsets: ['latin'],
  variable: '--font-montserrat',
  display: 'swap',
  weight: ['400', '500', '700', '900'],
})

export const metadata: Metadata = {
  title: { default: 'PK Landscaping | Lawn Care, Snow Removal & Landscaping in Fargo-Moorhead', template: '%s | PK Landscaping' },
  description: 'Fargo-Moorhead\'s trusted landscaping company. Lawn mowing, snow removal, paver installation, tree services & more. Fully insured & bonded. Free estimates. Call (218) 979-1154.',
  metadataBase: new URL('https://pklandscapingmn.com'),
  keywords: ['landscaping Fargo ND', 'lawn care Fargo Moorhead', 'snow removal Fargo', 'lawn mowing Fargo ND', 'paver installation Fargo', 'tree services Fargo', 'landscaping Moorhead MN', 'West Fargo landscaping', 'Horace ND landscaping'],
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://pklandscapingmn.com',
    siteName: 'PK Landscaping',
    images: [{ url: '/og-image.jpg', width: 1200, height: 630, alt: 'PK Landscaping — Fargo-Moorhead Lawn Care & Landscaping' }],
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${montserrat.variable}`}>
      <body className="font-sans bg-white text-gray-900 antialiased">
        <AnnouncementBar />
        <Header />
        <main className="pb-16 sm:pb-0">{children}</main>
        <Footer />
        <MobileCTABar />
      </body>
    </html>
  )
}
