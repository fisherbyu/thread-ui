export type ThreadMode = 'light' | 'dark' | 'system';

export const THREAD_MODE_STORAGE_KEY = 'thread-mode' as const;

export const VALID_MODES: ThreadMode[] = ['light', 'dark', 'system'];

export function isValidMode(value: unknown): value is ThreadMode {
	return typeof value === 'string' && VALID_MODES.includes(value as ThreadMode);
}

export function applyModeToDocument(mode: ThreadMode): void {
	if (mode === 'dark') {
		document.documentElement.setAttribute('data-theme', 'dark');
	} else if (mode === 'light') {
		document.documentElement.setAttribute('data-theme', 'light');
	} else {
		document.documentElement.removeAttribute('data-theme');
	}
}
