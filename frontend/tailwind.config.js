/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        mint: {
          100: '#e6fff2', // Light mint background
          200: '#b3ffd9', // Border color
          500: '#00cc66', // Button background
          600: '#00b359', // Button hover
        },
      },
      fontFamily: {
        sans: ['Sans-serif', 'system-ui', 'Arial'],
        serif: ['Serif', 'Georgia', 'Times New Roman'],
      },
    },
  },
  plugins: [],
}
