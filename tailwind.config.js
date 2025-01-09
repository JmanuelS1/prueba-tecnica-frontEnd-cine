/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        mainGrey: "#424242",
        trailerGrey: "#343434",
        sideGrey: "#262626",
        inputGrey: "#1C1C1C",
        yellow: "#F0B90B",
        red100: "#DD4343",
        yellow100: "#FF8800",
        green100: "#4B9E4D",
        greenFluorescent: "#39ff14",
        detailText: "#F1CB51",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0", transform: "scale(0.95)" },
          "100%": { opacity: "1", transform: "scale(1)" },
        },
      },
    },
  },
  plugins: [],
};
