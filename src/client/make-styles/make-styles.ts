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

// Flexible CSS Properties Type
type CSSPropertiesWithCustomValues = {
	[K in keyof CSSProperties]: CSSProperties[K] | string | number;
};

/**
 * Extension of CSSProperties, with option to pass in responsive object
 */
type ResponsiveStyles = {
	[K in keyof CSSProperties]?: CSSProperties[K] | ResponsiveValue<CSSProperties[K] | string | number>;
};

/**
 * Extension of ResponsiveStyles, with nested Hover and Dark mode Properties
 */
type MakeStylesProps = ResponsiveStyles & {
	hover?: CSSPropertiesWithCustomValues;
	dark?: MakeStylesProps; // Recursive type allowing full nesting
};

// Check if a value is a responsive object
const isResponsiveValue = (value: any): value is ResponsiveValue<any> => {
	return value !== null && typeof value === 'object' && 'sm' in value;
};

/**
 * Process styles into emotion-compatible object with media queries
 */
const processStyles = (styles: Omit<MakeStylesProps, 'dark'>) => {
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

	return emotionStyleObject;
};

export const transformStyles = (styles: MakeStylesProps) => {
	const { dark, ...lightStyles } = styles;

	// Process light mode styles
	const emotionStyleObject = processStyles(lightStyles);

	// Process dark mode styles if provided
	if (dark) {
		const darkStyleObject = processStyles(dark);

		// Add explicit dark theme selector (matches your [data-theme='dark'] approach)
		emotionStyleObject['[data-theme="dark"] &'] = darkStyleObject;

		// Add system preference dark mode selector (matches your prefers-color-scheme approach)
		emotionStyleObject['@media (prefers-color-scheme: dark)'] = {
			':root:not([data-theme]) &': darkStyleObject,
		};
	}

	return emotionStyleObject;
};

export const transformStyleObjects = (styles: Record<string, MakeStylesProps>) => {
	return Object.fromEntries(Object.entries(styles).map(([key, value]) => [key, transformStyles(value)]));
};

const cache = new WeakMap<MakeStylesProps, any>();

/**
 * Generate CSS Classes through Emotion CSS
 * @param styles Responsive CSSProperties with optional dark mode support
 * @returns CSS Class Name
 */
export const makeStyles = (styles: MakeStylesProps) => {
	if (cache.has(styles)) {
		console.log('CACHE:', styles);
		return cache.get(styles);
	}
	const emotionStyleObject = transformStyles(styles);

	// Generate the className using Emotion's css function
	const className = css(emotionStyleObject);
	cache.set(styles, className);
	return className;
};

/**
 * Generate object CSS Classes through Emotion CSS
 * @param styles Responsive CSSProperties
 * @returns Dictionary of CSS Class Names
 */
export const makeStyleObject = (styles: Record<string, MakeStylesProps>) => {
	return Object.fromEntries(Object.entries(styles).map(([key, value]) => [key, makeStyles(value)]));
};

/**
 * Generate memoized CSS Classes through Emotion CSS
 * @param styles Responsive CSSProperties
 * @returns CSS Class Name
 */
export const useThreadStyles = (styles: MakeStylesProps) => {
	return useMemo(() => makeStyles(styles), [JSON.stringify(styles)]);
};

/**
 * Generate memoized object CSS Classes through Emotion CSS
 * @param styles Responsive CSSProperties
 * @returns Dictionary of CSS Class Names
 */
export const useThreadStyleObjects = (styles: Record<string, MakeStylesProps>) => {
	return useMemo(() => {
		return Object.fromEntries(Object.entries(styles).map(([key, value]) => [key, makeStyles(value)]));
	}, [JSON.stringify(styles)]);
};
