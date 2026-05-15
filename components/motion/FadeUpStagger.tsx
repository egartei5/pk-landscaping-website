'use client'
import { motion, useReducedMotion } from 'framer-motion'
import { ReactNode } from 'react'

interface FadeUpStaggerProps {
  children: ReactNode
  className?: string
  delay?: number
  stagger?: number
}

interface FadeUpItemProps {
  children: ReactNode
  className?: string
}

const containerVariants = {
  hidden: {},
  visible: (stagger: number) => ({
    transition: { staggerChildren: stagger },
  }),
}

const itemVariants = {
  hidden: { y: 30, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
}

const itemReducedVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.3 } },
}

export function FadeUpItem({ children, className = '' }: FadeUpItemProps) {
  const shouldReduce = useReducedMotion()
  return (
    <motion.div variants={shouldReduce ? itemReducedVariants : itemVariants} className={className}>
      {children}
    </motion.div>
  )
}

export default function FadeUpStagger({
  children,
  className = '',
  delay = 0,
  stagger = 0.08,
}: FadeUpStaggerProps) {
  return (
    <motion.div
      className={className}
      variants={containerVariants}
      custom={stagger}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-5%' }}
      transition={{ delayChildren: delay }}
    >
      {children}
    </motion.div>
  )
}
