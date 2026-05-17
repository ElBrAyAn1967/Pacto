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
        background: '#0a0a0a',
        surface: '#141414',
        'surface-elevated': '#1a1a1a',
        'surface-hover': '#242424',
        primary: {
          DEFAULT: '#00d1ff',
          hover: '#33daff',
          muted: 'rgba(0, 209, 255, 0.1)',
        },
        secondary: {
          DEFAULT: '#8b5cf6',
          hover: '#a78bfa',
        },
        border: {
          DEFAULT: '#27272a',
          hover: '#3f3f46',
        },
        text: {
          primary: '#ffffff',
          secondary: '#a1a1aa',
          muted: '#71717a',
        }
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'hero-glow': 'radial-gradient(ellipse 80% 50% at 50% -20%, rgba(0, 209, 255, 0.15), transparent)',
      },
      boxShadow: {
        'glow': '0 0 40px rgba(0, 209, 255, 0.15)',
        'card': '0 0 0 1px rgba(255, 255, 255, 0.03), 0 4px 24px rgba(0, 0, 0, 0.4)',
        'card-hover': '0 0 0 1px rgba(0, 209, 255, 0.1), 0 4px 24px rgba(0, 0, 0, 0.4)',
      },
      animation: {
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 6s ease-in-out infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        glow: {
          '0%': { boxShadow: '0 0 20px rgba(0, 209, 255, 0.2)' },
          '100%': { boxShadow: '0 0 40px rgba(0, 209, 255, 0.4)' },
        },
      },
    },
  },
  plugins: [],
}
