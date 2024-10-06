/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        zunda: {
          primary: "#07CAA8",
          secondary: "#AF83E8",
          "secondary-pale": "#F6F0FF",
          black: "#000000",
          white: "#FFFFFF",
          gray: "#868686",
        },
      },
      fontSize: {
        "zunda-t1": "48px",
        "zunda-t2": "24px",
        "zunda-body": "16px",
        "zunda-caption": "12px",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
