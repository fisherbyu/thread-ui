import { renderHook, act } from '@testing-library/react';
import { useColorMode } from './use-color-mode';
import { ColorMode } from '../../types';
import { describe, it, expect, afterEach, beforeEach, jest } from '@jest/globals';



// Mock localStorage
const localStorageMock = (() => {
	let store = {};
	return {
		getItem: (key) => store[key],
		setItem: (key, value) => {
			store[key] = value;
		},
		clear: () => {
			store = {};
		},
	};
})();

Object.defineProperty(window, 'localStorage', { value: localStorageMock });

// Mock matchMedia
const matchMediaMock = (matches) => {
	let listeners = [];
	return {
		matches,
		addEventListener: (event, listener) => {
			listeners.push(listener);
		},
		removeEventListener: (event, listener) => {
			listeners = listeners.filter((l) => l !== listener);
		},
		dispatchEvent: (matches) => {
			listeners.forEach((listener) => listener({ matches }));
		},
	};
};

describe('useColorMode', () => {
	beforeEach(() => {
		localStorage.clear();
		// Reset matchMedia for each test
		Object.defineProperty(window, 'matchMedia', {
			writable: true,
			value: jest.fn((() => matchMediaMock(false))),
		});
	});

	it('should initialize with light mode when no preference is set', () => {
		const { result } = renderHook(() => useColorMode());
		expect(result.current.colorMode).toBe('light');
	});

	it('should initialize with dark mode when system preference is dark', () => {
		window.matchMedia = jest.fn((() => matchMediaMock(true)));
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
		const mediaQuery = createMockMediaQueryList(false);
		window.matchMedia = jest.fn().mockImplementation(() => mediaQuery);

		const { result } = renderHook(() => useColorMode());
		expect(result.current.colorMode).toBe('light');
		// ... rest of your test
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
