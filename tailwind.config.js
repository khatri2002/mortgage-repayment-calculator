/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        // Primary
        lime: "hsl(61, 70%, 52%)",
        red: "hsl(4, 69%, 50%)",

        // Neutral
        white: "hsl(0, 0%, 100%)",
        "slate-100": "hsl(202, 86%, 94%)",
        "slate-300": "hsl(203, 41%, 72%)",
        "slate-500": "hsl(200, 26%, 54%)",
        "slate-700": "hsl(200, 24%, 40%)",
        "slate-900": "hsl(202, 55%, 16%)",
      },
      fontFamily: {
        "plus-jakarta-sans": ["Plus Jakarta Sans", "serif"],
      },
    },
  },
  plugins: [],
};
