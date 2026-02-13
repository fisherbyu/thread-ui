import { defineConfig } from '@pandacss/dev';
import { buttonRecipe } from './src/components/ui/button/button-recipe';

export default defineConfig({
	// File Intake and Output
	include: ['./src/**/*.{ts,tsx,js,jsx}'],
	outdir: 'src/styled-system',

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
			},
			semanticTokens: {
				colors: {
					background: { value: 'var(--thread-background)' },
					surface: { value: 'var(--thread-surface)' },
					elevated: { value: 'var(--thread-elevated)' },
					structure: { value: 'var(--thread-structure)' },
					text: {
						standard: { value: 'var(--thread-text-standard)' },
						secondary: { value: 'var(--thread-text-secondary)' },
						disabled: { value: 'var(--thread-text-disabled)' },
						accent: { value: 'var(--thread-text-accent)' },
						inverted: { value: 'var(--thread-text-inverted)' },
					},
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
