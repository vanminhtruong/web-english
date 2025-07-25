/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    // Configure responsive breakpoints (max-width only - design from large to small)
    screens: {
      // Max-width breakpoints for designing from large to small
      '2xl': {'max': '1535px'}, // @media (max-width: 1535px) - Extra large screens
      'xl': {'max': '1279px'},  // @media (max-width: 1279px) - Large desktops
      'lg': {'max': '1023px'},  // @media (max-width: 1023px) - Desktops
      'md': {'max': '767px'},   // @media (max-width: 767px) - Tablets & Mobile
      'sm': {'max': '639px'},   // @media (max-width: 639px) - Large phones
      'xs': {'max': '479px'},   // @media (max-width: 479px) - Small phones
      
      // Portrait and landscape orientations
      'portrait': {'raw': '(orientation: portrait)'},
      'landscape': {'raw': '(orientation: landscape)'},
    },
    extend: {
      colors: {
        'dark-bg': '#000000',
        'dark-bg-soft': '#0a0a0a',
        'dark-bg-mute': '#0f0f0f',
        'gray-custom': '#0f0f0f',
      }
    },
  },
  plugins: [],
}

