'use client';
import { getThemeValue } from '../../functions';
import { UtilityColorOptions } from '../../types';

export const getUtilityColorValue = (color: UtilityColorOptions): string => {
	switch (color) {
		case 'primary':
			return getThemeValue().primary.main;
		case 'secondary':
			return getThemeValue().secondary.main;
		case 'tertiary':
			return getThemeValue().tertiary.main;
		case 'black':
			return getThemeValue().black;
		case 'gray':
			return getThemeValue().gray.main;
		case 'success':
			return getThemeValue().success.main;
		case 'error':
			return getThemeValue().error.main;
		case 'info':
			return getThemeValue().info.main;
		case 'text':
			return getThemeValue().text.primary;
		default:
			return getThemeValue().primary.main;
	}
};
