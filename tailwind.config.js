/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          black: "#0B0B0B",
          secondaryBlack: "#151515",
          white: "#FFFFFF",
          gray: "#D9D9D9",
          maroon: "#7A0E12",
          darkRed: "#9B111E",
        },
      },
      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
      },
      boxShadow: {
        glow: "0 0 0 1px rgba(155,17,30,0.35), 0 10px 40px rgba(155,17,30,0.2)",
      },
      backgroundImage: {
        "noise-pattern":
          "radial-gradient(circle at 20% 20%, rgba(255,255,255,0.06), transparent 45%), radial-gradient(circle at 80% 0%, rgba(122,14,18,0.2), transparent 40%)",
      },
    },
  },
  plugins: [],
};
