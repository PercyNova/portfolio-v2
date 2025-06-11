module.exports = {
  content: [
    './public/**/*.html',
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  darkMode: 'media',
  theme: {
    extend: {
      colors: {
        primary: '#1DB954',
        secondary: '#121212',
      },
      backgroundImage: {
        // Updated path to correctly reference the image in your project structure
        'main-bg': "url('../assets/images/bg.jpg')",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};