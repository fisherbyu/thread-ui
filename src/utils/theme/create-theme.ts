// theme-provider.ts
import { Theme, AppliedTheme } from '../../types';
import { DEFAULT_THEME } from '../../defaults';
import { deepMerge, DeepPartial } from '../deep-merge/deep-merge';

// Create Theme Functions for SSR
export function createTheme(userConfig: DeepPartial<Theme>): Theme {
	const newTheme = deepMerge(DEFAULT_THEME, userConfig);
	return newTheme;
}

export function createAppliedTheme(theme: Theme, mode: 'light' | 'dark'): AppliedTheme {
	return {
		border: theme.border,
		space: theme.space,
		colors: {
			...theme.colors,
			...theme.colors[mode],
		},
	};
}
