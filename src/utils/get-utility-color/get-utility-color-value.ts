'use client';
import { UtilityColorOptions } from '../../types';
import { getCurrentTheme } from '../';

export const getUtilityColorValue = (color: UtilityColorOptions): string => {
	const theme = getCurrentTheme();
	switch (color) {
		case 'primary':
			return theme.colors.primary.main;
		case 'secondary':
			return theme.colors.secondary.main;
		case 'tertiary':
			return theme.colors.tertiary.main;
		case 'black':
			return theme.colors.black;
		case 'gray':
			return theme.colors.gray.main;
		case 'success':
			return theme.colors.success.main;
		case 'error':
			return theme.colors.error.main;
		case 'info':
			return theme.colors.info.main;
		case 'text':
			return theme.colors.text.primary;
		default:
			return theme.colors.primary.main;
	}
};
