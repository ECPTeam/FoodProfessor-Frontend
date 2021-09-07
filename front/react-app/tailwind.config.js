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
      lightYellow: '#FEE4C7',
      orange: '#ef9937',
      red: '#FF0000',
      darkRed: '#9a2719',
      lightGreen: '#92C031',
      brown: '#775424',
      alertColor: '#f8d7da',
      alertTextColor: '#721c24',
      alertBorderColor: '#f5c6cb',
      errorTextColor: '#856404',
      errorBgColor: '#fff3cd',
      errorBorderColor: '#ffeeba',
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
    maxWidth: {
      verySmall: '3rem',
      xs: '20rem',
      sm: '24rem',
      md: '28rem',
      lg: '32rem',
      xl: '36rem',
      '2xl': '42rem',
      '3xl': '48rem',
    },
  },
  important: true,
}
