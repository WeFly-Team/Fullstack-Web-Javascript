/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          "blue": "#3E7BFA",
          "dark-blue": "#3040DC"
        }
      }
    }
  },
  plugins: []
};
