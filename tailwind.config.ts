/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    screens: {
      280: "280px",
      375: "375px",
      430: "430px",
      640: "640px",
      768: "768px",
      1024: "1024px",
      1280: "1280px",
    },
    extend: {},
  },
  plugins: [],
};
