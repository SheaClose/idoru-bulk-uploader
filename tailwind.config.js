/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,jsx}"],
  theme: {
    extend: {
      colors: {
        white: {
          DEFAULT: "#FFFFFF",
        },
        black: {
          DEFAULT: "#000000",
        },
        charcoal: {
          DEFAULT: "#191919",
        },
        pink: {
          DEFAULT: "#ed145b",
          900: "#c83782",
          100: "#f2437c",
        },
        btn: {
          DEFAULT: "#2a2b33",
        },
        btnHover: {
          DEFAULT: "#39353c",
        },
        btnText: {
          DEFAULT: "#888890",
        },
        btnTextHover: {
          DEFAULT: "#e4e6ed",
        },
      },
    },
    fontFamily: {
      sans: [
        "'Montserrat'",
        "'Public Sans'",
        "-apple-system",
        "BlinkMacSystemFont",
        "Roboto",
        "'Segoe UI'",
        "sans-serif",
      ],
    },
  },
  plugins: [],
};
