import { defineConfig } from '@pandacss/dev';
import { buttonRecipe } from './src/components/ui/button/button-recipe';

export default defineConfig({
	// File Intake and Output
	include: ['./src/**/*.{ts,tsx,js,jsx}'],
	exclude: ['./src/styled-system/**'],
	outdir: 'src/styled-system',
	outExtension: 'js',
	minify: true,

	// Prefix
	prefix: 'thread-ui',
	preflight: true,

	// Define Access to Theme Variables
	theme: {
		extend: {
			recipes: {
				button: buttonRecipe,
			},
			tokens: {
				colors: {
					// Primary colors
					primary: {
						light: { value: 'var(--thread-primary-light)' },
						main: { value: 'var(--thread-primary-main)' },
						dark: { value: 'var(--thread-primary-dark)' },
					},
					// Secondary colors
					secondary: {
						light: { value: 'var(--thread-secondary-light)' },
						main: { value: 'var(--thread-secondary-main)' },
						dark: { value: 'var(--thread-secondary-dark)' },
					},
					// Tertiary colors
					tertiary: {
						light: { value: 'var(--thread-tertiary-light)' },
						main: { value: 'var(--thread-tertiary-main)' },
						dark: { value: 'var(--thread-tertiary-dark)' },
					},
					// Neutral colors
					white: { value: 'var(--thread-white)' },
					black: { value: 'var(--thread-black)' },
					gray: {
						light: { value: 'var(--thread-gray-light)' },
						main: { value: 'var(--thread-gray-main)' },
						dark: { value: 'var(--thread-gray-dark)' },
					},
					// Status colors
					success: {
						light: { value: 'var(--thread-success-light)' },
						main: { value: 'var(--thread-success-main)' },
						dark: { value: 'var(--thread-success-dark)' },
					},
					warning: {
						light: { value: 'var(--thread-warning-light)' },
						main: { value: 'var(--thread-warning-main)' },
						dark: { value: 'var(--thread-warning-dark)' },
					},
					error: {
						light: { value: 'var(--thread-error-light)' },
						main: { value: 'var(--thread-error-main)' },
						dark: { value: 'var(--thread-error-dark)' },
					},
					info: {
						light: { value: 'var(--thread-info-light)' },
						main: { value: 'var(--thread-info-main)' },
						dark: { value: 'var(--thread-info-dark)' },
					},
					// Scrim
					scrim: { value: 'var(--thread-scrim)' },
				},
				// Border radius tokens
				radii: {
					sm: { value: 'var(--thread-border-radius-sm)' },
					md: { value: 'var(--thread-border-radius-md)' },
					lg: { value: 'var(--thread-border-radius-lg)' },
				},
				// Border size tokens
				borderWidths: {
					sm: { value: 'var(--thread-border-size-sm)' },
					md: { value: 'var(--thread-border-size-md)' },
					lg: { value: 'var(--thread-border-size-lg)' },
				},
				// Shadow tokens
				shadows: {
					sm: { value: 'var(--thread-shadow-sm)' },
					md: { value: 'var(--thread-shadow-md)' },
					lg: { value: 'var(--thread-shadow-lg)' },
				},
				// Z-index tokens
				zIndex: {
					base: { value: 'var(--thread-z-index-base)' },
					sticky: { value: 'var(--thread-z-index-sticky)' },
					overlay: { value: 'var(--thread-z-index-overlay)' },
					modal: { value: 'var(--thread-z-index-modal)' },
					system: { value: 'var(--thread-z-index-system)' },
				},
				// Font family tokens
				fonts: {
					body: { value: 'var(--thread-font-family-body)' },
					heading: { value: 'var(--thread-font-family-heading)' },
					mono: { value: 'var(--thread-font-family-mono)' },
				},
				// Font size tokens
				fontSizes: {
					heading: {
						sm: { value: 'var(--thread-font-size-heading-sm)' },
						md: { value: 'var(--thread-font-size-heading-md)' },
						lg: { value: 'var(--thread-font-size-heading-lg)' },
						xl: { value: 'var(--thread-font-size-heading-xl)' },
					},
					body: {
						xxs: { value: 'var(--thread-font-size-body-xxs)' },
						xs: { value: 'var(--thread-font-size-body-xs)' },
						sm: { value: 'var(--thread-font-size-body-sm)' },
						md: { value: 'var(--thread-font-size-body-md)' },
						lg: { value: 'var(--thread-font-size-body-lg)' },
						xl: { value: 'var(--thread-font-size-body-xl)' },
					},
				},
				// Font weight tokens
				fontWeights: {
					regular: { value: 'var(--thread-font-weight-regular)' },
					medium: { value: 'var(--thread-font-weight-medium)' },
					semibold: { value: 'var(--thread-font-weight-semibold)' },
					bold: { value: 'var(--thread-font-weight-bold)' },
				},
				// Line height tokens
				lineHeights: {
					tighter: { value: 'var(--thread-line-height-tighter)' },
					tight: { value: 'var(--thread-line-height-tight)' },
					normal: { value: 'var(--thread-line-height-normal)' },
					loose: { value: 'var(--thread-line-height-loose)' },
					looser: { value: 'var(--thread-line-height-looser)' },
				},
				// Letter spacing tokens
				letterSpacings: {
					tight: { value: 'var(--thread-letter-spacing-tight)' },
					normal: { value: 'var(--thread-letter-spacing-normal)' },
					wide: { value: 'var(--thread-letter-spacing-wide)' },
				},
			},
			semanticTokens: {
				colors: {
					// Surface layers
					canvas: { value: 'var(--thread-canvas)' },
					inset: { value: 'var(--thread-inset)' },
					surface: { value: 'var(--thread-surface)' },
					elevated: { value: 'var(--thread-elevated)' },
					overlay: { value: 'var(--thread-overlay)' },

					// Interactive surface states
					active: { value: 'var(--thread-active)' },
					hover: { value: 'var(--thread-hover)' },

					// Structure colors
					structure: {
						subtle: { value: 'var(--thread-structure-subtle)' },
						default: { value: 'var(--thread-structure-default)' },
						strong: { value: 'var(--thread-structure-strong)' },
					},

					// Text colors
					text: {
						standard: { value: 'var(--thread-text-standard)' },
						secondary: { value: 'var(--thread-text-secondary)' },
						disabled: { value: 'var(--thread-text-disabled)' },
						accent: { value: 'var(--thread-text-accent)' },
						inverted: { value: 'var(--thread-text-inverted)' },
					},
				},
			},
			keyframes: {
				spin: {
					from: { transform: 'rotate(0deg)' },
					to: { transform: 'rotate(360deg)' },
				},
				pulse: {
					'0%, 100%': { opacity: '1' },
					'50%': { opacity: '0.4' },
				},
				shimmer: {
					'0%': { backgroundPosition: '200% 0' },
					'100%': { backgroundPosition: '-200% 0' },
				},
			},
		},
	},

	// Patterns (Default Styles)
	patterns: {
		container: {
			description: 'Standard Container',
			properties: {},
			transform(props) {
				return {
					width: '100%',
					marginRight: 'auto',
					marginLeft: 'auto',
					maxWidth: '1400px',
					paddingRight: '2rem',
					paddingLeft: '2rem',
				} as any;
			},
		},
	},
	// CSS Layering
	layers: {
		reset: 'thread-reset',
		base: 'thread-base',
		tokens: 'thread-tokens',
		recipes: 'thread-recipes',
		utilities: 'thread-utilities',
	},

	// Static CSS Generation
	staticCss: {
		recipes: {
			button: ['*'], // Generate ALL variant combinations
		},
	},
});
