// use-theme.ts
'use client';
import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import type { Theme, AppliedTheme, ThemeMode, ThemeModeOption, ThemeContextType } from '../../types';
import { createAppliedTheme } from './create-theme';
import { DEFAULT_THEME } from '../../defaults';

const STORAGE_KEY = 'theme-mode-preference';

// Helper functions remain the same
const getSystemTheme = (): ThemeMode => {
	console.log('Ran_Sys_Access');
	if (typeof window === 'undefined') return 'light';
	return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
};

const getStoredThemeOption = (): ThemeModeOption => {
	console.log('Got_Stored_Pref');

	if (typeof window === 'undefined') return 'system';
	try {
		const stored = localStorage.getItem(STORAGE_KEY);
		if (stored === 'light' || stored === 'dark' || stored === 'system') {
			return stored;
		}
	} catch (e) {
		console.warn('Failed to access localStorage:', e);
	}
	return 'system';
};

const resolveThemeMode = (option: ThemeModeOption): ThemeMode => {
	console.log('Resolved_Theme');

	if (option === 'system') {
		return getSystemTheme();
	}
	return option;
};

// Create default context value
const defaultContextValue: ThemeContextType = {
	theme: createAppliedTheme(DEFAULT_THEME, 'light'),
	mode: 'light',
	setMode: () => console.warn('ThemeProvider not found, using default theme'),
};

const ThemeContext = createContext<ThemeContextType>(defaultContextValue);

// Theme Provider
export function ThemeProvider({
	children,
	initialTheme,
	initialMode = 'light',
}: {
	children: React.ReactNode;
	initialTheme: Theme;
	initialMode?: ThemeMode;
}) {
	// Store both the user's preference and the resolved theme mode
	const [themeOption, setThemeOption] = useState<ThemeModeOption>(() => {
		if (initialMode) return initialMode;
		return getStoredThemeOption();
	});

	const [mode, setMode] = useState<ThemeMode>(() => {
		return initialMode || resolveThemeMode(themeOption);
	});

	// Update resolved mode when themeOption changes
	useEffect(() => {
		const newMode = resolveThemeMode(themeOption);
		setMode(newMode);
	}, [themeOption]);

	// Persist theme option to localStorage
	useEffect(() => {
		try {
			localStorage.setItem(STORAGE_KEY, themeOption);
		} catch (e) {
			console.warn('Failed to save theme preference:', e);
		}
	}, [themeOption]);

	// Listen for system theme changes
	useEffect(() => {
		if (themeOption !== 'system') return;

		const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
		const handleChange = (e: MediaQueryListEvent) => {
			setMode(e.matches ? 'dark' : 'light');
		};

		mediaQuery.addEventListener('change', handleChange);
		return () => mediaQuery.removeEventListener('change', handleChange);
	}, [themeOption]);

	const theme = useMemo(() => createAppliedTheme(initialTheme, mode), [initialTheme, mode]);

	// Enhanced setMode to handle ThemeModeOption
	const setModeEnhanced = (newMode: ThemeMode | ThemeModeOption) => {
		if (newMode === 'system') {
			setThemeOption('system');
		} else {
			setThemeOption(newMode);
			setMode(newMode);
		}
	};

	const contextValue = useMemo(() => ({ theme, mode, setMode: setModeEnhanced }), [theme, mode]);

	return <ThemeContext.Provider value={contextValue}>{children}</ThemeContext.Provider>;
}

// Access Theme Values
export function useTheme(): ThemeContextType {
	return useContext(ThemeContext);
}

export function useThemeToggle() {
	const { mode, setMode } = useTheme();

	const toggleMode = () => {
		setMode(mode === 'light' ? 'dark' : 'light');
	};

	return toggleMode;
}

// Fix: Update return type to match the actual function signature
export function useThemeMode(): [ThemeMode, (mode: ThemeMode | ThemeModeOption) => void] {
	const { mode, setMode } = useTheme();
	return [mode, setMode];
}

// New hook to get and set the theme option (includes 'system')
export function useThemeOption(): [ThemeModeOption, (option: ThemeModeOption) => void] {
	const context = useContext(ThemeContext);

	// Get the current option from localStorage since it's not in context
	const [currentOption, setCurrentOption] = useState<ThemeModeOption>(() => {
		return getStoredThemeOption();
	});

	const setOption = (option: ThemeModeOption) => {
		setCurrentOption(option);
		context.setMode(option);
	};

	return [currentOption, setOption];
}
