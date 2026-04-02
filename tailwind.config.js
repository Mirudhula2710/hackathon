/** @type {import('tailwindcss').Config} */
const config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        saffron: '#FF9933',
        'india-green': '#138808',
        'navy-blue': '#000080',
      },
    },
  },
  plugins: [],
  darkMode: 'class',
}
export default config
