import type { Config } from "tailwindcss";

export default {
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
			padding: '2rem',
			screens: {
				'2xl': '1400px'
			}
		},
		extend: {
			colors: {
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))',
					muted: 'hsl(var(--primary-muted))'
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
				}
			},
			fontFamily: {
				display: ['var(--font-display)', 'serif'],
				body: ['var(--font-body)', 'system-ui', 'sans-serif'],
				mono: ['JetBrains Mono', 'var(--font-mono)', 'monospace']
			},
			fontSize: {
				'display-xl': ['4.5rem', { lineHeight: '1', letterSpacing: '-0.02em' }],
				'display-lg': ['3.75rem', { lineHeight: '1.1', letterSpacing: '-0.02em' }],
				'display-md': ['3rem', { lineHeight: '1.15', letterSpacing: '-0.01em' }],
				'display-sm': ['2.25rem', { lineHeight: '1.2', letterSpacing: '-0.01em' }],
				'body-xl': ['1.25rem', { lineHeight: '1.6' }],
				'body-lg': ['1.125rem', { lineHeight: '1.6' }],
				'body-md': ['1rem', { lineHeight: '1.6' }],
				'body-sm': ['0.875rem', { lineHeight: '1.5' }]
			},
			spacing: {
				'section': '6rem',
				'section-sm': '4rem',
				'section-lg': '8rem'
			},
			maxWidth: {
				'container': 'var(--max-width)'
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			boxShadow: {
				'subtle': 'var(--shadow-subtle)',
				'medium': 'var(--shadow-medium)',
				'large': 'var(--shadow-large)'
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
				'fade-in-up': {
					'0%': { opacity: '0', transform: 'translateY(20px)' },
					'100%': { opacity: '1', transform: 'translateY(0)' }
				},
				'fade-in': {
					'0%': { opacity: '0' },
					'100%': { opacity: '1' }
				},
				'slide-in-right': {
					'0%': { opacity: '0', transform: 'translateX(20px)' },
					'100%': { opacity: '1', transform: 'translateX(0)' }
				},
				'hero-entrance': {
					'0%': { opacity: '0', transform: 'scale(0.95)' },
					'100%': { opacity: '1', transform: 'scale(1)' }
				},
				'fade-slide-up': {
					'0%': { opacity: '0', transform: 'translateY(30px)' },
					'100%': { opacity: '1', transform: 'translateY(0)' }
				},
				'nav-entrance': {
					'0%': { opacity: '0', transform: 'translateY(-20px) scale(0.95)' },
					'100%': { opacity: '1', transform: 'translateY(0) scale(1)' }
				},
				'nav-item': {
					'0%': { opacity: '0', transform: 'translateY(-10px)' },
					'100%': { opacity: '1', transform: 'translateY(0)' }
				},
				'scroll-reveal': {
					'0%': { opacity: '0', transform: 'translateY(32px) scale(0.98)' },
					'100%': { opacity: '1', transform: 'translateY(0) scale(1)' }
				},
				'scroll-reveal-fade': {
					'0%': { opacity: '0', transform: 'translateY(20px)', filter: 'blur(4px)' },
					'50%': { opacity: '0.6', transform: 'translateY(10px)', filter: 'blur(2px)' },
					'100%': { opacity: '1', transform: 'translateY(0)', filter: 'blur(0px)' }
				},
				'stagger-fade-in': {
					'0%': { opacity: '0', transform: 'translateY(16px)' },
					'100%': { opacity: '1', transform: 'translateY(0)' }
				},
				'smooth-entrance': {
					'0%': { opacity: '0', transform: 'translateY(24px) scale(0.96)' },
					'60%': { opacity: '0.8', transform: 'translateY(8px) scale(0.98)' },
					'100%': { opacity: '1', transform: 'translateY(0) scale(1)' }
				},
				'float': {
					'0%, 100%': { transform: 'translateY(0px)' },
					'50%': { transform: 'translateY(-10px)' }
				},
				'shimmer': {
					'0%': { backgroundPosition: '-200% 0' },
					'100%': { backgroundPosition: '200% 0' }
				},
				'slideInFromLeft': {
					'0%': { transform: 'translateX(-100%)', opacity: '0' },
					'100%': { transform: 'translateX(0)', opacity: '1' }
				},
				'slideInFromRight': {
					'0%': { transform: 'translateX(100%)', opacity: '0' },
					'100%': { transform: 'translateX(0)', opacity: '1' }
				},
				'scaleIn': {
					'0%': { transform: 'scale(0.9)', opacity: '0' },
					'100%': { transform: 'scale(1)', opacity: '1' }
				}
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				'fade-in-up': 'fade-in-up 0.6s ease-out',
				'fade-in': 'fade-in 0.4s ease-out',
				'slide-in-right': 'slide-in-right 0.5s ease-out',
				'hero-entrance': 'hero-entrance 1.2s cubic-bezier(0.23, 1, 0.320, 1)',
				'fade-slide-up': 'fade-slide-up 0.8s cubic-bezier(0.23, 1, 0.320, 1) both',
				'nav-entrance': 'nav-entrance 0.8s cubic-bezier(0.23, 1, 0.320, 1) 0.2s both',
				'nav-item': 'nav-item 0.6s cubic-bezier(0.23, 1, 0.320, 1) both',
				'scroll-reveal': 'scroll-reveal 0.8s cubic-bezier(0.23, 1, 0.320, 1) both',
				'scroll-reveal-fade': 'scroll-reveal-fade 1s cubic-bezier(0.23, 1, 0.320, 1) both',
				'stagger-fade-in': 'stagger-fade-in 0.6s cubic-bezier(0.23, 1, 0.320, 1) both',
				'smooth-entrance': 'smooth-entrance 0.9s cubic-bezier(0.23, 1, 0.320, 1) both',
				'stagger-in': 'fade-in-up 0.6s ease-out forwards',
				'parallax-float': 'float 6s ease-in-out infinite',
				'hover-bounce': 'scale-in 0.6s ease-in-out',
				'loading-pulse': 'shimmer 2s ease-in-out infinite',
				'icon-spin': 'spin 0.5s ease-in-out',
				'glow-pulse': 'pulse 2s ease-in-out infinite',
				'slide-left': 'slideInFromLeft 0.5s ease-out',
				'slide-right': 'slideInFromRight 0.5s ease-out',
				'scale-bounce': 'scaleIn 0.4s cubic-bezier(0.68, -0.55, 0.265, 1.55)'
			}
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
