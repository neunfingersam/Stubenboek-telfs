import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        alpine: {
          DEFAULT: '#1C2B1E',
          light: '#2D4A32',
        },
        gold: {
          DEFAULT: '#C8A96E',
          dark: '#A8894E',
        },
        cream: '#F7F4EF',
      },
      fontFamily: {
        serif: ['var(--font-playfair)', 'Georgia', 'serif'],
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
export default config
