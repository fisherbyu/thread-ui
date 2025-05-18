import { css } from '@emotion/css';
import { CSSProperties } from 'react';

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

type ResponsiveStyles = {
	[K in keyof CSSProperties]?: CSSProperties[K] | ResponsiveValue<CSSProperties[K]>;
};

type MakeStylesProps = ResponsiveStyles & {
	hover?: CSSProperties;
};

const translateCSSProperties = (styles: CSSProperties): string => {
	return Object.entries(styles)
		.map(([key, value]) => {
			// Convert camelCase to kebab-case
			const cssKey = key.replace(/([A-Z])/g, '-$1').toLowerCase();
			return `${cssKey}: ${value};`;
		})
		.join('\n');
};

// Check if a value is a responsive object
const isResponsiveValue = (value: any): value is ResponsiveValue<any> => {
	return value !== null && typeof value === 'object' && 'sm' in value;
};

export const makeStyles = (styles: MakeStylesProps) => {
	const { hover, ...baseStyles } = styles;

	// Process base styles
	let processedBaseStyles = '';
	let mediaQueries: Record<BreakpointKey, string[]> = {
		sm: [],
		md: [],
		lg: [],
		xl: [],
		xxl: [],
	};

	// Process each style property
	Object.entries(baseStyles).forEach(([key, value]) => {
		const cssKey = key.replace(/([A-Z])/g, '-$1').toLowerCase();

		if (isResponsiveValue(value)) {
			// Handle responsive values
			Object.entries(value).forEach(([breakpoint, breakpointValue]) => {
				const bpKey = breakpoint as BreakpointKey;
				if (breakpointValue !== undefined) {
					mediaQueries[bpKey].push(`${cssKey}: ${breakpointValue};`);
				}
			});
		} else {
			// Handle direct values
			processedBaseStyles += `${cssKey}: ${value};\n`;
		}
	});

	// Build media queries string
	let mediaQueriesString = '';

	// Always include sm styles in the base (no media query)
	if (mediaQueries.sm.length > 0) {
		processedBaseStyles += mediaQueries.sm.join('\n') + '\n';
	}

	// Generate media queries for other breakpoints
	Object.entries(BREAKPOINTS).forEach(([breakpoint, minWidth]) => {
		if (breakpoint === 'sm') return; // Skip sm as it's included in base styles

		const bpKey = breakpoint as BreakpointKey;
		if (mediaQueries[bpKey].length > 0) {
			mediaQueriesString += `
        @media (min-width: ${minWidth}px) {
          ${mediaQueries[bpKey].join('\n')}
        }
      `;
		}
	});

	// Build hover styles
	const hoverStyles = hover ? `&:hover { ${translateCSSProperties(hover)} }` : '';

	// Combine everything
	return css`
		${processedBaseStyles}
		${mediaQueriesString}
    ${hoverStyles}
	`;
};

export const makeStyleObject = (styles: Record<string, MakeStylesProps>) => {
	return Object.fromEntries(Object.entries(styles).map(([key, value]) => [key, makeStyles(value)]));
};
