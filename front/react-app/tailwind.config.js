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
    screens: {
      maxXl: { max: '1280px' },
      maxLg: { max: '1024px' },
      maxMd: { max: '768px' },
      maxSm: { max: '640px' },
      minXl: { min: '1280px' },
      minLg: { min: '1024px' },
      minMd: { min: '768px' },
      minSm: { min: '640px' },
    },
    container: {
      center: true,
      padding: '1rem',
    },
  },
  important: true,
}
