/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        'dark-bg': '#000000',
        'dark-bg-soft': '#0a0a0a',
        'dark-bg-mute': '#0f0f0f',
      }
    },
  },
  plugins: [],
}

