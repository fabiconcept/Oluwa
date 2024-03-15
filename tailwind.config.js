/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/index.html",
    "./src/**/*.html",
    "./src/**/*.js",
    // Add other file paths as needed
  ],
  theme: {
    extend: {
      colors: {
        'pot-pourri': {
          '50': '#faf4f2',
          '100': '#f0e1d8',
          '200': '#e7cec1',
          '300': '#d7ad9a',
          '400': '#c68671',
          '500': '#ba6a55',
          '600': '#ac584a',
          '700': '#8f463f',
          '800': '#743b38',
          '900': '#5f322f',
          '950': '#321818',
        },
        'big-stone': {
          '50': '#f3f8fc',
          '100': '#e6f1f8',
          '200': '#c8e2ef',
          '300': '#97c9e2',
          '400': '#60add0',
          '500': '#3b92bc',
          '600': '#2b769e',
          '700': '#245f80',
          '800': '#21506b',
          '900': '#20445a',
          '950': '#132735',
      },
      
      
      }
    },
  },
  plugins: [],
}

