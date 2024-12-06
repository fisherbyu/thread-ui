import { useMemo } from 'react';
import { AppliedTheme, Theme } from '../../types';
import { DEFAULT_THEME } from '../../defaults';
import { useThemeConfig } from './use-theme-config';

export const useTheme = (): AppliedTheme => {
	const configTheme = useThemeConfig();

	// Get system/user preference for color mode
	const prefersDark = typeof window !== 'undefined' ? window.matchMedia('(prefers-color-scheme: dark)').matches : false;
	const colorMode = prefersDark ? 'dark' : 'light';

	// This will only recompute if configTheme or colorMode changes
	return useMemo(() => {
		// Merge default theme with config if it exists
		const baseTheme: Theme = configTheme ? { ...DEFAULT_THEME, ...configTheme } : DEFAULT_THEME;

		// Apply color mode to theme
		const { colors, ...rest } = baseTheme;

		return {
			...rest,
			colors: {
				...colors,
				background: colors.background[colorMode],
				surface: colors.surface[colorMode],
				structure: colors.structure[colorMode],
				text: {
					primary: colors.text.primary[colorMode],
					disabled: colors.text.disabled[colorMode],
				},
			},
		} as AppliedTheme;
	}, [configTheme, colorMode]);
};
