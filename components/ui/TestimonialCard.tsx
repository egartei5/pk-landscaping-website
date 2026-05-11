import { Star } from 'lucide-react'

interface TestimonialCardProps {
  name: string
  rating: number
  review: string
  service?: string | null
  date?: string
}

export default function TestimonialCard({ name, rating, review, service, date }: TestimonialCardProps) {
  return (
    <div className="bg-pk-800 border border-pk-700 rounded-xl p-6 flex flex-col gap-4">
      <div className="flex gap-0.5">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star key={i} size={14} className={i < rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-600'} />
        ))}
      </div>
      <p className="text-gray-300 text-sm leading-relaxed italic">&ldquo;{review}&rdquo;</p>
      <div className="flex items-center justify-between mt-auto pt-4 border-t border-pk-700">
        <div>
          <p className="font-heading font-bold text-white text-sm">{name}</p>
          {service && <p className="text-pk-500 text-xs">{service}</p>}
        </div>
        {date && <p className="text-gray-500 text-xs">{new Date(date).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}</p>}
      </div>
    </div>
  )
}
