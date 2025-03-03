/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'primary': {
          DEFAULT: '#3B82F6',
          dark: '#2563EB',
        },
        'secondary': {
          DEFAULT: '#10B981',
          dark: '#059669',
        },
        'dark': {
          DEFAULT: '#1F2937',
          lighter: '#374151',
          darker: '#111827',
        },
        'light': {
          DEFAULT: '#F3F4F6',
          darker: '#E5E7EB',
        },
      },
    },
  },
  plugins: [],
} 