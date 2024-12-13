// import { useMemo } from 'react';
import { AppliedTheme, Theme } from '../../types';
import { DEFAULT_THEME } from '../../defaults';
// import { useThemeConfig } from './use-theme-config';

// const convertThemeToApplied = (theme: Theme, mode: 'light' | 'dark'): AppliedTheme => {
// 	const { colors, ...rest } = theme;

// 	return {
// 		...rest,
// 		colors: {
// 			...colors,
// 			background: colors.background[mode],
// 			surface: colors.surface[mode],
// 			structure: colors.structure[mode],
// 			text: {
// 				primary: colors.text.primary[mode],
// 				disabled: colors.text.disabled[mode],
// 			},
// 		},
// 	} as AppliedTheme;
// };

// export const useTheme = (): AppliedTheme => {
// 	const configTheme = useThemeConfig();

// 	const prefersDark = typeof window !== 'undefined' ? window.matchMedia('(prefers-color-scheme: dark)').matches : false;
// 	const colorMode = prefersDark ? 'dark' : 'light';

// 	return useMemo(() => {
// 		try {
// 			// Merge default theme with config while preserving structure
// 			const baseTheme: Theme = {
// 				...DEFAULT_THEME,
// 				colors: {
// 					...DEFAULT_THEME.colors,
// 					...(configTheme?.colors || {}),
// 				},
// 			};

// 			return convertThemeToApplied(baseTheme, colorMode);
// 		} catch (error) {
// 			return convertThemeToApplied(DEFAULT_THEME, colorMode);
// 		}
// 	}, [configTheme, colorMode]);
// };

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
