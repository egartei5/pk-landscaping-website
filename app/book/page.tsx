import { buildMetadata } from '@/lib/seo'
import BookingForm from '@/components/booking/BookingForm'

export const metadata = buildMetadata({
  title: 'Book a Service',
  description: 'Schedule your landscaping, lawn care, or snow removal service online. Pick your date and time — we confirm within hours.',
  path: '/book',
})

export default function BookPage() {
  return (
    <div className="min-h-screen bg-pk-950 pt-24 pb-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-10">
          <span className="section-label">Online Booking</span>
          <h1 className="font-heading font-black text-white text-4xl sm:text-5xl mt-3 mb-3">
            Schedule Your Service
          </h1>
          <p className="text-gray-400 text-lg max-w-xl mx-auto">
            Pick a date and time that works for you. We review every request and confirm within a few hours.
          </p>
        </div>
        <BookingForm />
      </div>
    </div>
  )
}
