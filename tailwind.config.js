/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        serif: ['Playfair Display', 'Georgia', 'serif'],
        sans: ['Inter', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'sans-serif'],
      },
      colors: {
        'brand-primary': '#FFFFFF',
        'brand-secondary': '#F7F6F3',
        'brand-gold': '#BFA15A',
        'brand-highlight': '#EFE6D3',
        'brand-text': '#1A1A1A',
        'brand-text-secondary': '#5F5F5F',
        'brand-footer': '#121212',
        'brand-border': '#E8E6E1',
      },
    },
  },
  plugins: [],
};
