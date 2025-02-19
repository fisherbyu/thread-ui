import { BorderStyles } from './borders/borders.types';

import { StructureColors, ModeStructureColors, ThemeColors } from './colors/colors.types';

type BaseTheme = {
	// Borders
	border: BorderStyles;

	// Spacing Constant
	space: number;
};

type BaseThemeColors = ThemeColors & ModeStructureColors;

type AppliedThemeColors = ThemeColors & StructureColors;

export type Theme = BaseTheme & {
	// Colors
	colors: BaseThemeColors;
};

export type AppliedTheme = BaseTheme & {
	// Colors
	colors: AppliedThemeColors;
};

export type ThemeControls = {
	colorMode: 'light' | 'dark';
	setColorMode: (mode: 'light' | 'dark') => void;
	toggleColorMode: () => void;
};
