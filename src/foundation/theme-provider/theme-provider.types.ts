export type ThreadMode = 'light' | 'dark' | 'system';

export const THREAD_MODE_STORAGE_KEY = 'thread-mode' as const;

export const VALID_MODES: ThreadMode[] = ['light', 'dark', 'system'];

export type ThemeContextValue = {
	mode: ThreadMode;
	setMode: (mode: ThreadMode) => void;
	toggleMode: () => void;
};
