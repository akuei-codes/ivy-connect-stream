import type { Config } from "tailwindcss";

export default {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: '1rem',
			screens: {
				'sm': '375px',
				'md': '768px',
				'lg': '1024px',
				'xl': '1280px',
				'2xl': '1400px'
			}
		},
		extend: {
			fontFamily: {
				'sans': ['Inter', 'system-ui', 'sans-serif'],
				'display': ['Plus Jakarta Sans', 'Inter', 'system-ui', 'sans-serif'],
			},
			colors: {
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))'
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				},
				sidebar: {
					DEFAULT: 'hsl(var(--sidebar-background))',
					foreground: 'hsl(var(--sidebar-foreground))',
					primary: 'hsl(var(--sidebar-primary))',
					'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
					accent: 'hsl(var(--sidebar-accent))',
					'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
					border: 'hsl(var(--sidebar-border))',
					ring: 'hsl(var(--sidebar-ring))'
				},
				// UniVerse specific colors
				'ivy': {
					'50': 'hsl(142 45% 95%)',
					'100': 'hsl(142 45% 90%)',
					'200': 'hsl(142 45% 80%)',
					'300': 'hsl(142 45% 70%)',
					'400': 'hsl(142 55% 60%)',
					'500': 'hsl(var(--ivy-primary))',
					'600': 'hsl(var(--ivy-primary-dark))',
					'700': 'hsl(142 79% 35%)',
					'800': 'hsl(142 79% 25%)',
					'900': 'hsl(142 79% 15%)',
				},
				'sage': 'hsl(var(--ivy-sage))',
				'forest': 'hsl(var(--ivy-primary-dark))',
				'surface': 'hsl(var(--surface))',
				'surface-elevated': 'hsl(var(--surface-elevated))',
			},
			borderRadius: {
				'xs': '8px',
				'sm': 'var(--radius-small)',
				'md': 'var(--radius)',
				'lg': 'var(--radius-large)',
				'xl': 'var(--radius-xl)',
				'2xl': '40px',
				'3xl': '48px',
				'full': '9999px',
			},
			boxShadow: {
				'ivy-soft': 'var(--shadow-soft)',
				'ivy-medium': 'var(--shadow-medium)',
				'ivy-large': 'var(--shadow-large)',
				'ivy-glow': 'var(--shadow-ivy-glow)',
			},
			backgroundImage: {
				'ivy-gradient': 'var(--gradient-primary)',
				'ivy-accent-gradient': 'var(--gradient-accent)',
				'ivy-surface-gradient': 'var(--gradient-surface)',
				'ivy-organic': 'var(--gradient-organic)',
			},
			spacing: {
				'mobile': '1rem',
				'mobile-lg': '1.5rem',
				'safe-top': 'env(safe-area-inset-top)',
				'safe-bottom': 'env(safe-area-inset-bottom)',
			},
			keyframes: {
				'accordion-down': {
					from: { height: '0' },
					to: { height: 'var(--radix-accordion-content-height)' }
				},
				'accordion-up': {
					from: { height: 'var(--radix-accordion-content-height)' },
					to: { height: '0' }
				},
				'fade-in': {
					'0%': { opacity: '0', transform: 'translateY(10px)' },
					'100%': { opacity: '1', transform: 'translateY(0)' }
				},
				'scale-in': {
					'0%': { opacity: '0', transform: 'scale(0.95)' },
					'100%': { opacity: '1', transform: 'scale(1)' }
				},
				'slide-up': {
					'0%': { opacity: '0', transform: 'translateY(20px)' },
					'100%': { opacity: '1', transform: 'translateY(0)' }
				},
				'ivy-float': {
					'0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
					'50%': { transform: 'translateY(-10px) rotate(2deg)' }
				},
				'ivy-pulse': {
					'0%, 100%': { opacity: '1', transform: 'scale(1)' },
					'50%': { opacity: '0.7', transform: 'scale(1.05)' }
				},
				'bounce-subtle': {
					'0%, 100%': { transform: 'translateY(0)' },
					'50%': { transform: 'translateY(-5px)' }
				}
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				'fade-in': 'fade-in 0.4s ease-out',
				'scale-in': 'scale-in 0.3s ease-out',
				'slide-up': 'slide-up 0.5s ease-out',
				'ivy-float': 'ivy-float 3s ease-in-out infinite',
				'ivy-pulse': 'ivy-pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
				'bounce-subtle': 'bounce-subtle 2s ease-in-out infinite'
			}
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
