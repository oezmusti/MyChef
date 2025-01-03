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
    },
    colors: {
      'gold': {
        '50': '#f6f5f0',
        '100': '#e9e7d8',
        '200': '#d4d0b4',
        '300': '#bbb389',
        '400': '#a79a68',
        '500': '#9e8e5e',
        '600': '#82714c',
        '700': '#69583f',
        '800': '#5a4a39',
        '900': '#4e4135',
        '950': '#2c231c',
      },
      'white': '#FFF',
      'black': '#000',
    },
  },
  plugins: [],
}