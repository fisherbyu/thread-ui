import { writeFileSync } from 'fs';

import { ModeColors, Theme, ThemeConfigFull } from '../src/types/theme/theme.types';
import {
	PrefixedDarkModeVariables,
	PrefixedLightModeVariables,
	ThemeCssVariableNames,
} from '../src/theme/css-name-configurations/theme-css-names.ts';
import { DefaultThreadTheme } from '../src/theme/default-theme.ts';

// Parse output path from CLI args (--out <path>)
const outIdx = process.argv.indexOf('--out');
if (outIdx === -1 || !process.argv[outIdx + 1]) {
	console.error('Error: --out <path> argument is required');
	process.exit(1);
}
const OUTPUT_PATH = process.argv[outIdx + 1];

const compileCssVariableContent = (
	cssVariableName: string,
	value: string,
	indentLevel: number,
	wrapVal = false
) => {
	const indent = ' '.repeat(4 * indentLevel);

	if (wrapVal) {
		value = `var(${value})`;
	}

	return `${indent}${cssVariableName}: ${value};`;
};

/**
 * Recursively walks a value tree and a parallel variable-name tree in lockstep,
 * emitting a CSS variable declaration at each string leaf. Handles arbitrary nesting depth.
 */
const walkAndEmit = (
	valueTree: unknown,
	varNameTree: unknown,
	output: string[],
	wrapVal: boolean
): void => {
	if (typeof valueTree === 'string' && typeof varNameTree === 'string') {
		output.push(`${compileCssVariableContent(varNameTree, valueTree, 1, wrapVal)}\n`);
		return;
	}

	if (
		typeof valueTree === 'object' &&
		valueTree !== null &&
		!Array.isArray(valueTree) &&
		typeof varNameTree === 'object' &&
		varNameTree !== null &&
		!Array.isArray(varNameTree)
	) {
		const valueRecord = valueTree as Record<string, unknown>;
		const varNameRecord = varNameTree as Record<string, unknown>;
		Object.keys(valueRecord).forEach((key) => {
			walkAndEmit(valueRecord[key], varNameRecord[key], output, wrapVal);
		});
	}
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
		walkAndEmit(defaultThemeConfig[key], themeVariableNames[key], genericThemeVariables, false);
	});

	// Generate Light Mode Variables
	const lightModeVariables: string[] = [];

	lightModeKeys.forEach((key) => {
		walkAndEmit(
			defaultThemeConfig[key],
			lightModeVariableNames[key],
			lightModeVariables,
			false
		);
	});

	// Generate Dark Mode Variables
	const darkModeVariables: string[] = [];

	darkModeKeys.forEach((key) => {
		walkAndEmit(
			defaultThemeConfig['darkMode'][key],
			darkModeVariableNames[key],
			darkModeVariables,
			false
		);
	});

	// Apply Light Mode Colors (used in both :root default and [data-theme='light'] override — output is identical)
	const appliedLightModeVariables: string[] = [];

	modeColorsKeys.forEach((key) => {
		walkAndEmit(
			lightModeVariableNames[key],
			ThemeCssVariableNames[key],
			appliedLightModeVariables,
			true
		);
	});

	// Apply Dark Mode Colors when Dark Mode Active or Applied
	const appliedDarkModeVariables: string[] = [];

	modeColorsKeys.forEach((key) => {
		walkAndEmit(
			darkModeVariableNames[key],
			ThemeCssVariableNames[key],
			appliedDarkModeVariables,
			true
		);
	});

	const ROOT_CONFIG = `
    /* Thread Theme Implementation */
    :root{
    /* Generic Theme Elements */
    ${genericThemeVariables.join('')} \n

    /* Light Mode Values */
    ${lightModeVariables.join('')}\n

    /* Dark Mode Values */
    ${darkModeVariables.join('')}\n

    /* Apply Light Mode Colors */
    ${appliedLightModeVariables.join('')}\n
    }\n`;

	const LIGHT_MODE_OVERRIDE = `\n:root[data-theme='light'] {\n
    /* Light Mode Color Override */
    ${appliedLightModeVariables.join('')}\n
    }\n`;

	const DARK_MODE_OVERRIDE = `\n:root[data-theme='dark'] {\n
    /* Dark Mode Color Override */
    ${appliedDarkModeVariables.join('')}\n
    }\n`;

	const DARK_MODE_PREFERRED = `\n@media (prefers-color-scheme: dark) {\n
	:root:not([data-theme]) {\n
		/* Apply Dark Mode Colors */
		${appliedDarkModeVariables.join('')}\n
	    }\n
    }\n`;

	return ROOT_CONFIG + LIGHT_MODE_OVERRIDE + DARK_MODE_OVERRIDE + DARK_MODE_PREFERRED;
};

const css = generateDefaultThemeCss(
	DefaultThreadTheme,
	ThemeCssVariableNames,
	PrefixedLightModeVariables,
	PrefixedDarkModeVariables
);

writeFileSync(OUTPUT_PATH, css, 'utf-8');
console.log(`✓ Generated theme CSS at ${OUTPUT_PATH}`);
