import React, { createContext, ReactNode, useContext } from 'react';
import { ThemeColors } from '../../../types';
import { defaultTheme } from './default-theme';

type ThemeProviderProps = {
	theme: ThemeColors;
	children: ReactNode;
};

const ThemeContext = createContext<ThemeColors>(defaultTheme);

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ theme, children }) => {
	return <ThemeContext.Provider value={theme}>{children}</ThemeContext.Provider>;
};

export const useTheme = () => useContext(ThemeContext);
