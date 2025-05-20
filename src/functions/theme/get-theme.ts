import { createContext } from 'react';
import { deepMerge, DeepPartial } from '../../utils';

type ColorShades = {
	light: string;
	main: string;
	dark: string;
};

export type TextColors = {
	primary: string;
	secondary: string;
	disabled: string;
};

export type UtilitySizes = {
	sm: string;
	md: string;
	lg: string;
};

type Theme = {
	// Color Palette
	primary: ColorShades;
	secondary: ColorShades;
	tertiary: ColorShades;

	// Neutral Colors
	white: string;
	black: string;
	gray: ColorShades;

	// Status Colors
	success: ColorShades;
	warning: ColorShades;
	error: ColorShades;
	info: ColorShades;

	// Surface Colors
	background: string;
	surface: string;
	elevated: string;

	// Text Colors
	text: TextColors;

	// Sizing/Structure
	borderRadius: UtilitySizes;
	borderSize: UtilitySizes;
};

type DarkModeColors = {
	// Surface Colors
	background: string;
	surface: string;
	elevated: string;

	// Text Colors
	text: TextColors;
};

export type ThemeConfig = Theme & {
	darkMode: DarkModeColors;
};

const theme: Theme = {
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
		dark: '	--thread-tertiary-dark',
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

	// Text Colors
	text: {
		primary: '--thread-text-primary',
		secondary: '--thread-text-secondary',
		disabled: '--thread-text-disabled',
	},

	// Sizing/Structure
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

const darkVariables: DarkModeColors = {
	// Surfaces
	background: '--thread-background-dark-mode',
	surface: '--thread-surface-dark-mode',
	elevated: '--thread-elevated-dark-mode',
	text: {
		primary: '--thread-text-primary-dark-mode',
		secondary: '--thread-text-secondary-dark-mode',
		disabled: '--thread-text-disabled-dark-mode',
	},
};

export const setTheme = (userTheme: DeepPartial<Theme>) => {
	const { background, surface, elevated, text, ...staticStyles } = userTheme;
	const lightModeColors = {
		background,
		surface,
		elevated,
		text,
	};

	// We will need to add '-light-mode' to the end of the lightModeColors variable names
};

const ThemeContext = createContext<Theme>(theme);

// export const ThemeProvider({
//     children,
//     initialTheme
// }: {
//     children: ReactNode
// })

export const getThemeValue = (): Theme => {
	const wrapValue = (value: string): string => {
		return `var(${value})`;
	};

	const createThemeProxy = (obj: any): any => {
		if (typeof obj === 'string') {
			return wrapValue(obj);
		}

		return new Proxy(obj, {
			get(target, prop) {
				const value = target[prop as string | symbol];

				if (value !== null && typeof value === 'object') {
					return createThemeProxy(value);
				}

				if (typeof value === 'string') {
					return wrapValue(value);
				}

				return value;
			},
		});
	};

	return createThemeProxy(theme);
};

// export const createTheme = (userTheme?: DeepPartial<Theme>) => {
// 	if (userTheme) {
// 		const newTheme = deepMerge(theme, userTheme);
// 		return newTheme;
// 	} else {
// 		return theme;
// 	}
// };
