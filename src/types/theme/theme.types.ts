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
	inverted: string;
};

export type TextColorOptions = keyof TextColors;

export type UtilitySizes = {
	sm: string;
	md: string;
	lg: string;
};

export type UtilitySizeOptions = keyof UtilitySizes;

export type BreakpointOptions = UtilitySizes & {
	xl: string;
	xxl: string;
};

export type ExpandedUtilitySizes = UtilitySizes & {
	xxs: string;
	xs: string;
	xl: string;
	xxl: string;
};

export type ExpandedUtilitySizeOptions = keyof ExpandedUtilitySizes;

export type Theme = ModeColors & {
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

	// Structure
	breakpoints: BreakpointOptions;

	// Sizing
	borderRadius: UtilitySizes;
	borderSize: UtilitySizes;
};

export type SurfaceColors = {
	background: string;
	surface: string;
	elevated: string;
	structure: string;
};

export type SurfaceColorOptions = keyof SurfaceColors;

export type ModeColors = SurfaceColors & {
	text: TextColors;
};

export type ThemeConfigFull = Theme & {
	darkMode: ModeColors;
};

export type ThemeConfig = DeepPartial<ThemeConfigFull>;
