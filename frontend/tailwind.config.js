/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        inter: ['Inter', 'sans-serif'],
        roboto: ['Roboto', 'sans-serif'],
        merriweather: ['Merriweather', 'serif'],
        playfair: ['Playfair Display', 'serif'],
      },
    },
  },
  plugins: [],
}
