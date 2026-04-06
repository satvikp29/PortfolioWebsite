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
        bg:      '#090907',
        surface: '#0F0F0D',
        card:    '#161613',
        ink:     '#EEE9E1',
        muted:   '#5E5A54',
        dim:     '#312F2C',
        line: {
          DEFAULT: '#1F1E1B',
          2:       '#2A2926',
        },
        gold: {
          DEFAULT: '#C9A84C',
          bright:  '#E8C46A',
          dim:     '#8A6D2C',
          subtle:  'rgba(201,168,76,0.07)',
          border:  'rgba(201,168,76,0.18)',
        },
        // red aliased to gold so existing classes don't break
        red: {
          DEFAULT: '#C9A84C',
          light:   '#E8C46A',
          dim:     '#8A6D2C',
          subtle:  'rgba(201,168,76,0.07)',
          border:  'rgba(201,168,76,0.18)',
        },
        ember: '#D45A2A',
      },
      fontFamily: {
        sans:    ['var(--font-sans)',    'system-ui', 'sans-serif'],
        serif:   ['var(--font-display)', 'Georgia',   'serif'],
        display: ['var(--font-display)', 'Georgia',   'serif'],
        mono:    ['var(--font-mono)',    'Menlo',      'monospace'],
      },
      backgroundImage: {
        'gold-gradient': 'linear-gradient(135deg, #E8C46A 0%, #C9A84C 50%, #8A6D2C 100%)',
      },
      animation: {
        marquee:        'marquee 65s linear infinite',
        marqueeReverse: 'marqueeReverse 52s linear infinite',
        dataFlow:       'dataFlow 2.8s ease-in-out infinite',
        fadeUp:         'fadeUp 0.85s cubic-bezier(0.65,0.05,0,1) forwards',
      },
      keyframes: {
        marquee:        { '0%': { transform: 'translateX(0)' },       '100%': { transform: 'translateX(-50%)' } },
        marqueeReverse: { '0%': { transform: 'translateX(-50%)' },    '100%': { transform: 'translateX(0)' } },
        fadeUp:         { '0%': { opacity: '0', transform: 'translateY(30px)' }, '100%': { opacity: '1', transform: 'translateY(0)' } },
        dataFlow: {
          '0%':   { left: '0%',              opacity: '0' },
          '5%':   { opacity: '1' },
          '95%':  { opacity: '1' },
          '100%': { left: 'calc(100% - 32px)', opacity: '0' },
        },
      },
      transitionTimingFunction: {
        luxury: 'cubic-bezier(0.65, 0.05, 0, 1)',
        spring: 'cubic-bezier(0.34, 1.56, 0.64, 1)',
      },
    },
  },
  plugins: [],
}

export default config
