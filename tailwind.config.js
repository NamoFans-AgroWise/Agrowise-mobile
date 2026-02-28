/** @type {import('tailwindcss').Config} */
module.exports = {
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
          dark: '#0a8f61',
          light: '#34d399',
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
        surface: {
          light: '#ffffff',
          dark: '#1a332a',
        },
        background: {
          light: '#f0fdf4',
          dark: '#10221c',
        },
        text: {
          main: {
            light: '#0d1b17',
            dark: '#e0e7e5',
          },
          sub: {
            light: '#4c9a80',
            dark: '#8abeb0',
          },
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
