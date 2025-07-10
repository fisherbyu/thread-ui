import { css as pandaCss } from '../../styled-system/css'; // or '@pandacss/dev' for non-runtime builds
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

type CSSPropertiesWithCustomValues = {
	[K in keyof CSSProperties]: CSSProperties[K] | string | number;
};

type ResponsiveStyles = {
	[K in keyof CSSProperties]?: CSSProperties[K] | ResponsiveValue<CSSProperties[K] | string | number>;
};

type MakeStylesProps = ResponsiveStyles & {
	hover?: CSSPropertiesWithCustomValues;
	dark?: MakeStylesProps;
};

const isResponsiveValue = (value: any): value is ResponsiveValue<any> => {
	return value !== null && typeof value === 'object' && 'sm' in value;
};

const newProcessStyles = (styles: Omit<MakeStylesProps, 'dark'>) => {
	const { hover, ...baseStyles } = styles;

	const baseStyleObject: Record<string, any> = {};
	const responsive: Partial<Record<BreakpointKey, Record<string, any>>> = {};

	Object.entries(baseStyles).forEach(([key, value]) => {
		if (isResponsiveValue(value)) {
			Object.entries(value).forEach(([bp, val]) => {
				const breakpoint = bp as BreakpointKey;
				if (!responsive[breakpoint]) responsive[breakpoint] = {};
				responsive[breakpoint]![key] = val;
			});
		} else {
			baseStyleObject[key] = value;
		}
	});

	const final: any = {
		...baseStyleObject,
	};

	Object.entries(responsive).forEach(([breakpoint, styles]) => {
		final[`@${breakpoint}`] = styles;
	});

	if (hover) {
		final._hover = hover;
	}

	return final;
};

const newTransformStyles = (styles: MakeStylesProps) => {
	const { dark, ...lightStyles } = styles;
	const base = newProcessStyles(lightStyles);

	if (dark) {
		const darkStyles = newProcessStyles(dark);

		base['[data-theme="dark"] &'] = darkStyles;
		base['@media (prefers-color-scheme: dark)'] = {
			':root:not([data-theme]) &': darkStyles,
		};
	}

	return base;
};

const newCache = new WeakMap<MakeStylesProps, string>();

export const generateStyles = (styles: MakeStylesProps) => {
	if (newCache.has(styles)) {
		return newCache.get(styles)!;
	}
	const pandaStyleObject = newTransformStyles(styles);
	const className = pandaCss(pandaStyleObject);
	newCache.set(styles, className);
	return className;
};

export const generateStyleObject = (styles: Record<string, MakeStylesProps>) => {
	return Object.fromEntries(Object.entries(styles).map(([key, value]) => [key, generateStyles(value)]));
};
