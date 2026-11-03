/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        primary: "#004953",
        secondary: "#F9F07E",
        ink: "#06343b",
        muted: "#5c6b70",
        surface: "#f4f7f7",
        cream: "#fbf6df",
        footer: "#0c2429",
      },
      fontFamily: {
        sans: [
          "var(--font-montserrat)",
          "ui-sans-serif",
          "system-ui",
          "sans-serif",
        ],
      },
    },
  },
  plugins: [],
};
