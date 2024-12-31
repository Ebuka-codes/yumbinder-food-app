/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {},
    screens: {
      xs: '360px',
      sm: '640px',
      md: '760px',
      lg: '960px',
      ml: '990px',
      xl: '1200px',
      '2xl': '1536px',
    },
  },
  plugins: [],
};
