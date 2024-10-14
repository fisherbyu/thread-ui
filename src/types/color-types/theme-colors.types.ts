import { ThemePalette } from './theme-palette.types';

export type ThemeColors = ThemePalette & {
	success: string;
	'success-light': string;

	error: string;
	'error-light': string;

	warning: string;
	'warning-light': string;

	info: string;
	'info-light': string;
};
