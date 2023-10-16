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
        'background': '#FFF2D8',
        'dark-background': '#BCA37F',
        'light-background': '#EAD7BB',
        'navy': '#113946',
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
