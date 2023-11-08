/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
      },
      boxShadow: {
        1: "rgba(50, 50, 93, 0.25) 0px 6px 12px -2px, rgba(0, 0, 0, 0.3) 0px 3px 7px -3px;",
      },
      backgroundImage: {
        "bg-gradient-blue": "linear-gradient(160deg, #0093E9 0%, #80D0C7 100%)",
      },
      colors: {
        primary: "#06b6d4",
        "c-orange": "#f97316",
      },
    },
  },
  plugins: [],
};
