import { ColorShades, ExpandedColorShades, ModeColorShades, TextColorShades } from './colors.types';

export type ThemeColors = {
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

	// Layers
	background: ModeColorShades;
	surface: ModeColorShades;
	structure: ModeColorShades;

	// Text
	text: TextColorShades;
};
