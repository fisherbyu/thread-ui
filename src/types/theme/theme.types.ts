import { DeepPartial } from '@/types';

/** Three-step color scale for brand and semantic colors */
type ColorShades = {
	light: string;
	main: string;
	dark: string;
};

/** Semantic text color roles */
export type TextColors = {
	standard: string;
	secondary: string;
	disabled: string;
	accent: string;
	inverted: string;
};

/** Key union of available text color roles */
export type TextColorOptions = keyof TextColors;

/** Base three-step size scale used across utility components */
export type UtilitySizes = {
	sm: string;
	md: string;
	lg: string;
};

/** Key union of the base size scale */
export type UtilitySizeOptions = keyof UtilitySizes;

/** Size scale extended with responsive breakpoint steps */
export type BreakpointOptions = UtilitySizes & {
	xl: string;
	xxl: string;
};

/** Full size scale including sub-small and extra-large steps */
export type ExpandedUtilitySizes = UtilitySizes & {
	xxs: string;
	xs: string;
	xl: string;
	xxl: string;
};

/** Key union of the full expanded size scale */
export type ExpandedUtilitySizeOptions = keyof ExpandedUtilitySizes;

/** Surface and text color tokens that shift between light and dark mode */
export type SurfaceColors = {
	background: string;
	surface: string;
	elevated: string;
	structure: string;
};

/** Surface color options excluding `structure`, used for component background variants */
export type SurfaceColorOptions = keyof Omit<SurfaceColors, 'structure'>;

/** Mode-aware color tokens combining surface colors with text roles */
export type ModeColors = SurfaceColors & {
	text: TextColors;
};

/** Full design token set for the Thread theme */
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

/** Complete theme including dark mode surface and text overrides */
export type ThemeConfigFull = Theme & {
	darkMode: ModeColors;
};

/** Partial theme config passed to `ThemeProvider` to override specific tokens */
export type ThemeConfig = DeepPartial<ThemeConfigFull>;
