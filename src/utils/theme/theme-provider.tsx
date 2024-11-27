'use client';
import React, { createContext, ReactNode, useContext } from 'react';
import { Theme } from '../../types';
import { DEFAULT_THEME } from '../../defaults';

type ThemeProviderProps = {
	theme?: Partial<Theme>;
	children: ReactNode;
};

const ThemeContext = createContext<Theme>(DEFAULT_THEME);

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ theme, children }) => {
	// Merge the passed theme with the defaultTheme, prioritizing any custom values
	const mergedTheme = { ...DEFAULT_THEME, ...theme };

	return <ThemeContext.Provider value={mergedTheme}>{children}</ThemeContext.Provider>;
};

export const useTheme = () => useContext(ThemeContext);
