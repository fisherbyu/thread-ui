// use-theme.ts
'use client';
import { createContext, useContext, useState } from 'react';
import type { Theme, AppliedTheme } from '../../types';
import { createAppliedTheme } from './create-theme';
import { DEFAULT_THEME } from '../../defaults';

type ThemeMode = 'light' | 'dark';

type ThemeContextType = {
	theme: AppliedTheme;
	mode: ThemeMode;
	setMode: (mode: ThemeMode) => void;
};

// Create default context value
const defaultContextValue: ThemeContextType = {
	theme: createAppliedTheme(DEFAULT_THEME, 'light'),
	mode: 'light',
	setMode: () => console.warn('ThemeProvider not found, using default theme'),
};

const ThemeContext = createContext<ThemeContextType>(defaultContextValue);

export function ThemeProvider({
	children,
	initialTheme,
	initialMode = 'light',
}: {
	children: React.ReactNode;
	initialTheme: Theme;
	initialMode?: ThemeMode;
}) {
	const [mode, setMode] = useState<ThemeMode>(initialMode);
	const theme = createAppliedTheme(initialTheme, mode);

	return (
		<ThemeContext.Provider
			value={{
				theme,
				mode,
				setMode,
			}}
		>
			{children}
		</ThemeContext.Provider>
	);
}

export function useTheme(): ThemeContextType {
	return useContext(ThemeContext); // Will fall back to defaultContextValue
}

export function useThemeMode(): [ThemeMode, (mode: ThemeMode) => void] {
	const { mode, setMode } = useTheme();
	return [mode, setMode];
}
