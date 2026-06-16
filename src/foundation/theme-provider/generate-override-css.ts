import { ModeColors, Theme, ThemeConfig } from '@/types';
import {
	PrefixedDarkModeVariables,
	PrefixedLightModeVariables,
	ThemeCssVariableNames,
} from '@/theme/css-name-configurations/theme-css-names';

/**
 * Generates a CSS :root block containing only the variable declarations
 * for values present in the provided ThemeConfig override.
 */
export function generateOverrideCss(overrides: ThemeConfig): string {
	const vars: string[] = [];

	const lightModeKeySet = new Set(Object.keys(PrefixedLightModeVariables));

	const overrideKeys = Object.keys(overrides) as (keyof ThemeConfig)[];

	overrideKeys.forEach((key) => {
		if (key === 'darkMode') return; // handled separately below

		const overrideValue = overrides[key];
		if (overrideValue === undefined) return;

		if (lightModeKeySet.has(key)) {
			// ── Light mode surface / text keys ─────────────────────────────────
			const variableName = PrefixedLightModeVariables[key as keyof ModeColors];

			collectVars(variableName, overrideValue as ThemeConfig[typeof key], vars);
		} else {
			// ── Generic keys (palette, breakpoints, sizing, etc.) ──────────────
			// Cast to keyof Theme — darkMode and light mode keys are already
			// excluded above, so the remaining keys are all valid Theme keys
			const variableName = ThemeCssVariableNames[key as keyof Theme];
			if (!variableName) return;

			collectVars(variableName, overrideValue as ThemeConfig[typeof key], vars);
		}
	});

	// ── Dark mode keys ──────────────────────────────────────────────────────
	if (overrides.darkMode) {
		const darkModeKeys = Object.keys(overrides.darkMode) as (keyof ModeColors)[];

		darkModeKeys.forEach((key) => {
			const overrideValue = overrides.darkMode![key];
			if (overrideValue === undefined) return;

			const variableName = PrefixedDarkModeVariables[key];
			if (!variableName) return;

			collectVars(variableName, overrideValue, vars);
		});
	}

	if (vars.length === 0) return '';

	return `:root {\n${vars.join('\n')}\n}`;
}

/**
 * Recursively collects CSS variable declarations.
 */
function collectVars(
	variableNameOrMap: string | Record<string, unknown>,
	value: unknown,
	acc: string[]
): void {
	if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
		// Nested object — recurse into each provided key
		Object.keys(value as Record<string, unknown>).forEach((nestedKey) => {
			const nestedVariableName = (variableNameOrMap as Record<string, string>)[nestedKey];
			const nestedValue = (value as Record<string, unknown>)[nestedKey];

			if (nestedVariableName !== undefined && nestedValue !== undefined) {
				collectVars(nestedVariableName, nestedValue, acc);
			}
		});
	} else if (typeof value === 'string' && typeof variableNameOrMap === 'string') {
		acc.push(`    ${variableNameOrMap}: ${value};`);
	}
}
