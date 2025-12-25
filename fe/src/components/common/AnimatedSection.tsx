import { motion } from 'framer-motion'
import { ReactNode, useRef, useEffect, useState } from 'react'

interface AnimatedSectionProps {
  children: ReactNode
  delay?: number
  direction?: 'up' | 'down' | 'left' | 'right'
  className?: string
  once?: boolean
}

const AnimatedSection = ({
  children,
  delay = 0,
  direction = 'up',
  className = '',
  once = true,
}: AnimatedSectionProps) => {
  const [isVisible, setIsVisible] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          if (once && ref.current) {
            observer.unobserve(ref.current)
          }
        } else if (!once) {
          setIsVisible(false)
        }
      },
      { threshold: 0.05, rootMargin: '0px 0px -50px 0px' }
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current)
      }
    }
  }, [once])

  const directionMap = {
    up: { y: 30, x: 0 },
    down: { y: -30, x: 0 },
    left: { x: 30, y: 0 },
    right: { x: -30, y: 0 },
  }

  const initial = directionMap[direction]

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, ...initial }}
      animate={
        isVisible
          ? { opacity: 1, x: 0, y: 0 }
          : { opacity: 0, ...initial }
      }
      transition={{
        duration: 0.8,
        delay,
        ease: [0.25, 0.1, 0.25, 1],
      }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

export default AnimatedSection

