module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [],
  theme: {
    colors: {
      white: '#ffffff',
      orange: '#ef9937',
      darkRed: '#9a2719',
      lightGreen: '#92C031',
      brown: '#775424',
    },
  },
  important: true,
}
