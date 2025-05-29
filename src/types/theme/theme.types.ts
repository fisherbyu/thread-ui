import { DeepPartial } from '@/types';

// Colors
type ColorShades = {
	light: string;
	main: string;
	dark: string;
};

export type TextColors = {
	standard: string;
	secondary: string;
	disabled: string;
	accent: string;
};

export type TextColorOptions = keyof TextColors;

export type UtilitySizes = {
	sm: string;
	md: string;
	lg: string;
};

export type UtilitySizeOptions = keyof UtilitySizes;

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

type ThemeConfigBase = Theme & {
	darkMode: DarkModeColors;
};

export type ThemeConfig = DeepPartial<ThemeConfigBase>;
