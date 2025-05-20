import { AppliedTheme } from '../../types';
import { createAppliedTheme, createTheme } from './create-theme';

let currentTheme: AppliedTheme = createAppliedTheme(createTheme(), 'light');

export function setCurrentTheme(theme: AppliedTheme) {
	currentTheme = theme;
}

export function getCurrentTheme(): AppliedTheme {
	return currentTheme;
}
