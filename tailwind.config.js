const colors = require('tailwindcss/colors')

module.exports = {
  purge: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    colors: {
      transparent: 'transparent',
      black: colors.black,
      white: colors.white,
      gray: colors.trueGray,
      indigo: colors.indigo,
      red: colors.rose,
      yellow: colors.amber,
      primary: '#adbac7',
      muted: '#3734e7',
      default: '#22272e'
    },
    extend: {
      borderColor: {

      }
    }
  },
  variants: {
    extend: {}
  },
  plugins: []
}
