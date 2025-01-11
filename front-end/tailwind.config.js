 /** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#3C7CCC',
        secondary: '#696969',
      },
      fontFamily: {
        sans: ['Montserrat', 'sans-serif'], 
        montserrat: ['Montserrat', 'sans-serif'], 
      },
    },
  },
  plugins: [],
};