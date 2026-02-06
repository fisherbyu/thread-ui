import { ThemeConfig } from '@/types';
import { DarkModeVariables } from '@/theme/theme-css-names';
import { ThreadTheme } from '@/theme';

/**
 * Override default Thread Theme with custom inputs
 * @param userTheme Partial of Theme Object
 * @returns CSS String
 */
export const setTheme = (userTheme: ThemeConfig) => {
	const lightVariables: string[] = [];
	const darkVariables: string[] = [];

	const collectCSSVariables = (userObject: any, themeObject: any, targetArray: string[]) => {
		if (!userObject) return;

		Object.entries(userObject).forEach(([key, value]) => {
			const themeValue = themeObject?.[key];
			if (!themeValue) return;

			if (value && typeof value === 'object' && typeof themeValue === 'object') {
				collectCSSVariables(value, themeValue, targetArray);
			} else if (value !== undefined && typeof themeValue === 'string') {
				targetArray.push(`${themeValue}: ${value}`);
			}
		});
	};

	const { darkMode, ...lightMode } = userTheme;

	// Collect light mode variables
	collectCSSVariables(lightMode, ThreadTheme, lightVariables);

	// FIXED: Collect dark mode variables with correct theme object
	if (darkMode) {
		collectCSSVariables(darkMode, DarkModeVariables, darkVariables);
	}

	// Create CSS string with proper selectors
	let cssString = '';

	if (lightVariables.length > 0) {
		cssString += `:root { ${lightVariables.join('; ')} }\n`;
	}

	if (darkVariables.length > 0) {
		cssString += `:root[data-theme="dark"] { ${darkVariables.join('; ')} }\n`;
	}

	// Apply the CSS
	if (typeof document !== 'undefined') {
		let styleElement = document.getElementById('thread-ui-custom-theme');
		if (!styleElement) {
			styleElement = document.createElement('style');
			styleElement.id = 'thread-ui-custom-theme';
			document.head.appendChild(styleElement);
		}
		styleElement.textContent = cssString;

		// Persist theme config
		try {
			localStorage.setItem('thread-ui-theme-config', JSON.stringify(userTheme));
		} catch (e) {
			console.warn('Failed to persist theme:', e);
		}
	}

	return cssString;
};
