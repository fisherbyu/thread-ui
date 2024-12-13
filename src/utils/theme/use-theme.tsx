import { AppliedTheme, Theme } from '../../types';
import { DEFAULT_THEME } from '../../defaults';

const applyTheme = (theme: Theme): AppliedTheme => {
	return {
		borders: theme.borders,
		colors: {
			// primary: theme.colors.primary,
			// secondary: theme.colors.secondary,
			...theme.colors,
			background: theme.colors.background.light,
			surface: theme.colors.surface.light,
			structure: theme.colors.structure.light,
			text: {
				primary: theme.colors.text.primary.light,
				disabled: theme.colors.text.primary.light,
			},
		},
		sizes: theme.sizes,
	};
};

export const useTheme = (): AppliedTheme => {
	return applyTheme(DEFAULT_THEME);
};
