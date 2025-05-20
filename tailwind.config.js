/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      height: {
        'screen-minus-navbar': 'calc(100vh - 3.5rem)',
        'screen-minus-sidebar': 'calc(100vh - 12rem)',
      },
      width: {
        'screen-minus-sidebar': 'calc(100vh - 12rem)',
      }
    },
  plugins: [],
}
}

// /** @type {import('tailwindcss').Config} */
// export default {
//   content: [],
//   theme: {
//     colors: {
//       'blue': '#082F49"',
//       'green': '#4ADE80',
//       'esmerald': '#34D399',
//       'orange': '#F59E0B',
//       'gray': '#D6D3D1',
//       'light-gray': '#E5E5E5',
//       'black': '#000000',
//       'withe': '#FFFFFF'
//     },
//     fontFamily: {
//       'titles': ['Oswald', 'sans-serif'],
//       'text': ['Inter', 'sans-serif']
//     },
//     extend: {},
//   },
//   plugins: [],
// }
