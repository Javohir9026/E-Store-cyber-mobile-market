/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
    screens: {
      'xs': '480px',     // telefon
      'sm': '640px',     // kichik
      'md': '768px',     // planshet
      'lg': '1024px',    // laptop
      'xl': '1280px',    // katta ekran
      '2xl': '1536px',   // juda katta
      'te': '950px', // o'zingcha breakpoint
    },
  },
  plugins: [],
};
