import { ModeColors, Theme, ThemeConfigFull } from '@/types/theme/theme.types';
import { DefaultThreadThemeConfig } from './default-thread-theme-config';
import { ThreadThemeCssNames, DarkModeVariablesCssNames, ThreadTheme } from './thread-theme';

const compileCssVariableContent = (
	cssVariableName: string,
	value: string,
	indentLevel: number,
	wrapVar = false
) => {
	const indent = ' '.repeat(4 * indentLevel);

	if (wrapVar) {
		value = `var(${value})`;
	}

	return `${indent}${cssVariableName}: ${value};`;
};

export const generateDefaultThemeCss = (
	defaultThemeConfig: ThemeConfigFull,
	themeVariableNames: Theme,
	lightModeVariableNames: ModeColors,
	darkModeVariableNames: ModeColors
) => {
	// Break Down Keys
	const genericThemeKeys: Array<Exclude<keyof ThemeConfigFull, keyof ModeColors | 'darkMode'>> = (
		Object.keys(defaultThemeConfig) as (keyof ThemeConfigFull)[]
	).filter(
		(key): key is Exclude<keyof ThemeConfigFull, keyof ModeColors | 'darkMode'> =>
			!(key in lightModeVariableNames) && key !== 'darkMode'
	);

	const lightModeKeys: Array<keyof ModeColors> = Object.keys(
		lightModeVariableNames
	) as (keyof ModeColors)[];

	const darkModeKeys: Array<keyof ModeColors> = Object.keys(
		darkModeVariableNames
	) as (keyof ModeColors)[];

	const modeColorsKeys: Array<Extract<keyof ThemeConfigFull, keyof ModeColors>> = (
		Object.keys(defaultThemeConfig) as (keyof ThemeConfigFull)[]
	).filter(
		(key): key is Extract<keyof ThemeConfigFull, keyof ModeColors> =>
			key in lightModeVariableNames
	);

	// Generate Basic Theme Variables
	const genericThemeVariables: string[] = []; // CSS Variable names and values. Ex: --thread-primary-light: #5a7d6a;

	genericThemeKeys.forEach((key) => {
		const variableName = themeVariableNames[key];
		const value = defaultThemeConfig[key];

		if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
			// Handle Nested Keys
			Object.keys(value).forEach((nestedKey) => {
				const nestedVariableName = (variableName as Record<string, string>)[nestedKey];
				const nestedValue = (value as Record<string, string>)[nestedKey];
				genericThemeVariables.push(
					`${compileCssVariableContent(nestedVariableName, nestedValue, 1)}\n`
				);
			});
		} else if (typeof value === 'string' && typeof variableName === 'string') {
			genericThemeVariables.push(`${compileCssVariableContent(variableName, value, 1)}\n`);
		}
	});

	// Generate Light Mode Variables
	const lightModeVariables: string[] = [];

	lightModeKeys.forEach((key) => {
		const variableName = lightModeVariableNames[key];
		const value = defaultThemeConfig[key];

		if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
			// Handle Nested Keys
			Object.keys(value).forEach((nestedKey) => {
				const nestedVariableName = (variableName as Record<string, string>)[nestedKey];
				const nestedValue = (value as Record<string, string>)[nestedKey];
				lightModeVariables.push(
					`${compileCssVariableContent(nestedVariableName, nestedValue, 1)}\n`
				);
			});
		} else if (typeof value === 'string' && typeof variableName === 'string') {
			lightModeVariables.push(`${compileCssVariableContent(variableName, value, 1)}\n`);
		}
	});

	// Generate Dark Mode Variables
	const darkModeVariables: string[] = [];

	lightModeKeys.forEach((key) => {
		const variableName = darkModeVariableNames[key];
		const value = defaultThemeConfig[key];

		if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
			// Handle Nested Keys
			Object.keys(value).forEach((nestedKey) => {
				const nestedVariableName = (variableName as Record<string, string>)[nestedKey];
				const nestedValue = (value as Record<string, string>)[nestedKey];
				darkModeVariables.push(
					`${compileCssVariableContent(nestedVariableName, nestedValue, 1)}\n`
				);
			});
		} else if (typeof value === 'string' && typeof variableName === 'string') {
			darkModeVariables.push(`${compileCssVariableContent(variableName, value, 1)}\n`);
		}
	});

	// Apply Light Mode Colors
	const appliedLightModeVariables: string[] = [];

	modeColorsKeys.forEach((key) => {
		const variableName = ThreadTheme[key];
		const value = lightModeVariableNames[key];

		if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
			// Handle Nested Keys
			Object.keys(value).forEach((nestedKey) => {
				const nestedVariableName = (variableName as Record<string, string>)[nestedKey];
				const nestedValue = (value as Record<string, string>)[nestedKey];
				appliedLightModeVariables.push(
					`${compileCssVariableContent(nestedVariableName, nestedValue, 1, true)}\n`
				);
			});
		} else if (typeof value === 'string' && typeof variableName === 'string') {
			appliedLightModeVariables.push(
				`${compileCssVariableContent(variableName, value, 1, true)}\n`
			);
		}
	});

	// Apply Dark Mode Colors when Dark Mode Active or Applied
	const appliedDarkModeVariables: string[] = [];

	modeColorsKeys.forEach((key) => {
		const variableName = ThreadTheme[key];
		const value = lightModeVariableNames[key];

		if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
			// Handle Nested Keys
			Object.keys(value).forEach((nestedKey) => {
				const nestedVariableName = (variableName as Record<string, string>)[nestedKey];
				const nestedValue = (value as Record<string, string>)[nestedKey];
				appliedDarkModeVariables.push(
					`${compileCssVariableContent(nestedVariableName, nestedValue, 1, true)}\n`
				);
			});
		} else if (typeof value === 'string' && typeof variableName === 'string') {
			appliedDarkModeVariables.push(
				`${compileCssVariableContent(variableName, value, 1, true)}\n`
			);
		}
	});

	const ROOT_CONFIG = `:root{\n
    /* Generic Theme Elements */\n
    ${genericThemeVariables.join('')} \n

    /* Light Mode Values */\n
    ${lightModeVariables.join('')}\n

    /* Apply Light Mode Colors */\n
    ${appliedLightModeVariables.join('')}\n
    }\n`;

	const DARK_MODE_APPLIED = `root[data-theme='dark'] {\n
    /* Apply Light Mode Colors */\n
    ${appliedDarkModeVariables.join('')}\n
    }\n`;

	const DARK_MODE_PREFERRED = `@media (prefers-color-scheme: dark) {\n
	:root:not([data-theme]) {\n
		/* Apply Dark Mode Colors */
		${appliedDarkModeVariables.join('')}\n
	    }\n
    }\n`;

	const THREAD_CSS = ROOT_CONFIG + DARK_MODE_APPLIED + DARK_MODE_PREFERRED;
};
