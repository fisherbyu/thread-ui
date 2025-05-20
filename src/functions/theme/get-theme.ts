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

const theme: Theme = {
	// Color Palette
	primary: {
		light: '--primary-light',
		main: '--primary-main',
		dark: '--primary-dark',
	},
	secondary: {
		light: '--secondary-light',
		main: '--secondary-main',
		dark: '--secondary-dark',
	},
	tertiary: {
		light: '--tertiary-light',
		main: '--tertiary-main',
		dark: '	--tertiary-dark',
	},

	// Neutral Colors
	white: '--white',
	black: '--black',
	gray: {
		light: '--gray-light',
		main: '--gray-main',
		dark: '--gray-dark',
	},

	// Status Colors
	success: {
		light: '--success-light',
		main: '--success-main',
		dark: '--success-dark',
	},
	warning: {
		light: '--warning-light',
		main: '--warning-main',
		dark: '--warning-dark',
	},
	error: {
		light: '--error-light',
		main: '--error-main',
		dark: '--error-dark',
	},
	info: {
		light: '--info-light',
		main: '--info-main',
		dark: '--info-dark',
	},

	// Surface Colors
	background: '--background',
	surface: '--surface',
	elevated: '--elevated',

	// Text Colors
	text: {
		primary: '--text-primary',
		secondary: '--text-secondary',
		disabled: '--text-disabled',
	},

	// Sizing/Structure
	borderRadius: {
		sm: '--border-radius-sm',
		md: '--border-radius-md',
		lg: '--border-radius-lg',
	},
	borderSize: {
		sm: '--border-size-sm',
		md: '--border-size-md',
		lg: '--border-size-lg',
	},
};

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
