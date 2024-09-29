/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        zunda: {
          primary: {
            light: "#6FF1DA",
            dark: "#4BBBA7",
            pale: "#F5FFFD",
          },
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
