/** @type {import('tailwindcss').Config} */
const config = {
  darkMode: "class",
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        kraken: {
          purple: "#7132f5",
          "purple-dark": "#5741d8",
          "purple-deep": "#5b1ecf",
          text: "#101114",
          muted: "#686b82",
          border: "#dedee5",
          success: "#149e61",
        },
      },
      fontFamily: {
        sans: ["Kraken-Product", "Helvetica Neue", "Helvetica", "Arial", "sans-serif"],
        brand: ["Kraken-Brand", "IBM Plex Sans", "Helvetica", "Arial", "sans-serif"],
      },
      boxShadow: {
        kraken: "0px 4px 24px rgba(0, 0, 0, 0.03)",
      },
      borderRadius: {
        kraken: "12px",
      },
    },
  },
};

export default config;
