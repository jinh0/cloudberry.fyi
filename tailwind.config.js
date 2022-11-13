/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        mcgill: '#ed1b2f'
      },
      keyframes: {
        fadeIn: {
          '0%': {
            transform: 'scale(0.9)',
          },
          '100%': { transform: 'scale(1)' },
        }
      },
      animation: {
        fadeIn: 'fadeIn 0.1s ease-in-out',
      }
    },
  },
  plugins: [],
}
