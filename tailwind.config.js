/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        whirl: {
          coral: "#F2545B",
          purple: "#6C3BAA",
          yellow: "#F9B233",
          green: "#79C247",
          teal: "#00B4D8",
          dark: "#1A202C",
          cream: "#FAF8F5",
          sand: "#F4EFEA",
        }
      },
      fontFamily: {
        display: ['"Plus Jakarta Sans"', 'system-ui', 'sans-serif'],
        serif: ['"Playfair Display"', 'Georgia', 'serif'],
      }
    },
  },
  plugins: [],
}
