import { useState, useEffect } from 'react';
import { useTheme } from '../theme/theme-provider';
import { CSSProperties } from 'react';

// Helper types
type CSSPropertyValue<T extends keyof CSSProperties> = CSSProperties[T];
type BreakpointKey = 'base' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl';

// Type to ensure CSS property keys are valid
type CSSPropertyKey = keyof CSSProperties;

// Type for the values object
type ResponsiveValues<T> = Partial<Record<BreakpointKey, T>>;

export function useResponsiveStyles<T extends CSSPropertyKey>(
	property: T,
	values: ResponsiveValues<CSSPropertyValue<T>> | CSSPropertyValue<T>
) {
	const theme = useTheme();
	const [currentValue, setCurrentValue] = useState<CSSPropertyValue<T>>();
	const [windowWidth, setWindowWidth] = useState(0);

	// Convert single value to responsive object
	const responsiveValues: ResponsiveValues<CSSPropertyValue<T>> = typeof values === 'object' ? values : { base: values };

	useEffect(() => {
		setWindowWidth(window.innerWidth);

		const handleResize = () => {
			setWindowWidth(window.innerWidth);
		};

		window.addEventListener('resize', handleResize);
		return () => window.removeEventListener('resize', handleResize);
	}, []);

	useEffect(() => {
		const breakpoints = theme.sizes;

		let newValue = responsiveValues.base;

		if (windowWidth >= breakpoints.xxl && responsiveValues.xxl) {
			newValue = responsiveValues.xxl;
		} else if (windowWidth >= breakpoints.xl && responsiveValues.xl) {
			newValue = responsiveValues.xl;
		} else if (windowWidth >= breakpoints.lg && responsiveValues.lg) {
			newValue = responsiveValues.lg;
		} else if (windowWidth >= breakpoints.md && responsiveValues.md) {
			newValue = responsiveValues.md;
		} else if (windowWidth >= breakpoints.sm && responsiveValues.sm) {
			newValue = responsiveValues.sm;
		}

		setCurrentValue(newValue);
	}, [windowWidth, responsiveValues, theme]);

	return currentValue;
}
