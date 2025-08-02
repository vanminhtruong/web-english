/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    // Configure responsive breakpoints (mobile-first approach with min-width)
    screens: {
      // Min-width breakpoints for mobile-first design
      'xs': '480px',
      'sm': '640px',   // @media (min-width: 640px) - Large phones and up
      'md': '768px',   // @media (min-width: 768px) - Tablets and up  
      'lg': '1024px',  // @media (min-width: 1024px) - Desktops and up
      'xl': '1280px',  // @media (min-width: 1280px) - Large desktops and up
      '2xl': '1536px', // @media (min-width: 1536px) - Extra large screens and up
      
      // Max-width breakpoints for designing from large to small (use with max- prefix)
      'max-2xl': {'max': '1535px'}, // @media (max-width: 1535px)
      'max-xl': {'max': '1279px'},  // @media (max-width: 1279px)
      'max-lg': {'max': '1023px'},  // @media (max-width: 1023px)
      'max-md': {'max': '767px'},   // @media (max-width: 767px)
      'max-sm': {'max': '639px'},   // @media (max-width: 639px)
      'max-xs': {'max': '479px'},   // @media (max-width: 479px)
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

