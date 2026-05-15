'use client'
import { useEffect, useState } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

export default function CustomCursor() {
  const [hovering, setHovering] = useState(false)
  const [visible, setVisible] = useState(false)

  const rawX = useMotionValue(-100)
  const rawY = useMotionValue(-100)

  const dotX = useSpring(rawX, { stiffness: 500, damping: 30 })
  const dotY = useSpring(rawY, { stiffness: 500, damping: 30 })
  const ringX = useSpring(rawX, { stiffness: 200, damping: 22 })
  const ringY = useSpring(rawY, { stiffness: 200, damping: 22 })

  useEffect(() => {
    if (typeof window === 'undefined') return
    if (window.matchMedia('(pointer: coarse)').matches) return

    const onMove = (e: MouseEvent) => {
      rawX.set(e.clientX)
      rawY.set(e.clientY)
      setVisible(true)
    }

    const onOver = (e: MouseEvent) => {
      const el = e.target as HTMLElement
      setHovering(!!el.closest('a, button, [role="button"], input, textarea, label'))
    }

    window.addEventListener('mousemove', onMove)
    window.addEventListener('mouseover', onOver)
    return () => {
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('mouseover', onOver)
    }
  }, [rawX, rawY])

  if (!visible) return null

  return (
    <>
      <motion.div
        className="fixed z-[9999] pointer-events-none rounded-full bg-pk-500"
        style={{
          x: dotX,
          y: dotY,
          translateX: '-50%',
          translateY: '-50%',
          width: 8,
          height: 8,
        }}
      />
      <motion.div
        className="fixed z-[9998] pointer-events-none rounded-full border border-pk-400"
        style={{
          x: ringX,
          y: ringY,
          translateX: '-50%',
          translateY: '-50%',
        }}
        animate={{
          width: hovering ? 44 : 0,
          height: hovering ? 44 : 0,
          opacity: hovering ? 0.7 : 0,
        }}
        transition={{ duration: 0.2, ease: 'easeOut' }}
      />
    </>
  )
}
