/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        navy: {
          DEFAULT: '#0A2342',
          50: '#e8edf4',
          100: '#c5d0e3',
          200: '#9fb2d0',
          300: '#7994bd',
          400: '#5a7aad',
          500: '#3a619e',
          600: '#2d5090',
          700: '#1e3d78',
          800: '#122c62',
          900: '#0A2342',
        },
        gold: {
          DEFAULT: '#D4AF37',
          50: '#fdf8e1',
          100: '#faedb3',
          200: '#f6e281',
          300: '#f2d74f',
          400: '#efcd2c',
          500: '#D4AF37',
          600: '#c4a030',
          700: '#ae8c24',
          800: '#987818',
          900: '#6d560e',
        },
      },
      fontFamily: {
        poppins: ['Poppins', 'sans-serif'],
        inter: ['Inter', 'sans-serif'],
      },
      boxShadow: {
        'luxury': '0 4px 24px rgba(10, 35, 66, 0.08)',
        'luxury-lg': '0 8px 40px rgba(10, 35, 66, 0.12)',
        'gold': '0 4px 20px rgba(212, 175, 55, 0.3)',
      },
      borderRadius: {
        '2xl': '16px',
        '3xl': '20px',
        '4xl': '24px',
      },
      backgroundImage: {
        'hero-gradient': 'linear-gradient(135deg, rgba(10,35,66,0.9) 0%, rgba(10,35,66,0.7) 60%, rgba(0,0,0,0.4) 100%)',
        'navy-gradient': 'linear-gradient(135deg, #0A2342 0%, #1a3a6e 100%)',
        'gold-gradient': 'linear-gradient(135deg, #D4AF37 0%, #f0d060 100%)',
      },
      animation: {
        'fade-up': 'fadeUp 0.6s ease forwards',
        'fade-in': 'fadeIn 0.5s ease forwards',
        'count-up': 'fadeIn 0.5s ease forwards',
        'shimmer': 'shimmer 1.5s infinite',
        'pulse-slow': 'pulse 3s infinite',
        'marquee': 'marquee 30s linear infinite',
      },
      keyframes: {
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
      },
    },
  },
  plugins: [],
};
