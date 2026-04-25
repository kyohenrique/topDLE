/** @type {import('tailwindcss').Config} */
const config = {
  darkMode: "class",
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        nv: {
          green: "#76b900",
          bg: "#000000",
          surface: "#1a1a1a",
          "gray-300": "#a7a7a7",
          "gray-400": "#898989",
          "gray-500": "#757575",
          "gray-border": "#5e5e5e",
          "button-hover": "#1eaedb",
          "button-active": "#007fff",
        },
      },
      fontFamily: {
        sans: ["NVIDIA-EMEA", "Arial", "Helvetica", "sans-serif"],
      },
      boxShadow: {
        nv: "0 0 5px rgba(0, 0, 0, 0.3)",
      },
      borderRadius: {
        nv: "2px",
      },
    },
  },
};

export default config;
