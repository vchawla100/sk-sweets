/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#FFF3ED',
          100: '#FFE7D9',
          200: '#FFCFB4',
          300: '#FFA87A',
          400: '#FF8F51',
          500: '#FF7E36', // Saffron orange
          600: '#F76A1F',
          700: '#E05A12',
          800: '#BC490F',
          900: '#9A3C0D',
        },
        secondary: {
          50: '#F1F6E8',
          100: '#E3EDD1',
          200: '#CBDCAB',
          300: '#B0C883',
          400: '#A1BE5C',
          500: '#92B73A', // Pistachio green
          600: '#7D9D32',
          700: '#68832A',
          800: '#546823',
          900: '#44551D',
        },
        accent: {
          50: '#FFECF0',
          100: '#FFD9E1',
          200: '#FFB3C3',
          300: '#FF8CA6',
          400: '#FF7692',
          500: '#FF5F7E', // Rose pink
          600: '#FF3A61',
          700: '#FF1644',
          800: '#F00031',
          900: '#D70029',
        },
        gold: {
          50: '#FEF8E9',
          100: '#FDF1D3',
          200: '#FAE3A7',
          300: '#F8D57B',
          400: '#F7C74F',
          500: '#F6B352', // Gold
          600: '#F4A121',
          700: '#E58A0A',
          800: '#BA7008',
          900: '#8F5606',
        },
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      animation: {
        'float': 'float 3s ease-in-out infinite',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
      },
    },
  },
  plugins: [],
};