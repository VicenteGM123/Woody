/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    container: {
      screens: {
        sm: "728px",
        md: "1000px",
        lg: "1224px",
        xl: "1548px",
        "2xl": "2324px",
      },
    },
    extend: {
      fontFamily: {
        inter: ["Inter", "sans-serif"],
        epilogue: ["Epilogue", "sans-serif"],
      },
    },
  },
  plugins: [],
};
