import { Theme, ModeColors } from '@/types';
import { ThemeConfigFull } from '@/types/theme/theme.types';
import { wrapVariables } from './theme-helper-utils';

export const THREAD_CSS_VARIABLE_PREFIX = '--thread-' as const;

export const ThreadThemeCssNames: Theme = {
	// Color Palette
	primary: {
		light: 'primary-light',
		main: 'primary-main',
		dark: 'primary-dark',
	},
	secondary: {
		light: 'secondary-light',
		main: 'secondary-main',
		dark: 'secondary-dark',
	},
	tertiary: {
		light: 'tertiary-light',
		main: 'tertiary-main',
		dark: 'tertiary-dark',
	},

	// Neutral Colors
	white: 'white',
	black: 'black',
	gray: {
		light: 'gray-light',
		main: 'gray-main',
		dark: 'gray-dark',
	},

	// Status Colors
	success: {
		light: 'success-light',
		main: 'success-main',
		dark: 'success-dark',
	},
	warning: {
		light: 'warning-light',
		main: 'warning-main',
		dark: 'warning-dark',
	},
	error: {
		light: 'error-light',
		main: 'error-main',
		dark: 'error-dark',
	},
	info: {
		light: 'info-light',
		main: 'info-main',
		dark: 'info-dark',
	},

	// Surface Colors
	background: 'background',
	surface: 'surface',
	elevated: 'elevated',
	structure: 'structure',

	// Text Colors
	text: {
		standard: 'text-standard',
		secondary: 'text-secondary',
		disabled: 'text-disabled',
		accent: 'text-accent',
		inverted: 'text-inverted',
	},

	// Structure
	breakpoints: {
		sm: 'breakpoint-sm',
		md: 'breakpoint-md',
		lg: 'breakpoint-lg',
		xl: 'breakpoint-xl',
		xxl: 'breakpoint-xxl',
	},

	// Sizing
	borderRadius: {
		sm: 'border-radius-sm',
		md: 'border-radius-md',
		lg: 'border-radius-lg',
	},
	borderSize: {
		sm: 'border-size-sm',
		md: 'border-size-md',
		lg: 'border-size-lg',
	},
};

export const LightModeVariablesCssNames: ModeColors = {
	// Surfaces
	background: 'background-light-mode',
	surface: 'surface-light-mode',
	elevated: 'elevated-light-mode',
	structure: 'structure-light-mode',
	// Text
	text: {
		standard: 'text-standard-light-mode',
		secondary: 'text-secondary-light-mode',
		disabled: 'text-disabled-light-mode',
		accent: 'text-accent-light-mode',
		inverted: 'text-inverted-light-mode',
	},
};

export const DarkModeVariablesCssNames: ModeColors = {
	// Surfaces
	background: 'background-dark-mode',
	surface: 'surface-dark-mode',
	elevated: 'elevated-dark-mode',
	structure: 'structure-dark-mode',
	// Text
	text: {
		standard: 'text-standard-dark-mode',
		secondary: 'text-secondary-dark-mode',
		disabled: 'text-disabled-dark-mode',
		accent: 'text-accent-dark-mode',
		inverted: 'text-inverted-dark-mode',
	},
};

/**
 * Access object to connect to active CSS Theme variables
 */
export const ThreadTheme: Theme = wrapVariables(ThreadThemeCssNames, THREAD_CSS_VARIABLE_PREFIX);

/**
 * Access object to connect to explicit Light Mode CSS Theme variables
 */
export const LightModeVariables: ModeColors = wrapVariables(
	DarkModeVariablesCssNames,
	THREAD_CSS_VARIABLE_PREFIX
);

/**
 * Access object to connect to explicit Dark Mode CSS Theme variables
 */
export const DarkModeVariables: ModeColors = wrapVariables(
	DarkModeVariablesCssNames,
	THREAD_CSS_VARIABLE_PREFIX
);
