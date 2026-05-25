import type { Metadata } from 'next'
import { buildMetadata } from '@/lib/seo'
import SectionLabel from '@/components/ui/SectionLabel'
import FeedbackForm from '@/components/feedback/FeedbackForm'

export const metadata: Metadata = buildMetadata({
  title: 'Leave Feedback',
  description: 'Share your experience with PK Landscaping Service. Your feedback helps us improve and serve Fargo-Moorhead better.',
  path: '/feedback',
})

export default function FeedbackPage() {
  return (
    <>
      <div className="bg-pk-950 pt-32 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto text-center">
          <SectionLabel>After Service</SectionLabel>
          <h1 className="font-heading font-black text-white text-5xl sm:text-6xl mb-4">
            How Did We Do?
          </h1>
          <p className="text-gray-400 text-lg">
            Your feedback helps us improve and lets other homeowners know what to expect. Takes less than a minute.
          </p>
        </div>
      </div>

      <section className="py-12 px-4 sm:px-6 lg:px-8 bg-pk-950 min-h-screen">
        <FeedbackForm />
      </section>
    </>
  )
}
