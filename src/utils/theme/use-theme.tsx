// use-theme.ts
'use client';
import { createContext, useContext, useState } from 'react';
import type { Theme, AppliedTheme } from '../../types';
import { createAppliedTheme } from './create-theme';

type ThemeMode = 'light' | 'dark';

type ThemeContextType = {
	theme: AppliedTheme;
	mode: ThemeMode;
	setMode: (mode: ThemeMode) => void;
};

const ThemeContext = createContext<ThemeContextType | null>(null);

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
	const context = useContext(ThemeContext);
	if (!context) {
		throw new Error('useTheme must be used within a ThemeProvider');
	}
	return context;
}

export function useThemeMode(): [ThemeMode, (mode: ThemeMode) => void] {
	const { mode, setMode } = useTheme();
	return [mode, setMode];
}
