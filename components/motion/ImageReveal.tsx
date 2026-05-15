'use client'
import { motion, useReducedMotion } from 'framer-motion'
import { ReactNode } from 'react'

interface ImageRevealProps {
  children: ReactNode
  className?: string
  delay?: number
}

export default function ImageReveal({ children, className = '', delay = 0 }: ImageRevealProps) {
  const shouldReduce = useReducedMotion()

  return (
    <div className={`relative overflow-hidden ${className}`}>
      {children}
      <motion.div
        className="absolute inset-0 bg-pk-950 z-10"
        style={{ transformOrigin: 'left' }}
        initial={{ scaleX: 1 }}
        whileInView={{ scaleX: 0 }}
        viewport={{ once: true, margin: '-5%' }}
        transition={{
          delay: shouldReduce ? 0 : delay,
          duration: shouldReduce ? 0.01 : 0.9,
          ease: [0.76, 0, 0.24, 1],
        }}
      />
    </div>
  )
}
