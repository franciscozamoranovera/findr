module.exports = {
    content: [
      "./src/**/*.{astro,html,js,jsx,ts,tsx}"
    ],
    theme: {
      extend: {},
    },
    plugins: [require('tailwind-scrollbar-hide')],
  }