/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,jsx}',
  ],
  theme: {
    extend: {
      colors: {
        base: '#080A0C',
        surface: '#111418',
        amber: '#C9A84C',
        arctic: '#4A90B8',
        headline: '#F0E8D8',
        primary: '#E8E0D0',
        secondary: '#6A6A62',
      },
      fontFamily: {
        display: ['Instrument Serif', 'Georgia', 'serif'],
        mono: ['JetBrains Mono', 'ui-monospace', 'monospace'],
        sans: ['Geist', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
