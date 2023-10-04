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
        'background': '#545B63',
        'text-white': '#FEFDFF',
        'button-left': '#81667A',
        'button-cant-tell': '#223843',
        'button-right': '#8EB1C7'
      }
    },
    height: {
      video: '512px',
    },
  },
  plugins: [],
}
export default config
