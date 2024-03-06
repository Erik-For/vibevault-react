/** @type {import('tailwindcss').Config} */
// https://flatuicolors.com/palette/gb


module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        gray: {
          850: "#172136"
        }
      },
      maxWidth: {
        '2/3': '66.666667%',
      },
      height: {
        "0.5": "0.5px",
        "3/8": "37.5%",
        "4/10": "40%",
        "8/10": "80%",
        "1/8": "12.5%",
        "1/10": "10%",
        "1/12": "8.333333%",
        "1/16": "6.25%",
        "15/16": "93.75%",
        "1/14": "7.15%",
      },
      width: {
        "3/10": "30%",
        "7/8": "87.5%",
      },
    },
  },
  plugins: [],
};
