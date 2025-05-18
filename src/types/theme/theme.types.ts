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

export type ThemeMode = 'light' | 'dark';
export type ThemeModeOption = 'light' | 'dark' | 'system';

export type ThemeContextType = {
	theme: AppliedTheme;
	mode: ThemeMode;
	setMode: (mode: ThemeMode | ThemeModeOption) => void;
};
