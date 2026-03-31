import type { Metadata } from 'next'
import { Inter, Cormorant_Garamond } from 'next/font/google'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  variable: '--font-cormorant',
  weight: ['300', '400', '500', '600', '700'],
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Satvik Reddy Parvathareddy — Full Stack Developer',
  description:
    'Full stack developer specialising in Python, TypeScript, and AI-powered applications. Building production-grade tools end to end.',
  openGraph: {
    title: 'Satvik Reddy Parvathareddy — Full Stack Developer',
    description:
      'Full stack developer specialising in Python, TypeScript, and AI-powered applications.',
    type: 'website',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${cormorant.variable}`}>
      <body className="font-sans">{children}</body>
    </html>
  )
}
