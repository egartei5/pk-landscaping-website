import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

interface ServiceCardProps {
  slug: string
  title: string
  shortDescription: string
  icon: string
}

export default function ServiceCard({ slug, title, shortDescription, icon }: ServiceCardProps) {
  return (
    <div className="card-dark group">
      <div className="text-3xl mb-4">{icon}</div>
      <h3 className="font-heading font-bold text-white text-lg mb-2">{title}</h3>
      <p className="text-gray-400 text-sm leading-relaxed mb-4">{shortDescription}</p>
      <Link
        href={`/services/${slug}`}
        className="inline-flex items-center gap-1.5 text-pk-500 font-bold text-sm hover:text-pk-400 transition-colors group-hover:gap-2.5"
      >
        Learn More <ArrowRight size={14} className="transition-transform group-hover:translate-x-0.5" />
      </Link>
    </div>
  )
}
