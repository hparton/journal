const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  purge: [],
  darkMode: false, // or 'media' or 'class'
  theme: {
    colors: {
      background: '#0F0F10',
      sidebarBackground: '#151516',
      accent: '#D25E65',
      default: '#EEEFF1',
      sidebarText: '#EEEFF1',
      textOnAccent: '#FFFFFF',
      border: '#323235',
      inputBackground: '#161618',
      rightPaneBackground: '#161618'
    },
    extend: {
      fontFamily: {
        sans: ['Inter var', ...defaultTheme.fontFamily.sans],
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}
