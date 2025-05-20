import { css } from '@emotion/css';
import { CSSProperties, useMemo } from 'react';

const BREAKPOINTS = {
	sm: 0,
	md: 768,
	lg: 1024,
	xl: 1280,
	xxl: 1536,
} as const;

type BreakpointKey = keyof typeof BREAKPOINTS;

type ResponsiveValue<T> = {
	sm: T;
	md?: T;
	lg?: T;
	xl?: T;
	xxl?: T;
};

// Use a more flexible type for CSS properties
type CSSPropertiesWithCustomValues = {
	[K in keyof CSSProperties]: CSSProperties[K] | string | number;
};

type ResponsiveStyles = {
	[K in keyof CSSProperties]?: CSSProperties[K] | ResponsiveValue<CSSProperties[K] | string | number>;
};

type MakeStylesProps = ResponsiveStyles & {
	hover?: CSSPropertiesWithCustomValues;
};

// Check if a value is a responsive object
const isResponsiveValue = (value: any): value is ResponsiveValue<any> => {
	return value !== null && typeof value === 'object' && 'sm' in value;
};

// Original makeStyles function (for non-hook usage)
export const makeStyles = (styles: MakeStylesProps) => {
	const { hover, ...baseStyles } = styles;
	// Create the base style object
	const baseStyleObject: Record<string, any> = {};

	// Media query style objects
	const mediaQueries: Record<BreakpointKey, Record<string, any>> = {
		sm: {},
		md: {},
		lg: {},
		xl: {},
		xxl: {},
	};

	// Process each style property
	Object.entries(baseStyles).forEach(([key, value]) => {
		if (isResponsiveValue(value)) {
			// Handle responsive values
			Object.entries(value).forEach(([breakpoint, breakpointValue]) => {
				const bpKey = breakpoint as BreakpointKey;
				if (breakpointValue !== undefined) {
					mediaQueries[bpKey][key] = breakpointValue;
				}
			});
		} else {
			// Handle direct values
			baseStyleObject[key] = value;
		}
	});

	// Merge sm styles into base styles
	Object.assign(baseStyleObject, mediaQueries.sm);

	// Create the final style object with media queries
	const emotionStyleObject: Record<string, any> = {
		...baseStyleObject,
	};

	// Add media queries for other breakpoints
	Object.entries(BREAKPOINTS).forEach(([breakpoint, minWidth]) => {
		if (breakpoint === 'sm') return; // Skip sm as it's included in base styles
		const bpKey = breakpoint as BreakpointKey;
		if (Object.keys(mediaQueries[bpKey]).length > 0) {
			emotionStyleObject[`@media (min-width: ${minWidth}px)`] = mediaQueries[bpKey];
		}
	});

	// Add hover styles if provided
	if (hover) {
		emotionStyleObject['&:hover'] = hover;
	}

	// Generate the className using Emotion's css function
	const className = css(emotionStyleObject);
	return className;
};

// New hook version that uses memoization
export const useThreadStyles = (styles: MakeStylesProps) => {
	return useMemo(
		() => makeStyles(styles),
		[
			// Include all properties of styles in the dependency array
			// This ensures the styles are recalculated only when they change
			JSON.stringify(styles),
		]
	);
};

// Memoized version of makeStyleObject
export const useThreadStyleObjects = (styles: Record<string, MakeStylesProps>) => {
	return useMemo(() => {
		return Object.fromEntries(Object.entries(styles).map(([key, value]) => [key, makeStyles(value)]));
	}, [JSON.stringify(styles)]);
};

// Original non-hook version of makeStyleObject
export const makeStyleObject = (styles: Record<string, MakeStylesProps>) => {
	return Object.fromEntries(Object.entries(styles).map(([key, value]) => [key, makeStyles(value)]));
};
