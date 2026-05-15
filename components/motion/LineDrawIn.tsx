'use client'
import { motion, useReducedMotion } from 'framer-motion'

interface LineDrawInProps {
  className?: string
  delay?: number
  color?: string
}

export default function LineDrawIn({ className = '', delay = 0, color = 'bg-pk-700' }: LineDrawInProps) {
  const shouldReduce = useReducedMotion()

  return (
    <motion.div
      className={`h-px ${color} ${className}`}
      style={{ transformOrigin: 'left' }}
      initial={{ scaleX: 0 }}
      whileInView={{ scaleX: 1 }}
      viewport={{ once: true, margin: '-5%' }}
      transition={{
        delay: shouldReduce ? 0 : delay,
        duration: shouldReduce ? 0.01 : 0.7,
        ease: [0.22, 1, 0.36, 1],
      }}
    />
  )
}
