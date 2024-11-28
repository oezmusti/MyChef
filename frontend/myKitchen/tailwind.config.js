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
      'Patt1':{
        'Tan':'a6a278',
        'Sienna':'8c6436',
        'Darksalatgray': '2d3845',
        'palegoldenrod': 'f2e6ac',
      },
      'Patt2':{
        'Whitesmoke':'f0ebeb',
        'Lightgray':'d1d0d1',
        'lightsiena': '833e21',
        'Crimson': 'd61017',
      },
      'Patt3':{
        'Darksalatblue':'293854',
        'Gainsboro':'dadada',
        'black': '201f24',
        'Steelblue': '496bb2',
      },
      'Patt4':{
        'lightgainsboro':'e0e0e0',
        'Lightoka':'bca593',
        'rosybrown': '99755c',
        'darkslategreen': '374735',
      },
    },
  },
  plugins: [],
}