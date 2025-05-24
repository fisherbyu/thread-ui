import { DeepPartial } from '@/utils';

// Colors
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

export type Theme = {
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
	structure: string;

	// Text Colors
	text: TextColors;

	// Sizing/Structure
	borderRadius: UtilitySizes;
	borderSize: UtilitySizes;
};

export type DarkModeColors = {
	// Surface Colors
	background: string;
	surface: string;
	elevated: string;
	structure: string;

	// Text Colors
	text: TextColors;
};

export type ThemeConfigBase = Theme & {
	darkMode: DarkModeColors;
};

export type ThemeConfig = DeepPartial<ThemeConfigBase>;

export type ThemeSizes = {
	sm: number;
	md: number;
	lg: number;
	xl: number;
	xxl: number;
};
