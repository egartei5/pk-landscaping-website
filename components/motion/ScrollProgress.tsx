'use client'
import { useEffect, useState } from 'react'
import { motion, useScroll } from 'framer-motion'

export default function ScrollProgress() {
  const [isTouch, setIsTouch] = useState(true)
  const { scrollYProgress } = useScroll()

  useEffect(() => {
    if (!window.matchMedia('(pointer: coarse)').matches) {
      setIsTouch(false)
    }
  }, [])

  if (isTouch) return null

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-0.5 bg-pk-500 z-[200] origin-left"
      style={{ scaleX: scrollYProgress }}
    />
  )
}
