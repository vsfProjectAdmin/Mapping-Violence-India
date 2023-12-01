/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'main': '#260c1a',
        'font': '#bdd9bf',
        'secondary': '#fcaa67',
        'logo': '#8f6e5d',
      },
    },
  },
  plugins: [],
}