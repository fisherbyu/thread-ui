import { ThemeBorders } from './borders/themeBorders.types';
import { ThemeColors } from './colors/themeColors.types';
import { ThemeSizes } from './size/themeSizes.types';

export type Theme = {
	borders: ThemeBorders;
	colors: ThemeColors;
	sizes: ThemeSizes;
};
