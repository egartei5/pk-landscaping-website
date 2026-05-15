'use client'
import { motion, useReducedMotion } from 'framer-motion'
import { ElementType } from 'react'

interface TextRevealProps {
  text: string
  className?: string
  delay?: number
  as?: ElementType
}

export default function TextReveal({ text, className = '', delay = 0, as: Tag = 'h2' }: TextRevealProps) {
  const shouldReduce = useReducedMotion()
  const words = text.split(' ')

  return (
    <Tag className={`overflow-hidden ${className}`}>
      <span className="flex flex-wrap gap-x-[0.3em] gap-y-1">
        {words.map((word, i) => (
          <span key={i} className="overflow-hidden inline-block">
            <motion.span
              className="inline-block"
              initial={{ y: shouldReduce ? 0 : 50, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true, margin: '-5%' }}
              transition={{
                delay: delay + i * 0.08,
                duration: 0.7,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              {word}
            </motion.span>
          </span>
        ))}
      </span>
    </Tag>
  )
}
