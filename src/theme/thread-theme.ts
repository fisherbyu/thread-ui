import { Theme, ModeColors } from '@/types';
import { ThemeConfigFull } from '@/types/theme/theme.types';

// Helper Types and Functions
// Recursivley transform all string values
type VariableWrapper<T> = T extends string
	? `var(${T})`
	: T extends object
		? { [K in keyof T]: VariableWrapper<T[K]> }
		: T;

// Wrap CSS variable names in var()
function wrapInVar<T>(obj: T): VariableWrapper<T> {
	if (typeof obj === 'string') {
		return `var(${obj})` as VariableWrapper<T>;
	}

	if (typeof obj === 'object' && obj !== null) {
		const result: any = {};
		for (const key in obj) {
			result[key] = wrapInVar(obj[key]);
		}
		return result;
	}

	return obj as VariableWrapper<T>;
}

export const ThreadThemeCssNames: Theme = {
	// Color Palette
	primary: {
		light: '--thread-primary-light',
		main: '--thread-primary-main',
		dark: '--thread-primary-dark',
	},
	secondary: {
		light: '--thread-secondary-light',
		main: '--thread-secondary-main',
		dark: '--thread-secondary-dark',
	},
	tertiary: {
		light: '--thread-tertiary-light',
		main: '--thread-tertiary-main',
		dark: '--thread-tertiary-dark',
	},

	// Neutral Colors
	white: '--thread-white',
	black: '--thread-black',
	gray: {
		light: '--thread-gray-light',
		main: '--thread-gray-main',
		dark: '--thread-gray-dark',
	},

	// Status Colors
	success: {
		light: '--thread-success-light',
		main: '--thread-success-main',
		dark: '--thread-success-dark',
	},
	warning: {
		light: '--thread-warning-light',
		main: '--thread-warning-main',
		dark: '--thread-warning-dark',
	},
	error: {
		light: '--thread-error-light',
		main: '--thread-error-main',
		dark: '--thread-error-dark',
	},
	info: {
		light: '--thread-info-light',
		main: '--thread-info-main',
		dark: '--thread-info-dark',
	},

	// Surface Colors
	background: '--thread-background',
	surface: '--thread-surface',
	elevated: '--thread-elevated',
	structure: '--thread-structure',

	// Text Colors
	text: {
		standard: '--thread-text-standard',
		secondary: '--thread-text-secondary',
		disabled: '--thread-text-disabled',
		accent: '--thread-text-accent',
		inverted: '--thread-text-inverted',
	},

	// Structure
	breakpoints: {
		sm: '--thread-breakpoint-sm',
		md: '--thread-breakpoint-md',
		lg: '--thread-breakpoint-lg',
		xl: '--thread-breakpoint-xl',
		xxl: '--thread-breakpoint-xxl',
	},

	// Sizing
	borderRadius: {
		sm: '--thread-border-radius-sm',
		md: '--thread-border-radius-md',
		lg: '--thread-border-radius-lg',
	},
	borderSize: {
		sm: '--thread-border-size-sm',
		md: '--thread-border-size-md',
		lg: '--thread-border-size-lg',
	},
};

export const DarkModeVariablesCssNames: ModeColors = {
	// Surfaces
	background: '--thread-background-dark-mode',
	surface: '--thread-surface-dark-mode',
	elevated: '--thread-elevated-dark-mode',
	structure: '--thread-structure-dark-mode',
	text: {
		standard: '--thread-text-standard-dark-mode',
		secondary: '--thread-text-secondary-dark-mode',
		disabled: '--thread-text-disabled-dark-mode',
		accent: '--thread-text-accent-dark-mode',
		inverted: '--thread-text-inverted-dark-mode',
	},
};

/**
 * Access object to connect to active CSS Theme variables
 */
export const ThreadTheme: Theme = wrapInVar<Theme>(ThreadThemeCssNames);

/**
 * Access object to connect to explicit Dark Mode CSS Theme variables
 */
export const DarkModeVariables: ModeColors = wrapInVar<ModeColors>(DarkModeVariablesCssNames);
