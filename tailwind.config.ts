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
        bg: '#FAFAF8',
        surface: '#F2EFEB',
        card: '#E9E5E0',
        'card-hover': '#E0DBD5',
        red: {
          DEFAULT: '#C8102E',
          light: '#E51A38',
          dim: '#8A0A20',
          subtle: 'rgba(200,16,46,0.07)',
          border: 'rgba(200,16,46,0.2)',
        },
        ink: '#111111',
        muted: '#8A8070',
        dim: '#C0B8B0',
        line: {
          DEFAULT: '#E0DBD5',
          light: '#EBE7E2',
        },
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
        serif: ['var(--font-cormorant)', 'Georgia', 'serif'],
      },
      backgroundImage: {
        'red-shimmer':
          'linear-gradient(105deg, transparent 35%, rgba(200,16,46,0.06) 50%, transparent 65%)',
        'red-gradient':
          'linear-gradient(135deg, #E51A38 0%, #C8102E 50%, #8A0A20 100%)',
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
