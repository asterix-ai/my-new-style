/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html"
  ],
  theme: {
    extend: {
      colors: {
        indigo: {
          500: '#6366f1',
          600: '#4f46e5',
          700: '#4338ca',
        },
        purple: {
          500: '#8b5cf6',
          600: '#7c3aed',
          700: '#6d28d9',
        },
        cyan: {
          500: '#06b6d4',
          600: '#0891b2',
        },
        rose: {
          500: '#f43f5e',
          600: '#e11d48',
        },
        pink: {
          500: '#ec4899',
        },
      }
    },
  },
  plugins: [],
}