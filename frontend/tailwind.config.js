/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        warm: {
          50: '#FAF6F0',
          100: '#F4ECE1',
          200: '#E8D5C1',
          300: '#D5B89B',
          400: '#BD9673',
          500: '#A57750',
          600: '#8B5E3C',
          700: '#70492D',
          800: '#55341E',
          900: '#3A2010',
        },
        brand: {
          50: '#FDFBF7',
          100: '#F5ECE0',
          200: '#E8D5C1',
          300: '#D5B89B',
          400: '#BD9673',
          500: '#A57750',
          600: '#8B5E3C', // Primary Warm Oak / Light Brown
          700: '#70492D',
          800: '#55341E',
          900: '#3A2010',
        },
        coffee: {
          50: '#FAF6F0',
          100: '#F4ECE1',
          200: '#E5D6C5',
          300: '#D4C3B3',
          400: '#B8A392',
          500: '#8B5E3C',
          600: '#70492D',
          700: '#674127',
          800: '#2E231C',
          900: '#1C120B'
        }
      }
    },
  },
  plugins: [],
}
