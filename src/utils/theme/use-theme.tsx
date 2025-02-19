import { Theme, AppliedTheme } from '../../types';
import { DEFAULT_THEME } from '../../defaults';
console.log('theme ran');

type DeepPartial<T> = {
	[P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
};

type ThemeMode = 'light' | 'dark';

// State management
let userTheme: DeepPartial<Theme> | null = null;
let mergedTheme: Theme = DEFAULT_THEME;
let currentMode: ThemeMode = 'light';
let appliedTheme: AppliedTheme = createAppliedTheme(DEFAULT_THEME, currentMode);
let isInitialized = false;

// Utility functions
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

export function createAppliedTheme(theme: Theme, mode: 'light' | 'dark'): AppliedTheme {
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
}

// Theme initialization
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

let initPromise: Promise<void> | null = null;

export const initializeTheme = async () => {
	if (!initPromise) {
		initPromise = loadConfig().then((config) => {
			if (config) {
				userTheme = config;
				mergedTheme = deepMerge(DEFAULT_THEME, userTheme);
				appliedTheme = createAppliedTheme(mergedTheme, currentMode);
			}
			isInitialized = true;
		});
	}
	return initPromise;
};

// Theme getters and setters
export const setThemeMode = (mode: ThemeMode) => {
	currentMode = mode;
	appliedTheme = createAppliedTheme(isInitialized ? mergedTheme : DEFAULT_THEME, mode);
};

export const useTheme = (): AppliedTheme => {
	return appliedTheme;
};

// Theme mode management
import { useState, useEffect } from 'react';

export const useThemeMode = (): [ThemeMode, (mode: ThemeMode) => void] => {
	const [mode, setMode] = useState(currentMode);

	const updateMode = (newMode: ThemeMode) => {
		setThemeMode(newMode);
		setMode(newMode);
	};

	return [mode, updateMode];
};
