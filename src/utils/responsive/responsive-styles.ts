'use client';
import { useState, useEffect } from 'react';
import { ResponsiveStylesProps } from './responsive-styles.types';

const BREAKPOINTS = {
	sm: 0,
	md: 768,
	lg: 1024,
	xl: 1280,
	xxl: 1536,
} as const;

export const useResponsiveStyles = (props: ResponsiveStylesProps) => {
	const [windowWidth, setWindowWidth] = useState<number>(typeof window !== 'undefined' ? window.innerWidth : 0);

	useEffect(() => {
		const handleResize = () => {
			setWindowWidth(window.innerWidth);
		};

		if (typeof window !== 'undefined') {
			window.addEventListener('resize', handleResize);
			handleResize(); // Initial call
		}

		return () => {
			if (typeof window !== 'undefined') {
				window.removeEventListener('resize', handleResize);
			}
		};
	}, []);

	// Get appropriate value based on current window width
	const getValue = () => {
		if (windowWidth >= BREAKPOINTS.xxl && props.xxl) return props.xxl;
		if (windowWidth >= BREAKPOINTS.xl && props.xl) return props.xl;
		if (windowWidth >= BREAKPOINTS.lg && props.lg) return props.lg;
		if (windowWidth >= BREAKPOINTS.md && props.md) return props.md;
		return props.sm;
	};

	return getValue();
};

// Static version for non-reactive contexts
export const getResponsiveValue = (props: ResponsiveStylesProps): any => {
	if (typeof window === 'undefined') return props.sm;

	const width = window.innerWidth;

	if (width >= BREAKPOINTS.xxl && props.xxl) return props.xxl;
	if (width >= BREAKPOINTS.xl && props.xl) return props.xl;
	if (width >= BREAKPOINTS.lg && props.lg) return props.lg;
	if (width >= BREAKPOINTS.md && props.md) return props.md;
	return props.sm;
};
