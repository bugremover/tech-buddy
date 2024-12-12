// /** @type {import('tailwindcss').Config} */
// export default {
//   content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
//   theme: {
//     extend: {},
//   },
//   plugins: [
//     require('@tailwindcss/typography'),
//   ],
// };
<<<<<<< HEAD
// tailwind.config.js
// module.exports = {
//   content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
//   theme: {
//     extend: {},
//   },
//   plugins: [
//     require('@tailwindcss/typography'),
//   ],
// };
// tailwind.config.js
module.exports = {
=======
// @type {import('tailwindcss').Config}
import typography from '@tailwindcss/typography';

export default {
>>>>>>> 249c2448169fe0dcf56f64ffb3b61be25dca6d8b
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {},
  },
  plugins: [
    typography,
  ],
};
