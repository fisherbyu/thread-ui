'use client';
import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { ThemeConfig } from '@/types';
import { setTheme } from './get-theme';

// Minimal context for theme mode only
type ThemeContextType = {
	mode: 'light' | 'dark' | 'system';
	setMode: (mode: 'light' | 'dark' | 'system') => void;
	toggleMode: () => void;
};

const ThemeContext = createContext<ThemeContextType>({
	mode: 'system',
	setMode: () => {},
	toggleMode: () => {},
});

// No-flash script as a string (will be injected)
const NO_FLASH_SCRIPT = `
(function() {
  try {
    const getSystemTheme = () => window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    const stored = localStorage.getItem('thread-ui-mode');
    const mode = stored || 'system';
    const actualMode = mode === 'system' ? getSystemTheme() : mode;
    
    // Apply theme class to prevent flash
    document.documentElement.setAttribute('data-theme', actualMode);
    document.documentElement.style.colorScheme = actualMode;
  } catch (e) {
   consol.log('error here', e)
    document.documentElement.setAttribute('data-theme', 'light');
  }
})();
`;

interface ThemeProviderProps {
	children: ReactNode;
	theme?: ThemeConfig;
	defaultMode?: 'light' | 'dark' | 'system';
}

export function ThemeProvider({ children, theme, defaultMode = 'system' }: ThemeProviderProps) {
	const [mode, setModeState] = useState<'light' | 'dark' | 'system'>(defaultMode);
	const [mounted, setMounted] = useState(false);

	// Inject no-flash script on first mount
	useEffect(() => {
		// Only inject if not already present
		if (typeof document !== 'undefined' && !document.getElementById('thread-ui-no-flash')) {
			const script = document.createElement('script');
			script.id = 'thread-ui-no-flash';
			script.innerHTML = NO_FLASH_SCRIPT;
			document.head.insertBefore(script, document.head.firstChild);
		}
		setMounted(true);
	}, []);

	// Initialize theme and mode from localStorage
	useEffect(() => {
		if (!mounted) return;

		const initializeTheme = () => {
			try {
				// Get stored mode preference
				const storedMode = localStorage.getItem('thread-ui-mode') as 'light' | 'dark' | 'system' | null;
				const initialMode = storedMode || defaultMode;
				setModeState(initialMode);

				// Apply custom theme if provided
				if (theme) {
					setTheme(theme);
				}

				// Set up system theme listener for 'system' mode
				const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
				const handleSystemChange = () => {
					if (initialMode === 'system') {
						const systemMode = mediaQuery.matches ? 'dark' : 'light';
						document.documentElement.setAttribute('data-theme', systemMode);
						document.documentElement.style.colorScheme = systemMode;
					}
				};

				mediaQuery.addEventListener('change', handleSystemChange);

				// Initial application
				handleSystemChange();

				return () => mediaQuery.removeEventListener('change', handleSystemChange);
			} catch (e) {
				console.warn('Theme initialization failed:', e);
			}
		};

		const cleanup = initializeTheme();
		return cleanup;
	}, [mounted, theme, defaultMode]);

	const setMode = (newMode: 'light' | 'dark' | 'system') => {
		setModeState(newMode);

		try {
			localStorage.setItem('thread-ui-mode', newMode);
		} catch (e) {
			console.warn('Failed to save theme mode:', e);
		}

		// Apply theme immediately
		const actualMode =
			newMode === 'system' ? (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light') : newMode;

		document.documentElement.setAttribute('data-theme', actualMode);
		document.documentElement.style.colorScheme = actualMode;
	};

	const toggleMode = () => {
		const currentActualMode =
			mode === 'system' ? (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light') : mode;

		setMode(currentActualMode === 'light' ? 'dark' : 'light');
	};

	// Don't render until mounted to prevent hydration issues
	if (!mounted) {
		return <>{children}</>;
	}

	return <ThemeContext.Provider value={{ mode, setMode, toggleMode }}>{children}</ThemeContext.Provider>;
}

// Hook to access theme controls
export function useTheme() {
	const context = useContext(ThemeContext);
	if (!context) {
		throw new Error('useTheme must be used within a ThemeProvider');
	}
	return context;
}

// Hook for simple theme toggling
export function useThemeToggle() {
	const { toggleMode } = useTheme();
	return toggleMode;
}

// Optional: Hook to update the theme configuration
export function useThemeConfig() {
	return {
		updateTheme: (newTheme: ThemeConfig) => {
			setTheme(newTheme);
			try {
				localStorage.setItem('thread-ui-theme-config', JSON.stringify(newTheme));
			} catch (e) {
				console.warn('Failed to save theme config:', e);
			}
		},
		resetTheme: () => {
			try {
				localStorage.removeItem('thread-ui-theme-config');
				// Apply default theme
				setTheme({});
			} catch (e) {
				console.warn('Failed to reset theme:', e);
			}
		},
	};
}
