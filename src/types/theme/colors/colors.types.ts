export type BaseColorOptions = 'light' | 'medium' | 'dark';

export type ExpandedColorOptions = 'extra-light' | BaseColorOptions | 'extra-dark';

export type LevelColorOptions = 'light' | 'dark';

export type TextColorOptions = 'primary' | 'secondary' | 'disabled';

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
