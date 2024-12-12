import { renderHook, act } from '@testing-library/react';
import { useColorMode } from './use-color-mode';
import { ColorMode } from '../../types';
import { describe, it, expect, afterEach, beforeEach, jest } from '@jest/globals';

// Define types for our mocked MediaQueryList
interface MockMediaQueryList {
	matches: boolean;
	addEventListener: (event: string, listener: (e: MediaQueryListEvent) => void) => void;
	removeEventListener: (event: string, listener: (e: MediaQueryListEvent) => void) => void;
	dispatchEvent: (matches: boolean) => void;
}

// Mock localStorage
const localStorageMock = (() => {
	let store: { [key: string]: string } = {};
	return {
		getItem: (key: string) => store[key],
		setItem: (key: string, value: string) => {
			store[key] = value;
		},
		clear: () => {
			store = {};
		},
	};
})();

Object.defineProperty(window, 'localStorage', { value: localStorageMock });

// Mock matchMedia
const matchMediaMock = (matches: boolean): MockMediaQueryList => {
	let listeners: ((e: MediaQueryListEvent) => void)[] = [];
	return {
		matches,
		addEventListener: (event: string, listener: (e: MediaQueryListEvent) => void) => {
			listeners.push(listener);
		},
		removeEventListener: (event: string, listener: (e: MediaQueryListEvent) => void) => {
			listeners = listeners.filter((l) => l !== listener);
		},
		dispatchEvent: (matches: boolean) => {
			listeners.forEach((listener) => listener({ matches } as MediaQueryListEvent));
		},
	};
};

describe('useColorMode', () => {
	beforeEach(() => {
		localStorage.clear();
		// Reset matchMedia for each test
		Object.defineProperty(window, 'matchMedia', {
			writable: true,
			value: jest.fn((() => matchMediaMock(false)) as any),
		});
	});

	it('should initialize with light mode when no preference is set', () => {
		const { result } = renderHook(() => useColorMode());
		expect(result.current.colorMode).toBe('light');
	});

	it('should initialize with dark mode when system preference is dark', () => {
		window.matchMedia = jest.fn((() => matchMediaMock(true)) as any);
		const { result } = renderHook(() => useColorMode());
		expect(result.current.colorMode).toBe('dark');
	});

	it('should initialize with saved preference from localStorage', () => {
		localStorage.setItem('color-mode', 'dark');
		const { result } = renderHook(() => useColorMode());
		expect(result.current.colorMode).toBe('dark');
	});

	it('should toggle between light and dark modes', () => {
		const { result } = renderHook(() => useColorMode());

		act(() => {
			result.current.toggleColorMode();
		});
		expect(result.current.colorMode).toBe('dark');

		act(() => {
			result.current.toggleColorMode();
		});
		expect(result.current.colorMode).toBe('light');
	});

	it('should set color mode directly', () => {
		const { result } = renderHook(() => useColorMode());

		act(() => {
			result.current.setColorMode('dark');
		});
		expect(result.current.colorMode).toBe('dark');
		expect(localStorage.getItem('color-mode')).toBe('dark');
	});

	it('should update localStorage when color mode changes', () => {
		const { result } = renderHook(() => useColorMode());

		act(() => {
			result.current.setColorMode('dark');
		});
		expect(localStorage.getItem('color-mode')).toBe('dark');
	});

	it('should respond to system preference changes when no manual preference is set', () => {
		const mediaQuery = matchMediaMock(false);
		window.matchMedia = jest.fn(() => mediaQuery);

		const { result } = renderHook(() => useColorMode());
		expect(result.current.colorMode).toBe('light');

		act(() => {
			mediaQuery.dispatchEvent(true);
		});
		expect(result.current.colorMode).toBe('dark');
	});

	it('should not respond to system preference changes when manual preference is set', () => {
		const mediaQuery = matchMediaMock(false);
		window.matchMedia = jest.fn(() => mediaQuery);

		const { result } = renderHook(() => useColorMode());

		act(() => {
			result.current.setColorMode('light');
		});

		act(() => {
			mediaQuery.dispatchEvent(true);
		});
		expect(result.current.colorMode).toBe('light');
	});
});
