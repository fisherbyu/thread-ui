/** @type {import('tailwindcss').Config} */
export default {
	prefix: 'thread-',
	content: ['./src/**/*.{js,ts,jsx,tsx}'],
	theme: {
		extend: {
			colors: {
				primary: {
					light: 'var(--thread-primary-light)',
					DEFAULT: 'var(--thread-primary-main)',
					dark: 'var(--thread-primary-dark)',
				},
				secondary: {
					light: 'var(--thread-secondary-light)',
					DEFAULT: 'var(--thread-secondary-main)',
					dark: 'var(--thread-secondary-dark)',
				},
				tertiary: {
					light: 'var(--thread-tertiary-light)',
					DEFAULT: 'var(--thread-tertiary-main)',
					dark: 'var(--thread-tertiary-dark)',
				},
				white: 'var(--thread-white)',
				black: 'var(--thread-black)',
				gray: {
					light: 'var(--thread-gray-light)',
					DEFAULT: 'var(--thread-gray-main)',
					dark: 'var(--thread-gray-dark)',
				},
				success: {
					light: 'var(--thread-success-light)',
					DEFAULT: 'var(--thread-success-main)',
					dark: 'var(--thread-success-dark)',
				},
				warning: {
					light: 'var(--thread-warning-light)',
					DEFAULT: 'var(--thread-warning-main)',
					dark: 'var(--thread-warning-dark)',
				},
				error: {
					light: 'var(--thread-error-light)',
					DEFAULT: 'var(--thread-error-main)',
					dark: 'var(--thread-error-dark)',
				},
				info: {
					light: 'var(--thread-info-light)',
					DEFAULT: 'var(--thread-info-main)',
					dark: 'var(--thread-info-dark)',
				},
				// Surface layers
				canvas: 'var(--thread-canvas)',
				inset: 'var(--thread-inset)',
				surface: 'var(--thread-surface)',
				elevated: 'var(--thread-elevated)',
				overlay: 'var(--thread-overlay)',
				// Interactive states
				active: 'var(--thread-active)',
				hover: 'var(--thread-hover)',
				// Structure colors
				structure: {
					subtle: 'var(--thread-structure-subtle)',
					DEFAULT: 'var(--thread-structure-default)',
					strong: 'var(--thread-structure-strong)',
				},
				// Scrim
				scrim: 'var(--thread-scrim)',
				// Text
				text: {
					standard: 'var(--thread-text-standard)',
					secondary: 'var(--thread-text-secondary)',
					disabled: 'var(--thread-text-disabled)',
					accent: 'var(--thread-text-accent)',
					inverted: 'var(--thread-text-inverted)',
				},
			},
			boxShadow: {
				sm: 'var(--thread-shadow-sm)',
				md: 'var(--thread-shadow-md)',
				lg: 'var(--thread-shadow-lg)',
			},
			zIndex: {
				base: 'var(--thread-z-index-base)',
				sticky: 'var(--thread-z-index-sticky)',
				overlay: 'var(--thread-z-index-overlay)',
				modal: 'var(--thread-z-index-modal)',
				system: 'var(--thread-z-index-system)',
			},
			borderRadius: {
				sm: 'var(--thread-border-radius-sm)',
				md: 'var(--thread-border-radius-md)',
				lg: 'var(--thread-border-radius-lg)',
			},
			borderWidth: {
				sm: 'var(--thread-border-size-sm)',
				md: 'var(--thread-border-size-md)',
				lg: 'var(--thread-border-size-lg)',
			},
		},
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px',
			},
		},
	},
	plugins: [],
};
