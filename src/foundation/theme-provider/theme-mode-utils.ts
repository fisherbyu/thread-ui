import { ThreadMode, VALID_MODES } from './theme-provider.types';

export const isValidMode = (value: unknown): value is ThreadMode => {
	return typeof value === 'string' && VALID_MODES.includes(value as ThreadMode);
};

export const applyModeToDocument = (mode: ThreadMode): void => {
	if (mode === 'dark') {
		document.documentElement.setAttribute('data-theme', 'dark');
	} else if (mode === 'light') {
		document.documentElement.setAttribute('data-theme', 'light');
	} else {
		document.documentElement.removeAttribute('data-theme');
	}
};
