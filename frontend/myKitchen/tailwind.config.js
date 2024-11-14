/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/pages/Home.jsx",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
    fontFamily: {
      'Roboto': ['Roboto'],
      'Work Sans': ['Work Sans'],
    }
  },
  plugins: [],
}