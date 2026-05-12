import BookingForm from '@/components/booking/BookingForm'
import SectionLabel from '@/components/ui/SectionLabel'
import { Phone, Clock, CalendarCheck } from 'lucide-react'

const perks = [
  { icon: CalendarCheck, text: 'Book any service online in 2 minutes' },
  { icon: Clock, text: 'Same-week appointments available' },
  { icon: Phone, text: 'Or call us: (218) 979-1154' },
]

export default function HomeBookingSection() {
  return (
    <section className="bg-pk-950 py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-10">
          <SectionLabel>Book Online</SectionLabel>
          <h2 className="font-heading font-black text-white text-4xl sm:text-5xl mb-4">
            Schedule Your Service
          </h2>
          <p className="text-gray-400 max-w-xl mx-auto mb-6">
            Pick your service, choose a date that works, and we&apos;ll confirm within a few hours. No calls required.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3">
            {perks.map(({ icon: Icon, text }) => (
              <div key={text} className="flex items-center gap-2 text-gray-400 text-sm">
                <Icon size={15} className="text-pk-500 shrink-0" />
                <span>{text}</span>
              </div>
            ))}
          </div>
        </div>

        <BookingForm />
      </div>
    </section>
  )
}
