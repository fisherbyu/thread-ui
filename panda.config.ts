import { defineConfig } from '@pandacss/dev';
import { CONTAINER_STYLES } from './src/defaults';

export default defineConfig({
	// File Intake and Output
	include: ['./src/**/*.{ts,tsx,js,jsx}'],
	outdir: 'src/styled-system',

	// Define Access to Theme Variables
	theme: {
		extend: {
			semanticTokens: {
				// Color Palette
				colors: {
					// Primary
					'primary.light': { value: 'var(--thread-primary-light)' },
					'primary.main': { value: 'var(--thread-primary-main)' },
					'primary.dark': { value: 'var(--thread-primary-dark)' },

					// Secondary
					'secondary.light': { value: 'var(--thread-secondary-light)' },
					'secondary.main': { value: 'var(--thread-secondary-main)' },
					'secondary.dark': { value: 'var(--thread-secondary-dark)' },

					// Tertiary
					'tertiary.light': { value: 'var(--thread-tertiary-light)' },
					'tertiary.main': { value: 'var(--thread-tertiary-main)' },
					'tertiary.dark': { value: 'var(--thread-tertiary-dark)' },

					// Neutrals
					'theme.white': { value: 'var(--thread-white)' },
					'theme.black': { value: 'var(--thread-black)' },
					'gray.light': { value: 'var(--thread-gray-light)' },
					'gray.main': { value: 'var(--thread-gray-main)' },
					'gray.dark': { value: 'var(--thread-gray-dark)' },

					// Status
					// Success
					'success.light': { value: 'var(--thread-success-light)' },
					'success.main': { value: 'var(--thread-success-main)' },
					'success.dark': { value: 'var(--thread-success-dark)' },

					// Warning
					'warning.light': { value: 'var(--thread-warning-light)' },
					'warning.main': { value: 'var(--thread-warning-main)' },
					'warning.dark': { value: 'var(--thread-warning-dark)' },

					// Error
					'error.light': { value: 'var(--thread-error-light)' },
					'error.main': { value: 'var(--thread-error-main)' },
					'error.dark': { value: 'var(--thread-error-dark)' },

					// Info
					'info.light': { value: 'var(--thread-info-light)' },
					'info.main': { value: 'var(--thread-info-main)' },
					'info.dark': { value: 'var(--thread-info-dark)' },

					// Surface Colors
					'theme.background': { value: 'var(--thread-background)' },
					'theme.surface': { value: 'var(--thread-surface)' },
					'theme.elevated': { value: 'var(--thread-elevated)' },
					'theme.structure': { value: 'var(--thread-structure)' },
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
