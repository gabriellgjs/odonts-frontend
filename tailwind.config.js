/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ['class'],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1400px',
      },
    },
    extend: {
      backdropBlur: {
        tiny: '0.063rem',
        sm: '0.125rem',
      },
      fontFamily: {
        sans: 'var(--font-roboto)',
      },
      colors: {
        blue: {
          100: '#C5E1F3',
          200: '#9ECDEA',
          300: '#77B8DE',
          400: '#50A4CF',
          500: '#2290BE',
          600: '#007BA9',
          700: '#006791',
          800: '#005377',
          900: '#003F5B',
        },
        brown: {
          100: '#F0D8CC',
          200: '#E3BFAC',
          300: '#D3A78E',
          400: '#C29174',
          500: '#AE7B5D',
          600: '#986749',
          700: '#815438',
          800: '#69422B',
          900: '#503220',
        },
        orange: {
          100: '#FFD2B6',
          200: '#FFB589',
          300: '#F99961',
          400: '#E97F3F',
          500: '#D56720',
          600: '#BD5203',
          700: '#A24000',
          800: '#843100',
          900: '#662500',
        },
        gray: {
          100: '#DDDDDD',
          200: '#C6C6C6',
          300: '#B0B0B0',
          400: '#9B9B9B',
          500: '#868686',
          600: '#727272',
          700: '#5E5E5E',
          800: '#4B4B4B',
          900: '#404040',
        },
      },
      keyframes: {
        'accordion-down': {
          from: { height: 0 },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: 0 },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
}
