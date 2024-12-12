import { renderHook } from '@testing-library/react';
import { useTheme } from './use-theme';
import { DEFAULT_THEME as MOCK_DEFAULT_THEME } from '../../defaults';
import { Theme, AppliedTheme } from '../../types';
import { describe, it, expect, jest, beforeEach } from '@jest/globals';

// Mock useThemeConfig module
const mockUseThemeConfig = jest.fn();
jest.mock('./use-theme-config', () => ({
	useThemeConfig: () => mockUseThemeConfig(),
}));

describe('useTheme', () => {
	const mockMatchMedia = (matches: boolean) => {
		Object.defineProperty(window, 'matchMedia', {
			writable: true,
			value: jest.fn().mockImplementation((query) => ({
				matches,
				media: query,
				onchange: null,
				addListener: jest.fn(),
				removeListener: jest.fn(),
				addEventListener: jest.fn(),
				removeEventListener: jest.fn(),
				dispatchEvent: jest.fn(),
			})),
		});
	};

	beforeEach(() => {
		jest.resetModules();
		mockMatchMedia(false); // Default to light mode
		mockUseThemeConfig.mockReturnValue(MOCK_DEFAULT_THEME);
	});

	it('should return applied theme with light mode colors by default', () => {
		const { result } = renderHook(() => useTheme());

		expect(result.current.colors.background).toBe(MOCK_DEFAULT_THEME.colors.background.light);
		expect(result.current.colors.surface).toBe(MOCK_DEFAULT_THEME.colors.surface.light);
		expect(result.current.colors.structure).toBe(MOCK_DEFAULT_THEME.colors.structure.light);
		expect(result.current.colors.text.primary).toBe(MOCK_DEFAULT_THEME.colors.text.primary.light);
		expect(result.current.colors.text.disabled).toBe(MOCK_DEFAULT_THEME.colors.text.disabled.light);

		expect(result.current.borders).toEqual(MOCK_DEFAULT_THEME.borders);
		expect(result.current.sizes).toEqual(MOCK_DEFAULT_THEME.sizes);
	});

	it('should return applied theme with dark mode colors when system prefers dark', () => {
		mockMatchMedia(true); // Set system preference to dark mode

		const { result } = renderHook(() => useTheme());

		expect(result.current.colors.background).toBe(MOCK_DEFAULT_THEME.colors.background.dark);
		expect(result.current.colors.surface).toBe(MOCK_DEFAULT_THEME.colors.surface.dark);
		expect(result.current.colors.structure).toBe(MOCK_DEFAULT_THEME.colors.structure.dark);
		expect(result.current.colors.text.primary).toBe(MOCK_DEFAULT_THEME.colors.text.primary.dark);
		expect(result.current.colors.text.disabled).toBe(MOCK_DEFAULT_THEME.colors.text.disabled.dark);
	});

	it('should merge custom theme with default theme', () => {
		const customTheme: Theme = {
			...MOCK_DEFAULT_THEME,
			colors: {
				...MOCK_DEFAULT_THEME.colors,
				primary: {
					light: '#custom-light',
					medium: '#custom-medium',
					dark: '#custom-dark',
				},
			},
		};

		mockUseThemeConfig.mockReturnValue(customTheme);

		const { result } = renderHook(() => useTheme());

		expect(result.current.colors.primary.light).toBe('#custom-light');
		expect(result.current.colors.primary.medium).toBe('#custom-medium');
		expect(result.current.colors.primary.dark).toBe('#custom-dark');
		expect(result.current.colors.secondary).toEqual(MOCK_DEFAULT_THEME.colors.secondary);
	});

	it('should handle missing config theme gracefully', () => {
		mockUseThemeConfig.mockReturnValue(undefined);

		const { result } = renderHook(() => useTheme());

		expect(result.current.colors.background).toBe(MOCK_DEFAULT_THEME.colors.background.light);
		expect(result.current.colors.surface).toBe(MOCK_DEFAULT_THEME.colors.surface.light);
	});

	it('should handle partial theme overrides correctly', () => {
		const partialTheme: Partial<Theme> = {
			colors: {
				...MOCK_DEFAULT_THEME.colors,
				background: {
					light: '#custom-light-bg',
					dark: '#custom-dark-bg',
				},
			},
		};

		mockUseThemeConfig.mockReturnValue(partialTheme as Theme);

		const { result } = renderHook(() => useTheme());

		expect(result.current.colors.background).toBe('#custom-light-bg');
		expect(result.current.colors.surface).toBe(MOCK_DEFAULT_THEME.colors.surface.light);
		expect(result.current.borders).toEqual(MOCK_DEFAULT_THEME.borders);
	});

	it('should handle errors gracefully and return default theme', () => {
		mockUseThemeConfig.mockReturnValue({} as Theme);

		const { result } = renderHook(() => useTheme());

		expect(result.current).toEqual(
			expect.objectContaining({
				colors: expect.objectContaining({
					background: MOCK_DEFAULT_THEME.colors.background.light,
					surface: MOCK_DEFAULT_THEME.colors.surface.light,
				}),
			})
		);
	});

	it('should handle server-side rendering (no window object)', () => {
		const originalMatchMedia = window.matchMedia;
		delete (window as any).matchMedia;

		const { result } = renderHook(() => useTheme());

		expect(result.current.colors.background).toBe(MOCK_DEFAULT_THEME.colors.background.light);

		window.matchMedia = originalMatchMedia;
	});
});
