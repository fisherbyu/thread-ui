import { ColorShades, ExpandedColorShades, LevelColorShades, TextColorShades } from './colors.types';

export type ThemeColors = {
	// Primary Color Themes
	primary: ColorShades;
	secondary: ColorShades;
	Tertiary: ColorShades;

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
	background: LevelColorShades;
	surface: LevelColorShades;

	// Text
	text: {
		light: TextColorShades;
		dark: TextColorShades;
	};
};
