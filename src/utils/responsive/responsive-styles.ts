import { useState, useEffect } from 'react';
import { useTheme } from '../theme/theme-provider';

type BreakpointKey = 'base' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl';
type ResponsiveValue<T> = Partial<Record<BreakpointKey, T>>;

export function useResponsiveStyles<T>(values: ResponsiveValue<T> | T) {
	const theme = useTheme();
	const [currentValue, setCurrentValue] = useState<T | undefined>();
	const [windowWidth, setWindowWidth] = useState(0);

	// Convert single value to responsive object
	const responsiveValues: ResponsiveValue<T> =
		typeof values === 'object' && !Array.isArray(values) ? (values as ResponsiveValue<T>) : { base: values as T };

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
