import type { Metadata } from 'next'
import { Cormorant_Garamond, Syne, DM_Mono } from 'next/font/google'
import Cursor from '@/components/Cursor'
import './globals.css'

const syne = Syne({
  subsets: ['latin'],
  variable: '--font-syne',
  weight: ['400', '500', '600', '700', '800'],
  display: 'swap',
})

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  variable: '--font-cormorant',
  weight: ['300', '400', '500', '600', '700'],
  display: 'swap',
})

const dmMono = DM_Mono({
  subsets: ['latin'],
  variable: '--font-dm-mono',
  weight: ['300', '400', '500'],
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Satvik Reddy Parvathareddy — Full Stack Developer · Dallas, TX',
  description:
    'Full stack developer based in Dallas, TX. Python, TypeScript, and AI powered applications built end to end.',
  openGraph: {
    title: 'Satvik Reddy Parvathareddy — Full Stack Developer · Dallas, TX',
    description:
      'Full stack developer based in Dallas, TX. Python, TypeScript, and AI powered applications.',
    type: 'website',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${syne.variable} ${cormorant.variable} ${dmMono.variable}`}>
      <body>
        <Cursor />
        <div className="grain-overlay" aria-hidden="true" />
        {children}
      </body>
    </html>
  )
}
