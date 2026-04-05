'use client'

import { useEffect, useRef, useState } from 'react'

interface TextRevealProps {
  children: React.ReactNode
  delay?: number
  className?: string
  as?: 'div' | 'span' | 'p'
}

export default function TextReveal({
  children,
  delay = 0,
  className = '',
  as: Tag = 'div',
}: TextRevealProps) {
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
      { threshold: 0.02 }
    )
    const el = ref.current
    if (el) observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <div ref={ref} className={`overflow-hidden ${className}`}>
      <Tag
        style={{
          display: Tag === 'span' ? 'block' : undefined,
          transform: visible ? 'translateY(0)' : 'translateY(112%)',
          opacity: visible ? 1 : 0.001,
          transition: `transform 1s cubic-bezier(0.65, 0.05, 0, 1) ${delay}ms, opacity 0.3s ease ${delay}ms`,
        }}
      >
        {children}
      </Tag>
    </div>
  )
}
