import { ModeColors, Theme, ThemeConfigFull } from '@/types/theme/theme.types';
import { DefaultThreadThemeConfig } from './default-thread-theme-config';
import { ThreadThemeCssNames, DarkModeVariablesCssNames } from './thread-theme';

const compileCssVariableContent = (
	cssVariableName: string,
	value: string,
	indentLevel: number = 1
) => {
	const indent = ' '.repeat(4 * indentLevel);

	return `${indent}${cssVariableName}: ${value};`;
};

export const generateDefaultThemeCss = (
	defaultThemeConfig: ThemeConfigFull,
	themeVariableNames: Theme,
	lightModeVariableNames: ModeColors,
	darkModeVariableNames: ModeColors
) => {
	// Generate Basic Theme Variables
	const genericThemeVariables: string[] = []; // CSS Variable names and values. Ex: --thread-primary-light: #5a7d6a;
	const genericThemeKeys: Array<Exclude<keyof ThemeConfigFull, keyof ModeColors | 'darkMode'>> = (
		Object.keys(defaultThemeConfig) as (keyof ThemeConfigFull)[]
	).filter(
		(key): key is Exclude<keyof ThemeConfigFull, keyof ModeColors | 'darkMode'> =>
			!(key in lightModeVariableNames) && key !== 'darkMode'
	);

	// Generate Light Mode Variables

	// Generate Dark Mode Variables

	// Apply Light Mode Colors

	// Apply Dark Mode Colors when Dark Mode Active

	// Apply Dark Mode Colors when Dark Mode Applied
};

const cssVarNames: ThemeConfigFull = {
	...ThreadThemeCssNames,
	darkMode: DarkModeVariablesCssNames,
};

// const css = generateDefaultThemeCss(
// 	DefaultThreadThemeConfig,
// 	cssVarNames,
// 	['background', 'surface', 'elevated', 'structure', 'text'],
// 	['darkMode']
// );
