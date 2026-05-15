import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'pk-950': '#0a1a0b',
        'pk-900': '#0f2910',
        'pk-800': '#1a3d1a',
        'pk-700': '#2a5a2a',
        'pk-500': '#4caf50',
        'pk-400': '#6fcf73',
        'pk-off-white': '#f8f8f6',
        'pk-earth': '#f0ede8',
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
        heading: ['var(--font-montserrat)', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        '8xl': ['6rem', { lineHeight: '1' }],
        '9xl': ['8rem', { lineHeight: '1' }],
      },
      animation: {
        'fade-up': 'fadeUp 0.6s ease-out forwards',
        'count-up': 'countUp 1s ease-out forwards',
        'marquee': 'marquee 35s linear infinite',
        'marquee-reverse': 'marqueeReverse 35s linear infinite',
      },
      keyframes: {
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(24px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        marqueeReverse: {
          '0%': { transform: 'translateX(-50%)' },
          '100%': { transform: 'translateX(0)' },
        },
      },
    },
  },
  plugins: [],
}

export default config
