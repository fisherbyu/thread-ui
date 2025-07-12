import { defineConfig } from '@pandacss/dev';
import { CONTAINER_STYLES } from './src/defaults';

export default defineConfig({
	// File Intake and Output
	include: ['./src/**/*.{ts,tsx,js,jsx}'],
	outdir: 'src/styled-system',

	// Define Access to Theme Variables
	theme: {
		extend: {
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
					// Surface colors with dark mode support
					background: {
						value: {
							base: 'var(--thread-background)',
							_dark: 'var(--thread-background-dark-mode)',
						},
					},
					surface: {
						value: {
							base: 'var(--thread-surface)',
							_dark: 'var(--thread-surface-dark-mode)',
						},
					},
					elevated: {
						value: {
							base: 'var(--thread-elevated)',
							_dark: 'var(--thread-elevated-dark-mode)',
						},
					},
					structure: {
						value: {
							base: 'var(--thread-structure)',
							_dark: 'var(--thread-structure-dark-mode)',
						},
					},
					// Text colors with dark mode support
					text: {
						standard: {
							value: {
								base: 'var(--thread-text-standard)',
								_dark: 'var(--thread-text-standard-dark-mode)',
							},
						},
						secondary: {
							value: {
								base: 'var(--thread-text-secondary)',
								_dark: 'var(--thread-text-secondary-dark-mode)',
							},
						},
						disabled: {
							value: {
								base: 'var(--thread-text-disabled)',
								_dark: 'var(--thread-text-disabled-dark-mode)',
							},
						},
						accent: {
							value: {
								base: 'var(--thread-text-accent)',
								_dark: 'var(--thread-text-accent-dark-mode)',
							},
						},
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
				return CONTAINER_STYLES as any;
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
});
