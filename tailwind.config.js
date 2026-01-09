/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Inter"', 'system-ui', 'sans-serif'],
      },
      colors: {
        'brand-blue': {
          DEFAULT: '#0070CD',
          light: '#005bb0',
          lighter: 'rgba(0, 112, 205, 0.1)',
          'lighter-2': 'rgba(0, 112, 205, 0.2)',
        },
      },
    },
  },
  plugins: [],
}

