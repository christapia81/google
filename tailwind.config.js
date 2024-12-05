/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        // 👇 Add CSS variables
        sans: ["var(--font-opensans)"],
        mono: ["var(--font-roboto-mono)"],
      },
    },
  },
  plugins: [],
}

