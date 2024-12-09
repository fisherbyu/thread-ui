'use client';
// hooks/use-theme-config.ts
import { useEffect, useState } from 'react';
import { Theme } from '../../types';
import { DEFAULT_THEME } from '../../defaults';

// Cache mechanism outside of hook
let cachedConfig: Theme = DEFAULT_THEME;
let hasLoaded = false;

const loadThemeConfig = async (): Promise<Theme> => {
	try {
		// Try to load the config using dynamic import
		// @ts-ignore
		const config = await import('/thread.config.js');
		console.log(config);
		console.log(config.default);

		return config.default || config;
	} catch (error) {
		console.log('No config found, using default theme');
		return DEFAULT_THEME;
	}
};

// Initialize the cache immediately
if (!hasLoaded) {
	loadThemeConfig().then((config) => {
		cachedConfig = config;
		hasLoaded = true;
	});
}

export const useThemeConfig = () => {
	const [configTheme, setConfigTheme] = useState<Theme>(cachedConfig);

	useEffect(() => {
		if (!hasLoaded) {
			loadThemeConfig().then((config) => {
				setConfigTheme(config);
			});
		} else if (configTheme === DEFAULT_THEME && cachedConfig !== DEFAULT_THEME) {
			setConfigTheme(cachedConfig);
		}
	}, [configTheme]);

	return configTheme;
};
