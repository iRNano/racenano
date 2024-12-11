/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}", // Scan all files in the app directory
    "./components/**/*.{js,ts,jsx,tsx}", // Add components directory if applicable
  ],
  theme: {
    extend: {
      colors: {
        primary: "#1D4ED8", // Example primary color
        secondary: "#9333EA", // Example secondary color
        background: "#F3F4F6", // Light gray background
        text: "#111827", // Dark text color
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"],
      },
    },
  },
  plugins: [],
};
