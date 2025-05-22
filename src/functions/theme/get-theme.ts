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

export type ThemeConfigBase = Theme & {
	darkMode: DarkModeColors;
};

export type ThemeConfig = DeepPartial<ThemeConfigBase>;

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

export const setTheme = (userTheme: ThemeConfig) => {
	const { darkMode, ...staticStyles } = userTheme;
	const { background, surface, elevated, text, ...otherStaticStyles } = staticStyles;

	// Light mode colors need '-light-mode' suffix as mentioned in your comment
	const lightModeColors = {
		background,
		surface,
		elevated,
		text,
	};

	// Process non-mode-specific styles
	processThemeObject(otherStaticStyles, theme);

	// Process light mode colors with suffix
	if (lightModeColors) {
		processThemeObject(lightModeColors, theme, '-light-mode');
	}

	// Process dark mode styles if provided
	if (darkMode) {
		processThemeObject(darkMode, darkVariables);
	}
};

/**
 * Recursively processes a theme object, updating CSS variables
 * @param userObject The partial theme object provided by the user
 * @param themeObject The reference theme object containing CSS variable names
 * @param suffix Optional suffix to add to CSS variable names (for mode-specific variables)
 */
function processThemeObject(userObject: DeepPartial<any>, themeObject: any, suffix: string = '') {
	// Skip processing if the user object is null or undefined
	if (userObject === null || userObject === undefined) return;

	// Process each property in the user object
	Object.entries(userObject).forEach(([key, value]) => {
		// Get the corresponding theme value for this key
		const themeValue = themeObject?.[key];

		if (themeValue === undefined) return; // Skip if no matching theme property

		// If value is another object, recursively process it
		if (value !== null && typeof value === 'object' && typeof themeValue === 'object') {
			processThemeObject(value, themeValue, suffix);
		}
		// If we have a leaf value and a corresponding CSS variable name
		else if (value !== undefined && typeof themeValue === 'string') {
			// Update the CSS variable, adding the suffix for light mode variables
			console.log(themeValue, value.toString());
			document.documentElement.style.setProperty(themeValue + suffix, value.toString());
		}
	});
}

// const ThemeContext = createContext<Theme>(theme);

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
