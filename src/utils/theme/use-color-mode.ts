import { useState, useEffect } from 'react';
import { ColorMode } from '../../types';

export const useColorMode = (initialMode?: ColorMode) => {
	// Initialize from localStorage or system preference
	const [colorMode, setColorMode] = useState<ColorMode>(() => {
		if (typeof window === 'undefined') return 'light';

		const savedMode = localStorage.getItem('color-mode') as ColorMode;
		if (savedMode) return savedMode;

		const systemDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
		return systemDark ? 'dark' : 'light';
	});

	// Listen for system preference changes
	useEffect(() => {
		const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
		const handleChange = (e: MediaQueryListEvent) => {
			const systemPreference = e.matches ? 'dark' : 'light';
			// Only update if user hasn't manually set a preference
			if (!localStorage.getItem('color-mode')) {
				setColorMode(systemPreference);
			}
		};

		mediaQuery.addEventListener('change', handleChange);
		return () => mediaQuery.removeEventListener('change', handleChange);
	}, []);

	const setMode = (mode: ColorMode) => {
		setColorMode(mode);
		localStorage.setItem('color-mode', mode);
	};

	const toggleColorMode = () => {
		const newMode = colorMode === 'light' ? 'dark' : 'light';
		setMode(newMode);
	};

	return { colorMode, setColorMode: setMode, toggleColorMode };
};
