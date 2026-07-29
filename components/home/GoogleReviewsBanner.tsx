import { Star, ExternalLink } from 'lucide-react'
import FadeUpStagger, { FadeUpItem } from '@/components/motion/FadeUpStagger'

export default function GoogleReviewsBanner() {
  return (
    <section className="bg-white border-y border-gray-100 py-14 px-4 sm:px-6">
      <div className="max-w-4xl mx-auto">
        <FadeUpStagger className="flex flex-col sm:flex-row items-center justify-between gap-8">
          <FadeUpItem className="flex items-center gap-5">
            <div className="w-14 h-14 bg-white rounded-2xl shadow-md flex items-center justify-center border border-gray-100 shrink-0">
              <svg viewBox="0 0 48 48" className="w-8 h-8">
                <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/>
                <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/>
                <path fill="#FBBC05" d="M10.53 28.59c-.5-1.45-.79-3-.79-4.59s.29-3.14.79-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"/>
                <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/>
              </svg>
            </div>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="font-heading font-black text-gray-900 text-2xl">5.0</span>
                <div className="flex gap-0.5">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={16} className="text-yellow-400 fill-yellow-400" />
                  ))}
                </div>
              </div>
              <p className="text-gray-500 text-sm">Rated 5 stars on Google · Fargo-Moorhead&apos;s top landscaper</p>
            </div>
          </FadeUpItem>

          <FadeUpItem className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
            <a
              href="https://search.google.com/local/writereview?placeid=YOUR_PLACE_ID"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 bg-[#4285F4] hover:bg-[#3370e0] text-white font-bold px-6 py-3 rounded-xl transition-all duration-200 hover:-translate-y-0.5 shadow-md text-sm whitespace-nowrap"
            >
              <Star size={14} className="fill-white" />
              Leave a Google Review
              <ExternalLink size={13} />
            </a>
            <a
              href="/testimonials"
              className="flex items-center justify-center gap-2 border border-gray-200 hover:border-pk-500 text-gray-600 hover:text-pk-500 font-medium px-6 py-3 rounded-xl transition-all duration-200 text-sm whitespace-nowrap"
            >
              Read All Reviews
            </a>
          </FadeUpItem>
        </FadeUpStagger>
      </div>
    </section>
  )
}
