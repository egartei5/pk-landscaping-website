import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight } from 'lucide-react'
import { ServiceIcon } from '@/lib/service-icons'

interface ServiceCardProps {
  slug: string
  title: string
  shortDescription: string
  icon?: string
  image?: string
  imageAlt?: string
}

export default function ServiceCard({ slug, title, shortDescription, icon, image, imageAlt }: ServiceCardProps) {
  return (
    <div className="card-dark group flex flex-col h-full overflow-hidden">
      {image && (
        <div className="relative h-44 -mx-6 -mt-6 mb-5 overflow-hidden">
          <Image
            src={image}
            alt={imageAlt ?? `${title} service by PK Landscaping in Fargo ND`}
            fill
            loading="lazy"
            className="object-cover transition-transform duration-700 group-hover:scale-105"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-pk-900/80 via-pk-900/20 to-transparent" />
          <div className="absolute bottom-3 left-3 w-8 h-8 bg-pk-500/90 rounded-lg flex items-center justify-center backdrop-blur-sm">
            <ServiceIcon slug={slug} size={16} className="text-white" />
          </div>
        </div>
      )}
      {!image && (
        <div className="w-12 h-12 bg-pk-500/20 rounded-xl flex items-center justify-center mb-4">
          <ServiceIcon slug={slug} size={22} className="text-pk-400" />
        </div>
      )}
      <h3 className="font-heading font-bold text-white text-xl mb-2">{title}</h3>
      <p className="text-gray-400 text-sm leading-relaxed mb-6 flex-1">{shortDescription}</p>
      <div className="flex flex-col sm:flex-row gap-3 mt-auto">
        <Link
          href="/contact"
          className="flex-1 text-center bg-pk-500 hover:bg-pk-400 text-white font-bold text-sm px-4 py-2.5 rounded-lg transition-colors"
        >
          Request Service
        </Link>
        <Link
          href={`/services/${slug}`}
          className="inline-flex items-center justify-center gap-1.5 text-pk-400 font-semibold text-sm hover:text-pk-300 transition-colors border border-pk-700 hover:border-pk-500 px-4 py-2.5 rounded-lg"
        >
          Details <ArrowRight size={13} />
        </Link>
      </div>
    </div>
  )
}
