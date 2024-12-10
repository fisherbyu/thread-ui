export type BaseColorOptions = 'light' | 'medium' | 'dark';

export type ExpandedColorOptions = 'extra-light' | BaseColorOptions | 'extra-dark';

export type ColorShades = {
	light: string;
	medium: string;
	dark: string;
};

export type ExpandedColorShades = {
	'extra-light': string;
	light: string;
	medium: string;
	dark: string;
	'extra-dark': string;
};

export type ModeColorShades = {
	light: string;
	dark: string;
};

export type TextColorShades = {
	primary: ModeColorShades;
	// secondary: ModeColorShades;
	disabled: ModeColorShades;
};

export type AppliedTextColors = {
	primary: string;
	disabled: string;
};
