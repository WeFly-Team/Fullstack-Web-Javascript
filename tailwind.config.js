/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        /** Custom Colors disini */
        neutral: {
          '01': 'rgb(255, 255, 255)',
          '02': 'rgb(245, 245, 245)',
          '03': 'rgb(237, 237, 237)',
          '04': 'rgb(224, 224, 224)',
          '05': 'rgb(194, 194, 194)',
          '06': 'rgb(158, 158, 158)',
          '07': 'rgb(117, 117, 117)',
          '08': 'rgb(80, 80, 80)',
          '09': 'rgb(28, 28, 30)',
        },
        primary: {
          blue: 'rgb(62, 123, 250)',
          darkBlue: 'rgb(48, 64, 220)',
          brightBlue: 'rgb(58, 66, 255)',
          lightBlue: 'rgb(177, 197, 255)',
          violet: 'rgb(85, 50, 133)',
          darkViolet: 'rgb(54, 23, 94)',
          brightViolet: 'rgb(123, 82, 171)',
          lightViolet: 'rgb(62, 123, 250)',
        },
        secondary: {
          danger: 'rgb(203, 58, 49)',
          warning: 'rgb(241, 160, 37)',
          success: 'rgb(24, 175, 94)',
          star: 'rgb(255, 212, 58)',
        },
        tint: {
          black: 'rgba(0, 0, 0, 0.5)',
          red: 'rgba(203, 58, 49, 0.1)',
        },
      },
    },
    fontFamily: {
      sans: ['Open Sans', 'sans-serif'],
    },
  },
  plugins: [],
};
