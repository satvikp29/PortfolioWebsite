import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        bg: '#06060C',
        surface: '#0A0A16',
        card: '#0F0F1E',
        'card-hover': '#141428',
        gold: {
          DEFAULT: '#C9A96E',
          light: '#E2C98A',
          dim: '#6B5530',
          subtle: 'rgba(201,169,110,0.08)',
          border: 'rgba(201,169,110,0.18)',
        },
        cream: '#F0EAE0',
        muted: '#7A7468',
        dim: '#38342E',
        line: {
          DEFAULT: '#191929',
          light: '#21213A',
        },
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
        serif: ['var(--font-cormorant)', 'Georgia', 'serif'],
      },
      backgroundImage: {
        'grid-pattern':
          'linear-gradient(rgba(25,25,45,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(25,25,45,0.6) 1px, transparent 1px)',
        'gold-shimmer':
          'linear-gradient(105deg, transparent 35%, rgba(201,169,110,0.12) 50%, transparent 65%)',
        'gold-gradient':
          'linear-gradient(135deg, #E2C98A 0%, #C9A96E 45%, #9A7840 100%)',
      },
      backgroundSize: {
        grid: '72px 72px',
      },
      animation: {
        marquee: 'marquee 40s linear infinite',
        'fade-up': 'fadeUp 0.85s cubic-bezier(0.65, 0.05, 0, 1) forwards',
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      transitionTimingFunction: {
        luxury: 'cubic-bezier(0.65, 0.05, 0, 1)',
      },
    },
  },
  plugins: [],
}

export default config
