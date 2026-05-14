import { Snowflake, Truck, Grid3X3, Scissors, TreePine, Hammer, Droplets, Wind, type LucideProps } from 'lucide-react'
import type { ComponentType } from 'react'

export const slugIconMap: Record<string, ComponentType<LucideProps>> = {
  'snow-removal': Snowflake,
  'road-paving': Truck,
  'paver-installation': Grid3X3,
  'lawn-mowing': Scissors,
  'tree-services': TreePine,
  'brick-lane-construction': Hammer,
  'gutter-cleaning': Droplets,
  'seasonal-cleanup': Wind,
}

interface ServiceIconProps extends LucideProps {
  slug: string
}

export function ServiceIcon({ slug, ...props }: ServiceIconProps) {
  const Icon = slugIconMap[slug]
  if (!Icon) return null
  return <Icon {...props} />
}
