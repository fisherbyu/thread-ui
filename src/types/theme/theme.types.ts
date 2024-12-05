import { ThemeBorders } from './borders/themeBorders.types';
import { AppliedThemeColors, ThemeColors } from './colors/themeColors.types';
import { ThemeSizes } from './size/themeSizes.types';

export type Theme = {
	borders: ThemeBorders;
	colors: ThemeColors;
	sizes: ThemeSizes;
};

export type AppliedTheme = {
	borders: ThemeBorders;
	colors: AppliedThemeColors;
	sizes: ThemeSizes;
};
