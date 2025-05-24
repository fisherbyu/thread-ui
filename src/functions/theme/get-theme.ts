import { deepMerge, DeepPartial } from '../../utils';
import { Theme, DarkModeColors, ThemeConfig } from './theme.types';
import { ThreadTheme, DarkModeVariables } from './thread-theme';

export const setTheme = (userTheme: ThemeConfig) => {
	const cssVariables: string[] = [];

	const collectCSSVariables = (userObject: any, themeObject: any, suffix: string = '') => {
		if (!userObject) return;

		Object.entries(userObject).forEach(([key, value]) => {
			const themeValue = themeObject?.[key];
			if (!themeValue) return;

			if (value && typeof value === 'object' && typeof themeValue === 'object') {
				collectCSSVariables(value, themeValue, suffix);
			} else if (value !== undefined && typeof themeValue === 'string') {
				cssVariables.push(`${themeValue}${suffix}: ${value}`);
			}
		});
	};

	const { darkMode, ...staticStyles } = userTheme;
	const { background, surface, elevated, text, ...otherStaticStyles } = staticStyles;

	collectCSSVariables(otherStaticStyles, ThreadTheme);
	collectCSSVariables({ background, surface, elevated, text }, ThreadTheme, '-light-mode');

	if (darkMode) {
		collectCSSVariables(darkMode, DarkModeVariables);
	}

	// Create CSS string
	const cssString = `:root { ${cssVariables.join('; ')} }`;

	// Apply the CSS
	if (typeof document !== 'undefined') {
		// Client-side: inject into DOM
		let styleElement = document.getElementById('theme-variables');
		if (!styleElement) {
			styleElement = document.createElement('style');
			styleElement.id = 'theme-variables';
			document.head.appendChild(styleElement);
		}
		styleElement.textContent = cssString;
	}

	// Return CSS string so it can be used server-side if needed
	return cssString;
};

export const getThemeValue = (): Theme => {
	const wrapValue = (value: string): string => {
		return `var(${value})`;
	};

	const createThemeProxy = (obj: any): any => {
		if (typeof obj === 'string') {
			return wrapValue(obj);
		}

		return new Proxy(obj, {
			get(target, prop) {
				const value = target[prop as string | symbol];

				if (value !== null && typeof value === 'object') {
					return createThemeProxy(value);
				}

				if (typeof value === 'string') {
					return wrapValue(value);
				}

				return value;
			},
		});
	};

	return createThemeProxy(ThreadTheme);
};
