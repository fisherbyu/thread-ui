import { DeepPartial, Prettify } from '@/types';

/** Three-step color scale for brand and semantic colors */
type ColorShades = {
	light: string;
	main: string;
	dark: string;
};

export type ColorShadeOptions = Prettify<keyof ColorShades>;

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

type ExtendedSmallOptions = {
	xs: string;
};

type FullSmallOptions = ExtendedSmallOptions & {
	xxs: string;
};

type ExtendedLargeOptions = {
	xl: string;
};

type FullLargeOptions = ExtendedLargeOptions & {
	xxl: string;
};

/** Extended size scale including extra small and extra large steps */
export type ExtendedUtilitySizes = Prettify<
	ExtendedSmallOptions & UtilitySizes & ExtendedLargeOptions
>;

/** Key union of the extended size scale */
export type ExtendedUtilityOptions = Prettify<keyof ExtendedUtilitySizes>;

/** Full size scale including extra-extra small and extra-extra large steps */
export type FullUtilitySizes = Prettify<FullSmallOptions & UtilitySizes & FullLargeOptions>;

/** Key union of the full expanded size scale */
export type FullUtilitySizeOptions = Prettify<keyof FullUtilitySizes>;

/** Size scale extended with responsive breakpoint steps */
export type BreakpointOptions = Omit<FullUtilitySizes, keyof FullSmallOptions>;

/** Surface Hierarchy and Layer Colors */
export type SurfaceColors = {
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

export type AllSurfaceColors = Prettify<SurfaceColors & SurfaceActivityColors>;

/** Background color options for component */
export type BgColorOptions = Prettify<keyof SurfaceColors | 'none'>;

/** Element Shadow Levels */
export type ShadowScale = {
	sm: string;
	md: string;
	lg: string;
};

/** Element Shadow Options */
export type ShadowOptions = Prettify<keyof ShadowScale | 'none'>;

/** Structural Colors, used for borders and dividers etc */
export type StructureColors = {
	subtle: string;
	default: string;
	strong: string;
};

/** Structure color options, used for component variants */
export type StructureColorOptions = Prettify<keyof StructureColors>;

/** Z-Index Hierarchy */
export type ZIndexScale = {
	base: string;
	sticky: string;
	overlay: string;
	modal: string;
	system: string;
};

/** Z-Index Options */
export type ZIndexOptions = Prettify<keyof ZIndexScale>;

/** Modal Overlays */
export type ScrimColors = {
	scrim: string;
};

// Semantic Surface Layer System

/** Surface Layer System Options */
export type SurfaceLayerOptions = Prettify<keyof SurfaceColors>;

/** Mode-aware color tokens combining surface colors with text roles */
export type ModeColors = Prettify<
	AllSurfaceColors & {
		structure: StructureColors;
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

// Typography

/** Font family stacks for heading, body, and monospace text */
export type FontFamilies = {
	body: string;
	heading: string;
	mono: string;
};

/** Font Family Options */
export type FontFamilyOptions = Prettify<FontFamilies>;

/** Body text size scale */
export type BodyFontSizes = Prettify<ExtendedUtilitySizes>;

/** Key union of body font size steps */
export type BodyFontSizeOptions = Prettify<keyof BodyFontSizes>;

/** Heading size scale (1.25rem → 3rem) */
export type HeadingFontSizes = Prettify<UtilitySizes & ExtendedLargeOptions>;

/** Key union of heading font size steps */
export type HeadingFontSizeOptions = Prettify<keyof HeadingFontSizes>;

/** Combined font size scales */
export type ThemeFontSizes = Prettify<{
	heading: HeadingFontSizes;
	body: BodyFontSizes;
}>;

/** Font weight scale */
export type FontWeights = {
	regular: number;
	medium: number;
	semibold: number;
	bold: number;
};

/** Key union of font weight options */
export type FontWeightOptions = Prettify<keyof FontWeights>;

/** Line height scale */
export type LineHeights = {
	tighter: number;
	tight: number;
	normal: number;
	loose: number;
	looser: number;
};

/** Key union of line height steps */
export type LineHeightOptions = Prettify<keyof LineHeights>;

/** Letter spacing scale */
export type LetterSpacings = {
	tight: string;
	normal: string;
	wide: string;
};

/** Key union of letter spacing steps */
export type LetterSpacingOptions = Prettify<keyof LetterSpacings>;

/** Theme Layout Configuration */
export type ThemeLayout = {
	breakpoints: BreakpointOptions;
};

/** Base Border Configuration */
export type ThemeBorders = {
	borderRadius: UtilitySizes;
	borderSize: UtilitySizes;
};

/** Full design token set for the Thread theme */
export type Theme = Prettify<
	ThemePalette &
		StatusPalette &
		NeutralPalette &
		ThemeLayout &
		ThemeBorders &
		ScrimColors &
		ModeColors & {
			zIndex: ZIndexScale;
			shadow: ShadowScale;
		}
>;

/** Complete theme including dark mode surface and text overrides */
export type ThemeConfigFull = Prettify<
	Theme & {
		darkMode: ModeColors;
	}
>;

/** Partial theme config passed to `ThemeProvider` to override specific tokens */
export type ThemeConfig = Prettify<DeepPartial<ThemeConfigFull>>;
