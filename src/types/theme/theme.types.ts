import { DeepPartial, Prettify } from '@/types';

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
export type UtilitySizeOptions = Prettify<keyof UtilitySizes>;

type ExpandedSmallOptions = {
	xxs: string;
	xs: string;
};

type ExpandedLargeOptions = {
	xl: string;
	xxl: string;
};

/** Full size scale including sub-small and extra-large steps */
export type ExpandedUtilitySizes = Prettify<
	ExpandedSmallOptions & UtilitySizes & ExpandedLargeOptions
>;

/** Key union of the full expanded size scale */
export type ExpandedUtilitySizeOptions = Prettify<keyof ExpandedUtilitySizes>;

/** Size scale extended with responsive breakpoint steps */
export type BreakpointOptions = Omit<ExpandedUtilitySizes, keyof ExpandedSmallOptions>;

/** Surface Hierarchy and Layer Colors */
export type NewSurfaceColors = {
	canvas: string;
	inset: string;
	surface: string;
	elevated: string;
	overlay: string;
};

/** Interactive Surface Status Colors */
export type SurfaceActivityColors = {
	active: string;
	hover: string;
};

export type AllSurfaceColors = Prettify<NewSurfaceColors & SurfaceActivityColors>;

/** Surface color options, used for component background variants */
export type SurfaceColorOptions = Prettify<keyof NewSurfaceColors | 'none'>;

/** Structural Colors, used for borders and dividers etc */
export type StructureColors = {
	structure: string;
};

/** Mode-aware color tokens combining surface colors with text roles */
export type ModeColors = Prettify<
	AllSurfaceColors &
		StructureColors & {
			text: TextColors;
		}
>;

/** Theme Brand Colors */
export type ThemePalette = Prettify<{
	primary: ColorShades;
	secondary: ColorShades;
	tertiary: ColorShades;
}>;

/** Status Colors */
export type StatusPalette = {
	success: ColorShades;
	warning: ColorShades;
	error: ColorShades;
	info: ColorShades;
};

/** Neutral Colors */
export type NeutralPalette = {
	white: string;
	black: string;
	gray: ColorShades;
};

/** Theme Layout Structure */
export type ThemeStructure = {
	breakpoints: BreakpointOptions;
};

/** Base Border Configuration */
export type ThemeBorders = {
	// Sizing
	borderRadius: UtilitySizes;
	borderSize: UtilitySizes;
};

/** Full design token set for the Thread theme */
export type Theme = Prettify<
	ThemePalette & StatusPalette & NeutralPalette & ThemeStructure & ThemeBorders & ModeColors
>;

/** Complete theme including dark mode surface and text overrides */
export type ThemeConfigFull = Prettify<
	Theme & {
		darkMode: ModeColors;
	}
>;

/** Partial theme config passed to `ThemeProvider` to override specific tokens */
export type ThemeConfig = Prettify<DeepPartial<ThemeConfigFull>>;
