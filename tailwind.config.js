/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: 'var(--font-roboto)',
      },
      colors: {
        orange: {
          500: '#D56720',
          600: '#BD5203',
          700: '#A24000',
        },
        gray: {
          100: '#DDDDDD',
          400: '#9B9B9B',
          800: '#4B4B4B',
          900: '#404040',
        },
      },
    },
  },
  plugins: [],
}
