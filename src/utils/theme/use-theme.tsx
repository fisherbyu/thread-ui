import { Theme, AppliedTheme } from '../../types';
import { DEFAULT_THEME } from '../../defaults';
// types.ts
type DeepPartial<T> = {
	[P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
};

type ThemeMode = 'light' | 'dark';

let userTheme: DeepPartial<Theme> | null = null;
let mergedTheme: Theme = DEFAULT_THEME;
let currentMode: ThemeMode = 'light';
let appliedTheme: AppliedTheme;

const loadConfig = async () => {
	try {
		const response = await fetch('/.threadconfig');
		const config = await response.json();
		return config as DeepPartial<Theme>;
	} catch (error) {
		console.debug('No .threadconfig found, using default theme');
		return null;
	}
};

const deepMerge = <T extends Record<string, any>>(target: T, source: DeepPartial<T>): T => {
	const result = { ...target };

	for (const key in source) {
		if (!(key in source)) continue;

		const sourceValue = source[key];
		const targetValue = target[key];

		if (sourceValue === null || sourceValue === undefined) {
			continue;
		}

		if (
			targetValue &&
			typeof sourceValue === 'object' &&
			typeof targetValue === 'object' &&
			!Array.isArray(sourceValue) &&
			!Array.isArray(targetValue)
		) {
			result[key] = deepMerge(targetValue, sourceValue) as T[typeof key];
		} else {
			result[key] = sourceValue as T[typeof key];
		}
	}

	return result;
};

export const createAppliedTheme = (theme: Theme, mode: 'light' | 'dark'): AppliedTheme => {
	// Extract Colors
	const { primary, secondary, tertiary, white, black, gray, success, warning, error, info, [mode]: modeColors } = theme.colors;

	return {
		border: theme.border,
		space: theme.space,
		colors: {
			primary,
			secondary,
			tertiary,
			white,
			black,
			gray,
			success,
			warning,
			error,
			info,
			...modeColors,
		},
	};
};

let initPromise: Promise<void> | null = null;

export const initializeTheme = () => {
	if (!initPromise) {
		initPromise = loadConfig().then((config) => {
			if (config) {
				userTheme = config;
				mergedTheme = deepMerge(DEFAULT_THEME, userTheme);
			}
			// Initialize the applied theme with default mode
			appliedTheme = createAppliedTheme(mergedTheme, currentMode);
		});
	}
	return initPromise;
};

export const setThemeMode = (mode: ThemeMode) => {
	currentMode = mode;
	appliedTheme = createAppliedTheme(mergedTheme, mode);
};

export const useTheme = (): AppliedTheme => {
	return appliedTheme;
};

// Optional: Hook for components that need to react to theme mode changes
import { useState, useEffect } from 'react';

export const useThemeMode = (): [ThemeMode, (mode: ThemeMode) => void] => {
	const [mode, setMode] = useState(currentMode);

	const updateMode = (newMode: ThemeMode) => {
		setThemeMode(newMode);
		setMode(newMode);
	};

	return [mode, updateMode];
};

const testTheme = {
	space: 9,
};

console.log(createAppliedTheme(DEFAULT_THEME, 'dark'));
