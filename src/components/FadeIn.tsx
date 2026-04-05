'use client'

import { useEffect, useRef, useState } from 'react'

interface FadeInProps {
  children: React.ReactNode
  delay?: number
  className?: string
  direction?: 'up' | 'none' | 'left'
  distance?: number
}

export default function FadeIn({
  children,
  delay = 0,
  className = '',
  direction = 'up',
  distance = 28,
}: FadeInProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.08 }
    )
    const el = ref.current
    if (el) observer.observe(el)
    return () => observer.disconnect()
  }, [])

  const getTransform = () => {
    if (direction === 'up') return visible ? 'translateY(0)' : `translateY(${distance}px)`
    if (direction === 'left') return visible ? 'translateX(0)' : `translateX(${distance}px)`
    return undefined
  }

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: getTransform(),
        transition: `opacity 0.9s cubic-bezier(0.65, 0.05, 0, 1) ${delay}ms, transform 0.9s cubic-bezier(0.65, 0.05, 0, 1) ${delay}ms`,
      }}
    >
      {children}
    </div>
  )
}
