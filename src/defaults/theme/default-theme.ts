import { Theme } from '../../types';

export const DEFAULT_THEME: Theme = {
	colors: {
		// Primary Color Themes
		primary: {
			light: '#0ea5e9',
			main: '#0284c7',
			dark: '#0c4a6e',
		},
		secondary: {
			light: '#86efac',
			main: '#22c55e',
			dark: '#14532d',
		},
		tertiary: {
			light: '#fbbf24',
			main: '#f59e0b',
			dark: '#78350f',
		},

		// Neutrals
		white: '#ffffff',
		gray: {
			light: '#f3f4f6',
			main: '#6b7280',
			dark: '#1f2937',
		},
		black: '#0a0a0a',

		// Status Colors
		success: {
			light: '#4ade80',
			main: '#16a34a',
			dark: '#14532d',
		},
		warning: {
			light: '#fcd34d',
			main: '#d97706',
			dark: '#78350f',
		},
		error: {
			light: '#f87171',
			main: '#dc2626',
			dark: '#7f1d1d',
		},
		info: {
			light: '#60a5fa',
			main: '#2563eb',
			dark: '#1e3a8a',
		},

		// Mode Specific
		light: {
			// Layers
			background: '#ffffff',
			structure: '#e5e7eb',
			surface: '#f8fafc',
			elevated: '#f8fafc',

			// Text
			text: {
				primary: '#18181b',
				secondary: '#18181b',
				disabled: '#71717a',
			},
		},
		dark: {
			// Layers
			background: '#0a0a0a',
			structure: '#e5e7eb',
			surface: '#A9A9A9',
			elevated: '#A9A9A9',

			// Text
			text: {
				primary: '#fafafa',
				secondary: '#fafafa',
				disabled: '#71717a',
			},
		},
	},

	// Borders
	border: {
		radius: {
			sm: 4,
			md: 6,
			lg: 8,
		},
		size: {
			sm: 0.5,
			md: 1,
			lg: 3,
		},
	},

	// Spacing Constant
	space: 8,
};
