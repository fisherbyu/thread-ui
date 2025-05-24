import { Theme, DarkModeColors } from '@/types';

export const ThreadTheme: Theme = {
	// Color Palette
	primary: {
		light: 'var(--thread-primary-light)',
		main: 'var(--thread-primary-main)',
		dark: 'var(--thread-primary-dark)',
	},
	secondary: {
		light: 'var(--thread-secondary-light)',
		main: 'var(--thread-secondary-main)',
		dark: 'var(--thread-secondary-dark)',
	},
	tertiary: {
		light: 'var(--thread-tertiary-light)',
		main: 'var(--thread-tertiary-main)',
		dark: '	--thread-tertiary-dark)',
	},

	// Neutral Colors
	white: 'var(--thread-white)',
	black: 'var(--thread-black)',
	gray: {
		light: 'var(--thread-gray-light)',
		main: 'var(--thread-gray-main)',
		dark: 'var(--thread-gray-dark)',
	},

	// Status Colors
	success: {
		light: 'var(--thread-success-light)',
		main: 'var(--thread-success-main)',
		dark: 'var(--thread-success-dark)',
	},
	warning: {
		light: 'var(--thread-warning-light)',
		main: 'var(--thread-warning-main)',
		dark: 'var(--thread-warning-dark)',
	},
	error: {
		light: 'var(--thread-error-light)',
		main: 'var(--thread-error-main)',
		dark: 'var(--thread-error-dark)',
	},
	info: {
		light: 'var(--thread-info-light)',
		main: 'var(--thread-info-main)',
		dark: 'var(--thread-info-dark)',
	},

	// Surface Colors
	background: 'var(--thread-background)',
	surface: 'var(--thread-surface)',
	elevated: 'var(--thread-elevated)',
	structure: 'var(--thread-structure)',

	// Text Colors
	text: {
		standard: 'var(--thread-text-standard)',
		secondary: 'var(--thread-text-secondary)',
		disabled: 'var(--thread-text-disabled)',
		accent: 'var(--thread-text-accent)',
	},

	// Sizing/Structure
	borderRadius: {
		sm: 'var(--thread-border-radius-sm)',
		md: 'var(--thread-border-radius-md)',
		lg: 'var(--thread-border-radius-lg)',
	},
	borderSize: {
		sm: 'var(--thread-border-size-sm)',
		md: 'var(--thread-border-size-md)',
		lg: 'var(--thread-border-size-lg)',
	},
};

export const DarkModeVariables: DarkModeColors = {
	// Surfaces
	background: 'var(--thread-background-dark-mode)',
	surface: 'var(--thread-surface-dark-mode)',
	elevated: 'var(--thread-elevated-dark-mode)',
	structure: 'var(--thread-structure-dark-mode)',
	text: {
		standard: 'var(--thread-text-standard-dark-mode)',
		secondary: 'var(--thread-text-secondary-dark-mode)',
		disabled: 'var(--thread-text-disabled-dark-mode)',
		accent: 'var(--thread-text-accent-dark-mode)',
	},
};
