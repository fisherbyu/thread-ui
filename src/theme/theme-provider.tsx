'use client';

import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { ThemeConfig } from '@/types';
import { generateOverrideCss } from './generate-override-css';
import { applyModeToDocument, ThreadMode, THREAD_MODE_STORAGE_KEY } from './theme-mode';

// ─── Context ──────────────────────────────────────────────────────────────────

interface ThreadContextValue {
	mode: ThreadMode;
	setMode: (mode: ThreadMode) => void;
	toggleMode: () => void;
}

const ThreadContext = createContext<ThreadContextValue | null>(null);

// ─── Provider ─────────────────────────────────────────────────────────────────

interface ThemeProviderProps {
	children: React.ReactNode;
	theme?: ThemeConfig;
}

export function ThemeProvider({ children, theme }: ThemeProviderProps) {
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
		<ThreadContext.Provider value={contextValue}>
			{overrideCss && (
				<style
					id="thread-theme-overrides"
					dangerouslySetInnerHTML={{ __html: overrideCss }}
				/>
			)}
			{children}
		</ThreadContext.Provider>
	);
}

// ─── Internal context accessor (used by useThreadTheme) ───────────────────────
const useThreadContext = (): ThreadContextValue => {
	const context = useContext(ThreadContext);
	if (!context) {
		throw new Error('useThreadTheme must be used within a <ThemeProvider>');
	}
	return context;
};
