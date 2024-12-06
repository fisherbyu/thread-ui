// hooks/useTheme.ts
import { useMemo } from 'react';
import { AppliedTheme, Theme } from '../../types';
import { DEFAULT_THEME } from '../../defaults';
import { useThemeConfig } from './use-theme-config';

const convertThemeToApplied = (theme: Theme, mode: 'light' | 'dark'): AppliedTheme => {
	const { colors, ...rest } = theme;

	return {
		...rest,
		colors: {
			...colors,
			background: colors.background[mode],
			surface: colors.surface[mode],
			structure: colors.structure[mode],
			text: {
				primary: colors.text.primary[mode],
				disabled: colors.text.disabled[mode],
			},
		},
	} as AppliedTheme;
};

export const useTheme = (): AppliedTheme => {
	const configTheme = useThemeConfig();

	const prefersDark = typeof window !== 'undefined' ? window.matchMedia('(prefers-color-scheme: dark)').matches : false;
	const colorMode = prefersDark ? 'dark' : 'light';

	return useMemo(() => {
		try {
			// Merge default theme with config while preserving structure
			const baseTheme: Theme = {
				...DEFAULT_THEME,
				colors: {
					...DEFAULT_THEME.colors,
					...(configTheme?.colors || {}),
				},
			};

			return convertThemeToApplied(baseTheme, colorMode);
		} catch (error) {
			console.error('Error applying theme:', error);
			// Convert DEFAULT_THEME to applied format before returning
			return convertThemeToApplied(DEFAULT_THEME, colorMode);
		}
	}, [configTheme, colorMode]);
};
