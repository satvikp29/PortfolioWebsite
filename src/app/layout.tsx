import type { Metadata } from 'next'
import { Fraunces, Bricolage_Grotesque, DM_Mono } from 'next/font/google'
import Cursor from '@/components/Cursor'
import SpotlightProvider from '@/components/SpotlightProvider'
import './globals.css'

const fraunces = Fraunces({
  subsets: ['latin'],
  variable: '--font-display',
  weight: ['300', '400', '500', '600', '700'],
  style: ['normal', 'italic'],
  display: 'swap',
})

const bricolage = Bricolage_Grotesque({
  subsets: ['latin'],
  variable: '--font-sans',
  weight: ['300', '400', '500', '600', '700', '800'],
  display: 'swap',
})

const dmMono = DM_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
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
    <html lang="en" className={`${fraunces.variable} ${bricolage.variable} ${dmMono.variable}`}>
      <body>
        <SpotlightProvider />
        <Cursor />
        <div className="grain-overlay" aria-hidden="true" />
        {children}
      </body>
    </html>
  )
}
