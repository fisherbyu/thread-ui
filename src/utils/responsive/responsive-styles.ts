'use client';
import { useState, useEffect, useRef } from 'react';
import { ResponsiveStylesProps } from './responsive-styles.types';

const BREAKPOINTS = {
	sm: 0,
	md: 768,
	lg: 1024,
	xl: 1280,
	xxl: 1536,
} as const;

// Function to determine the correct breakpoint value
const getResponsiveValueFromWidth = (width: number, props: ResponsiveStylesProps) => {
	if (width >= BREAKPOINTS.xxl && props.xxl) return props.xxl;
	if (width >= BREAKPOINTS.xl && props.xl) return props.xl;
	if (width >= BREAKPOINTS.lg && props.lg) return props.lg;
	if (width >= BREAKPOINTS.md && props.md) return props.md;
	return props.sm;
};

// Helper to safely get window width even during hydration
const getInitialWindowWidth = (): number => {
	// This is specifically for Next.js to prevent hydration mismatch
	if (typeof window === 'undefined') return 0;
	return window.innerWidth;
};

export const useResponsiveStyles = (props: ResponsiveStylesProps) => {
	// Use ref to track if this is the first render
	const isFirstRender = useRef(true);

	// Initialize with current window width or fallback to 0 for SSR
	const [windowWidth, setWindowWidth] = useState<number>(getInitialWindowWidth());

	// Get the value based on current window size
	const [value, setValue] = useState(() => {
		// For first render during SSR, default to sm to avoid hydration mismatch
		if (typeof window === 'undefined') return props.sm;
		// Otherwise calculate based on actual window width
		return getResponsiveValueFromWidth(windowWidth, props);
	});

	// This effect runs on client-side after hydration to ensure correct value
	useEffect(() => {
		// This runs once on mount to ensure we have the correct window width
		if (isFirstRender.current) {
			const currentWidth = window.innerWidth;
			setWindowWidth(currentWidth);
			setValue(getResponsiveValueFromWidth(currentWidth, props));
			isFirstRender.current = false;
		}

		const handleResize = () => {
			const newWidth = window.innerWidth;
			setWindowWidth(newWidth);
			setValue(getResponsiveValueFromWidth(newWidth, props));
		};

		// Immediately set the correct size
		handleResize();

		window.addEventListener('resize', handleResize);
		return () => window.removeEventListener('resize', handleResize);
	}, [props]); // Re-run when props change

	return value;
};

// Improved static version for non-reactive contexts
export const getResponsiveValue = (props: ResponsiveStylesProps): any => {
	// During SSR, return sm breakpoint
	if (typeof window === 'undefined') return props.sm;

	// On client, calculate based on actual window size
	return getResponsiveValueFromWidth(window.innerWidth, props);
};
