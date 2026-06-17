'use client';

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { generateOverrideCss } from './generate-override-css';
import {
	ThreadMode,
	THREAD_MODE_STORAGE_KEY,
	ThemeProviderProps,
	ThemeContextValue,
} from './theme-provider.types';
import { applyModeToDocument } from './theme-mode-utils';

// ─── Context ──────────────────────────────────────────────────────────────────
const ThemeContext = createContext<ThemeContextValue | null>(null);

// ─── Provider ─────────────────────────────────────────────────────────────────

/**
 * Provides custom Thread theme configuration.
 * - Accepts `ThemeConfig` partial object to override default ThreadTheme
 * - Provides theme-mode state to component tree
 * - Syncs with the `data-theme` attribute set by `ThreadScript` on mount.
 *
 * @example
 * <ThemeProvider theme={customTheme}>
 *   <App />
 * </ThemeProvider>
 */
export const ThemeProvider = ({ children, theme }: ThemeProviderProps) => {
	const [mode, setModeState] = useState<ThreadMode>('system'); // Init as 'system' — sync to applied value on mount

	// On mount: read the data-theme attribute ThreadScript already set on <html>.
	useEffect(() => {
		const attr = document.documentElement.getAttribute('data-theme');
		if (attr === 'dark' || attr === 'light') {
			setModeState(attr);
		} else {
			// No attribute -> ThreadScript left it unset — 'system' mode
			setModeState('system');
		}
	}, []);

	const setMode = useCallback((newMode: ThreadMode) => {
		setModeState(newMode);
		try {
			localStorage.setItem(THREAD_MODE_STORAGE_KEY, newMode);
		} catch {
			// localStorage unavailable — mode still applies for this session
		}
		applyModeToDocument(newMode);
	}, []);

	const toggleMode = useCallback(() => {
		// If currently 'system', resolve the actual rendered mode first
		// then toggle to the opposite explicit mode
		const resolvedCurrent =
			mode === 'system'
				? window.matchMedia('(prefers-color-scheme: dark)').matches
					? 'dark'
					: 'light'
				: mode;

		setMode(resolvedCurrent === 'dark' ? 'light' : 'dark');
	}, [mode, setMode]);

	// Only re-computed when the theme prop reference changes.
	const overrideCss = useMemo(() => {
		if (!theme) return null;
		return generateOverrideCss(theme);
	}, [theme]);

	const contextValue = useMemo(
		() => ({ mode, setMode, toggleMode }),
		[mode, setMode, toggleMode]
	);

	return (
		<ThemeContext.Provider value={contextValue}>
			{overrideCss && (
				<style
					id="thread-theme-overrides"
					dangerouslySetInnerHTML={{ __html: overrideCss }}
				/>
			)}
			{children}
		</ThemeContext.Provider>
	);
};

/**
 * Returns the current theme mode and controls for updating it.
 * Must be used within a `<ThemeProvider>`.
 *
 * @throws If used outside of `<ThemeProvider>`
 *
 * @example
 * const { mode, setMode, toggleMode } = useThemeMode();
 */
export const useThemeMode = (): ThemeContextValue => {
	const context = useContext(ThemeContext);
	if (!context) {
		throw new Error('useThemeMode must be used within a <ThemeProvider>');
	}
	return context;
};
