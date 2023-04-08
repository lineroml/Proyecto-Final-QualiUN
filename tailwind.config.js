/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'ash-gray': '#AFBDB0',
        'chinese-blue': '#315098',
        'classic-rose': '#FBD0E0',
        'dust-storm': '#E4C0BE',
        'eerie-black': '#1E1E1E',
        'pewter-blue': '#8CA8BE',
        'comment-col-1': '#FF595E',
        'comment-col-2': '#FFCA3A',
        'comment-col-3': '#8AC926',
        'comment-col-4': '#1982C4',
        'comment-col-5': '#6A4C93',
      },
      fontFamily: {
        sans: ['var(--font-quicksand)', 'sans-serif'],
      },
      screens: {
        med: '810px',
        'med-lg': '950px',
        'med-sm': '875px',
        small: '430px',
      },
    },
  },
  plugins: [],
};
