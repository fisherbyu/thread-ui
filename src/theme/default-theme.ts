import { ThemeConfigFull } from '@/types/theme/theme.types';

export const DefaultThreadTheme: ThemeConfigFull = {
	// Color Palette
	primary: {
		light: '#5a7d6a',
		main: '#3c5c49',
		dark: '#2a4535',
	},
	secondary: {
		light: '#7a97b2',
		main: '#546f8d',
		dark: '#3b526a',
	},
	tertiary: {
		light: '#8c7389',
		main: '#6a546a',
		dark: '#4a3a4a',
	},
	// Neutral Colors
	white: '#ffffff',
	black: '#121212',
	gray: {
		light: '#e5e7eb',
		main: '#9ca3af',
		dark: '#4b5563',
	},
	// Status Colors
	success: {
		light: '#86efac',
		main: '#22c55e',
		dark: '#15803d',
	},
	warning: {
		light: '#fde68a',
		main: '#f59e0b',
		dark: '#b45309',
	},
	error: {
		light: '#fca5a5',
		main: '#ef4444',
		dark: '#b91c1c',
	},
	info: {
		light: '#93c5fd',
		main: '#3b82f6',
		dark: '#1d4ed8',
	},
	// Light Mode Surface Colors
	background: '#ffffff',
	surface: '#f9fafb',
	elevated: '#f3f4f6',
	structure: '#e2e8f0',
	// Light Mode Text Colors
	text: {
		standard: '#1f2937',
		secondary: '#4b5563',
		disabled: '#9ca3af',
		accent: '#3c5c49', // resolves to primary.main
		inverted: '#f9fafb', // resolves to dark mode text.standard
	},
	// Structure
	breakpoints: {
		sm: '0',
		md: '768',
		lg: '1024',
		xl: '1280',
		xxl: '1536',
	},
	// Sizing
	borderRadius: {
		sm: '0.25rem', // 4px
		md: '0.375rem', // 6px
		lg: '0.5rem', // 8px
	},
	borderSize: {
		sm: '1px',
		md: '2px',
		lg: '3px',
	},
	// Dark Mode Colors
	darkMode: {
		background: '#121212',
		surface: '#1e1e1e',
		elevated: '#2d2d2d',
		structure: '#4b5563',
		text: {
			standard: '#f9fafb',
			secondary: '#4b5563',
			disabled: '#6b7280',
			accent: '#3c5c49', // resolves to primary.main
			inverted: '#1f2937', // resolves to light mode text.standard
		},
	},
};
