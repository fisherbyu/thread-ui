import { useState, useEffect } from 'react';
import { useTheme } from '../theme/theme-provider';

type ResponsiveStylesProps = {
	base: number | string;
	sm?: number | string;
	md?: number | string;
	lg?: number | string;
	xl?: number | string;
	xxl?: number | string;
};

export function useResponsiveStyles(values: ResponsiveStylesProps) {
	const theme = useTheme();
	const [currentValue, setCurrentValue] = useState<number | string>(values.base);
	const [windowWidth, setWindowWidth] = useState(0);

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

		// Start with base value
		let newValue = values.base;

		// Only override if the breakpoint exists and window width matches
		if (windowWidth >= breakpoints.sm && values.sm !== undefined) {
			newValue = values.sm;
		}
		if (windowWidth >= breakpoints.md && values.md !== undefined) {
			newValue = values.md;
		}
		if (windowWidth >= breakpoints.lg && values.lg !== undefined) {
			newValue = values.lg;
		}
		if (windowWidth >= breakpoints.xl && values.xl !== undefined) {
			newValue = values.xl;
		}
		if (windowWidth >= breakpoints.xxl && values.xxl !== undefined) {
			newValue = values.xxl;
		}

		setCurrentValue(newValue);
	}, [windowWidth, values, theme]);

	return currentValue;
}
