/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "white-linear-gradient":
          "linear-gradient(to right bottom, rgb(255, 255, 255) 30%, rgba(255, 255, 255, 0.38))",
        "black-radial-gradient": "radial-gradient(#0e1720, #0e1b2c)",
      },
      colors: {
        gray: {
          50: "#c8d1d9",
          900: "#1c1b22",
        },
        white: "#f0f6fc",
        blue: {
          500: "#0070F3",
        },
        black: "#0d1116",
      },
    },
  },
  plugins: [],
}
