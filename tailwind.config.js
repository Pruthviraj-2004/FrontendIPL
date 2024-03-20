/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        bluee: "#071e34",
        blue: "#29349e",
        color: "#aa6f73",
        color1: "eea990",
        color2: "a39193",
        // primary: "#050816",
        secondary: "#aaa6c3",
        tertiary: "#151030",
        brown: "#210324",
        primary: {"50":"#eff6ff","100":"#dbeafe","200":"#bfdbfe","300":"#93c5fd","400":"#60a5fa","500":"#3b82f6","600":"#2563eb","700":"#1d4ed8","800":"#1e40af","900":"#1e3a8a","950":"#172554"}

      },
      boxShadow: {
        card: "0px 35px 120px -15px #211e35",
      },
      backgroundImage: {
        
      },
    },
  },
  plugins: [require("@tailwindcss/forms")],
};