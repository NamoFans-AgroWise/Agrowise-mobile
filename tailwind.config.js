/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    "./App.{js,jsx,ts,tsx}",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#10b77f',
          dark: '#0e9f6e',
          light: '#34d399',
        },
        surface: {
          light: '#ffffff',
          dark: '#1e293b',
        },
        background: {
          light: '#f6f8f7',
          dark: '#0f172a',
        },
        action: {
          DEFAULT: '#f59e0b',
          dark: '#d97706',
          light: '#fbbf24',
        },
        danger: {
          DEFAULT: '#DC2626',
          dark: '#b91c1c',
          light: '#ef4444',
        },
        secondary: '#8B5E3C',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        '2xl': '1rem',
        '3xl': '1.5rem',
        '4xl': '2rem',
      },
    },
  },
  plugins: [],
};
