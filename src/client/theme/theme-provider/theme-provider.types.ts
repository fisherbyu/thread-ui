import { ThemeConfig } from '@/types';
import { ReactNode } from 'react';

export type ThemeContextType = {
	mode: 'light' | 'dark' | 'system';
	setMode: (mode: 'light' | 'dark' | 'system') => void;
	toggleMode: () => void;
};

export type ThemeProviderProps = {
	children: ReactNode;
	theme?: ThemeConfig;
	defaultMode?: 'light' | 'dark' | 'system';
};
