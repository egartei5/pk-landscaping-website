import type { Metadata } from 'next'
import { Inter, Montserrat } from 'next/font/google'
import './globals.css'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import AnnouncementBar from '@/components/layout/AnnouncementBar'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter', display: 'swap' })
const montserrat = Montserrat({
  subsets: ['latin'],
  variable: '--font-montserrat',
  display: 'swap',
  weight: ['400', '500', '700', '900'],
})

export const metadata: Metadata = {
  title: { default: 'PK Landscaping Service — Fargo, ND', template: '%s | PK Landscaping Service' },
  description: 'Professional landscaping, snow removal, road paving, and outdoor services in Fargo, ND. Fully insured & bonded. 10% off for first-time customers.',
  metadataBase: new URL('https://pklandscapingmn.com'),
  keywords: ['landscaping Fargo ND', 'snow removal Fargo', 'lawn mowing Fargo', 'road paving North Dakota', 'paver installation Fargo'],
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://pklandscapingmn.com',
    siteName: 'PK Landscaping Service',
    images: [{ url: '/og-image.jpg', width: 1200, height: 630, alt: 'PK Landscaping Service — Fargo, ND' }],
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${montserrat.variable}`}>
      <body className="font-sans bg-white text-gray-900 antialiased">
        <AnnouncementBar />
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  )
}
