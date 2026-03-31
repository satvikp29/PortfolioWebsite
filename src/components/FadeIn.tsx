'use client'

import { useEffect, useRef, useState } from 'react'

interface FadeInProps {
  children: React.ReactNode
  delay?: number
  className?: string
  direction?: 'up' | 'none'
}

export default function FadeIn({
  children,
  delay = 0,
  className = '',
  direction = 'up',
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
      { threshold: 0.1 }
    )
    const el = ref.current
    if (el) observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform:
          direction === 'up'
            ? visible
              ? 'translateY(0)'
              : 'translateY(32px)'
            : undefined,
        transition: `opacity 0.85s cubic-bezier(0.65, 0.05, 0, 1) ${delay}ms, transform 0.85s cubic-bezier(0.65, 0.05, 0, 1) ${delay}ms`,
      }}
    >
      {children}
    </div>
  )
}
