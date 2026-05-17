/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#fdf2f2',
          100: '#fce7e7',
          200: '#f9d0d0',
          300: '#f4a9a9',
          400: '#ec7777',
          500: '#e04e4e',
          600: '#cd3333',
          700: '#ac2727',
          800: '#8e2424',
          900: '#762222',
        },
        avalanche: {
          red: '#E84142',
          dark: '#1A1A1A',
        }
      },
    },
  },
  plugins: [],
}
