/** @type {import('tailwindcss').Config} */
import tailwindcssAnimate from 'tailwindcss-animate'
export default {
  darkMode: ['class'],
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}'
  ],
  theme: {
  	extend: {
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		},
  		colors: {
  			background: 'hsl(var(--background))',
  			foreground: 'hsl(var(--foreground))',
  			card: {
  				DEFAULT: 'hsl(var(--card))',
  				foreground: 'hsl(var(--card-foreground))'
  			},
  			popover: {
  				DEFAULT: 'hsl(var(--popover))',
  				foreground: 'hsl(var(--popover-foreground))'
  			},
  			primary: {
  				DEFAULT: 'hsl(var(--primary))',
  				foreground: 'hsl(var(--primary-foreground))'
  			},
  			secondary: {
  				DEFAULT: 'hsl(var(--secondary))',
  				foreground: 'hsl(var(--secondary-foreground))'
  			},
  			muted: {
  				DEFAULT: 'hsl(var(--muted))',
  				foreground: 'hsl(var(--muted-foreground))'
  			},
  			accent: {
  				DEFAULT: 'hsl(var(--accent))',
  				foreground: 'hsl(var(--accent-foreground))'
  			},
  			destructive: {
  				DEFAULT: 'hsl(var(--destructive))',
  				foreground: 'hsl(var(--destructive-foreground))'
  			},
  			border: 'hsl(var(--border))',
  			input: 'hsl(var(--input))',
  			ring: 'hsl(var(--ring))',
  			chart: {
  				'1': 'hsl(var(--chart-1))',
  				'2': 'hsl(var(--chart-2))',
  				'3': 'hsl(var(--chart-3))',
  				'4': 'hsl(var(--chart-4))',
  				'5': 'hsl(var(--chart-5))'
  			},
        'mainColor1': {
          100:  '#9595C9',
          200: '#8786C0',
          400: '#6666AE',
          600: '#464B9F',
          800: '#2F2F89'
        },
        'mainColor2': {
          100: '#CEACD1',
          300: '#C29BC8',
          800: '#854C9D'
        },
        'mainBg': { 100: '#FFFFFF' }
  		},
      keyframes: {
        fadeIn: {
          from: { opacity: 0 },
          to: { opacity: 1 }
        },
        fadeInTop: {
          '0%': { transform: 'translateY(-30px)', opacity: 0 }, '100%': { transform: 'translateY(0)', opacity: 1 }
        }
      },
      animation: {
        fadeIn: 'fadeIn .7s ease-in-out',
        fadeInTop: 'fadeInTop 1.5s ease 0s normal none'
      }
  	}
  },
  plugins: [tailwindcssAnimate]
}

