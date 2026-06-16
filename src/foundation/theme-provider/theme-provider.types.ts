import { ThreadMode } from './theme-mode';

export type ThemeContextValue = {
	mode: ThreadMode;
	setMode: (mode: ThreadMode) => void;
	toggleMode: () => void;
};
