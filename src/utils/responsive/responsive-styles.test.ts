import { renderHook } from '@testing-library/react';
import { useResponsiveStyles, getResponsiveValue } from './responsive-styles';
import { ResponsiveStylesProps } from './responsive-styles.types';
import { describe, it, expect, afterEach } from '@jest/globals';
import { act } from '@testing-library/react';

describe('Responsive Styles', () => {
	const originalInnerWidth = window.innerWidth;
	const mockResizeEvent = new Event('resize');

	// Mock window resize helper
	const setWindowWidth = (width: number) => {
		act(() => {
			Object.defineProperty(window, 'innerWidth', {
				writable: true,
				configurable: true,
				value: width,
			});
			window.dispatchEvent(mockResizeEvent);
		});
	};

	// Reset window.innerWidth after each test
	afterEach(() => {
		Object.defineProperty(window, 'innerWidth', {
			writable: true,
			configurable: true,
			value: originalInnerWidth,
		});
	});

	describe('useResponsiveStyles', () => {
		const testProps: ResponsiveStylesProps = {
			sm: 'small',
			md: 'medium',
			lg: 'large',
			xl: 'extra-large',
			xxl: 'extra-extra-large',
		};

		it('should return sm value for mobile width', () => {
			setWindowWidth(500);
			const { result } = renderHook(() => useResponsiveStyles(testProps));
			expect(result.current).toBe('small');
		});

		it('should return md value for tablet width', () => {
			setWindowWidth(800);
			const { result } = renderHook(() => useResponsiveStyles(testProps));
			expect(result.current).toBe('medium');
		});

		it('should return lg value for small desktop width', () => {
			setWindowWidth(1100);
			const { result } = renderHook(() => useResponsiveStyles(testProps));
			expect(result.current).toBe('large');
		});

		it('should return xl value for large desktop width', () => {
			setWindowWidth(1300);
			const { result } = renderHook(() => useResponsiveStyles(testProps));
			expect(result.current).toBe('extra-large');
		});

		it('should return xxl value for extra large desktop width', () => {
			setWindowWidth(1600);
			const { result } = renderHook(() => useResponsiveStyles(testProps));
			expect(result.current).toBe('extra-extra-large');
		});

		it('should fall back to smaller breakpoint if larger one is not provided', () => {
			const partialProps: ResponsiveStylesProps = {
				sm: 'small',
				lg: 'large',
			};
			setWindowWidth(800); // md breakpoint
			const { result } = renderHook(() => useResponsiveStyles(partialProps));
			expect(result.current).toBe('small');
		});

		it('should handle window resize events', () => {
			const { result } = renderHook(() => useResponsiveStyles(testProps));

			act(() => {
				setWindowWidth(500);
			});
			expect(result.current).toBe('small');

			act(() => {
				setWindowWidth(1600);
			});
			expect(result.current).toBe('extra-extra-large');
		});
	});

	describe('getResponsiveValue', () => {
		const testProps: ResponsiveStylesProps = {
			sm: 'small',
			md: 'medium',
			lg: 'large',
			xl: 'extra-large',
			xxl: 'extra-extra-large',
		};

		it('should return sm value when window is undefined', () => {
			const originalWindow = global.window;
			// @ts-ignore
			delete global.window;

			expect(getResponsiveValue(testProps)).toBe('small');

			// Restore window
			global.window = originalWindow;
		});

		it('should return correct value based on window width', () => {
			setWindowWidth(500);
			expect(getResponsiveValue(testProps)).toBe('small');

			setWindowWidth(800);
			expect(getResponsiveValue(testProps)).toBe('medium');

			setWindowWidth(1100);
			expect(getResponsiveValue(testProps)).toBe('large');

			setWindowWidth(1300);
			expect(getResponsiveValue(testProps)).toBe('extra-large');

			setWindowWidth(1600);
			expect(getResponsiveValue(testProps)).toBe('extra-extra-large');
		});

		it('should fall back to smaller breakpoint if larger one is not provided', () => {
			const partialProps: ResponsiveStylesProps = {
				sm: 'small',
				lg: 'large',
			};
			setWindowWidth(800); // md breakpoint
			expect(getResponsiveValue(partialProps)).toBe('small');
		});
	});
});
