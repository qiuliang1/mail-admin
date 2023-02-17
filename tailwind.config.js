/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx}", './public/index.html'],
  theme: {
    extend: {
      
    },
  },
  plugins: [],
  corePlugins: {
    preflight: false // <== disable this!
  },
}
