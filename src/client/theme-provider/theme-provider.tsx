'use client';
import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { setTheme } from './set-theme';
import { ThemeConfig } from '@/types';

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
// Enhanced no-flash script for ThemeProvider
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
    
    // ENHANCED: Also restore custom theme CSS immediately
    try {
      const storedThemeConfig = localStorage.getItem('thread-ui-theme-config');
      if (storedThemeConfig) {
        const themeConfig = JSON.parse(storedThemeConfig);
        
        // Quick and dirty CSS variable application
        const applyThemeVariables = (config, selector = ':root') => {
          const styles = [];
          
          const flatten = (obj, prefix = '--thread-') => {
            Object.entries(obj).forEach(([key, value]) => {
              if (value && typeof value === 'object' && !Array.isArray(value)) {
                flatten(value, prefix + key + '-');
              } else if (typeof value === 'string') {
                styles.push(prefix + key + ': ' + value);
              }
            });
          };
          
          flatten(config);
          
          if (styles.length > 0) {
            const styleEl = document.createElement('style');
            styleEl.id = 'thread-ui-no-flash-theme';
            styleEl.textContent = selector + ' { ' + styles.join('; ') + ' }';
            document.head.appendChild(styleEl);
          }
        };
        
        // Apply light mode variables
        const { darkMode, ...lightMode } = themeConfig;
        if (Object.keys(lightMode).length > 0) {
          applyThemeVariables(lightMode, ':root');
        }
        
        // Apply dark mode variables if in dark mode
        if (darkMode && actualMode === 'dark') {
          applyThemeVariables(darkMode, ':root[data-theme="dark"]');
        }
      }
    } catch (themeError) {
      console.warn('Failed to restore theme in no-flash script:', themeError);
    }
    
  } catch (e) {
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

				// FIXED: Restore custom theme from localStorage first
				let appliedTheme: ThemeConfig;
				try {
					const storedThemeConfig = localStorage.getItem('thread-ui-theme-config');
					if (storedThemeConfig) {
						appliedTheme = JSON.parse(storedThemeConfig);
						setTheme(appliedTheme);
					}
				} catch (e) {
					console.warn('Failed to restore stored theme config:', e);
				}

				// Apply theme prop if provided (this overrides stored theme)
				if (theme) {
					setTheme(theme);
					appliedTheme = theme;
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
