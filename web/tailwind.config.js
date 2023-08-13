/** @type {import('tailwindcss').Config} */
import defaultTheme from 'tailwindcss/defaultTheme'

module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
    "./pages/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    extend: {
      keyframes: {
        wiggle: {
          'from': { top: "-100px" },
        },
        sidebarPop: {
          'from': { marginLeft: "-400px" }
        },
        notifications: {
          'from': {
            marginTop: "-20px",
            opacity: ".5"
          }
        }
      },
      screens: {
        'sl': { 'max': '620px' },
        'slm': { 'max': '750px' },
        'nav1': { 'max': '810px' },
        'min-nav1': { 'min': '811px' },
        'mobile-footer': { 'max': '386px' },
        'mobile': { 'max': "500px" },
        'mobile-sm': { 'max': "282px" },
        'mobile-2sm': { 'max': "210px" },
        ...defaultTheme.screens
      }
    },

  },
  plugins: [],
}