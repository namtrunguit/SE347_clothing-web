/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        "primary": "#19b3e6",
        "background-light": "#f6f7f8",
        "background-dark": "#111d21",
        "surface-light": "#ffffff",
        "surface-dark": "#1a2c32",
        "text-main": "#0e181b",
        "text-sub": "#4e8597",
        "text-secondary": "#4e8597",
      },
      fontFamily: {
        "display": ["Manrope", "sans-serif"]
      },
      borderRadius: {
        "DEFAULT": "0.25rem",
        "lg": "0.5rem",
        "xl": "0.75rem",
        "full": "9999px"
      },
    },
  },
  plugins: [],
}

