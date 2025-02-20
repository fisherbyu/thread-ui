// theme-provider.ts
import { Theme, AppliedTheme } from '../../types';
import { DEFAULT_THEME } from '../../defaults';
import { deepMerge, DeepPartial } from '../deep-merge/deep-merge';

type ThemeMode = 'light' | 'dark';

// Pure functions - can be used in server components
export function createTheme(userConfig: DeepPartial<Theme>): Theme {
	console.log('createTheme called with:', userConfig);
	const newTheme = deepMerge(DEFAULT_THEME, userConfig);
	console.log('Created theme:', newTheme);
	return newTheme;
}

export function createAppliedTheme(theme: Theme, mode: 'light' | 'dark'): AppliedTheme {
	console.log('createAppliedTheme called with theme:', theme, 'mode:', mode);
	return {
		border: theme.border,
		space: theme.space,
		colors: {
			...theme.colors,
			...theme.colors[mode],
		},
	};
}
