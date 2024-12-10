import { AppliedTextColors, ColorShades, ExpandedColorShades, ModeColorShades, TextColorShades } from './colors.types';

type BaseThemeColors = {
	// Primary Color Themes
	primary: ColorShades;
	secondary: ColorShades;
	tertiary: ColorShades;

	// Neutrals
	white: string;
	gray: ExpandedColorShades;
	black: string;

	// Actions
	success: ColorShades;
	warning: ColorShades;
	error: ColorShades;
	info: ColorShades;
};

export type ThemeColors = BaseThemeColors & {
	// Layers
	background: ModeColorShades;
	surface: ModeColorShades;
	structure: ModeColorShades;

	// Text
	text: TextColorShades;
};

export type AppliedThemeColors = BaseThemeColors & {
	// Layers
	background: string;
	surface: string;
	structure: string;

	// Text
	text: AppliedTextColors;
};
