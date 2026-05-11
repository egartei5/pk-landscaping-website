import SectionLabel from '@/components/ui/SectionLabel'
import { MapPin } from 'lucide-react'

const areas = [
  'Fargo, ND', 'Argusville, ND', 'Barnesville, MN', 'Briarwood, ND',
  'Casselton, ND', 'Dilworth, MN', 'Eglon Township, MN', 'Glyndon, MN',
  'Glyndon, ND', 'Hawley, MN', 'Horace, ND', 'Kindred, ND',
  'Mapleton, N', 'Mapleton, ND', 'Oakport Township, MN', 'Prosper, ND',
  'Prairiewood, Fargo, ND', 'Reed Township, ND', 'Sabin, MN',
  'Spring Prairie Township, MN', 'Stanley Township, ND', 'Hickson, ND',
]

export default function ServiceAreasSection() {
  return (
    <section className="bg-white py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <SectionLabel>Service Coverage</SectionLabel>
          <h2 className="font-heading font-black text-pk-900 text-4xl sm:text-5xl mb-4">
            We Serve the Surrounding Areas
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Our company primarily operates within a defined radius close to Fargo but extends full-service coverage to nearby communities. Both residential and commercial clients are welcome.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 mb-10">
          {areas.map((area) => (
            <div key={area} className="flex items-center gap-1.5 text-sm text-gray-600 bg-pk-off-white px-3 py-2 rounded-lg">
              <MapPin size={12} className="text-pk-500 shrink-0" />
              <span className="truncate">{area}</span>
            </div>
          ))}
        </div>

        {/* Google Maps embed */}
        <div className="rounded-2xl overflow-hidden shadow-lg border border-gray-100 h-64 sm:h-80">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d86540.85!2d-96.789!3d46.877!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x52cf53b4ee08aab5%3A0x9f2d2ff1a87f024!2sFargo%2C%20ND!5e0!3m2!1sen!2sus!4v1620000000000"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="PK Landscaping Service area map — Fargo ND"
          />
        </div>
      </div>
    </section>
  )
}
