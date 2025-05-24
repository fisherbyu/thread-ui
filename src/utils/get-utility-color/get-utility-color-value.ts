'use client';
import { ThreadTheme } from '@/functions';
import { UtilityColorOptions } from '../../types';

export const getUtilityColorValue = (color: UtilityColorOptions): string => {
	switch (color) {
		case 'primary':
			return ThreadTheme.primary.main;
		case 'secondary':
			return ThreadTheme.secondary.main;
		case 'tertiary':
			return ThreadTheme.tertiary.main;
		case 'black':
			return ThreadTheme.black;
		case 'gray':
			return ThreadTheme.gray.main;
		case 'success':
			return ThreadTheme.success.main;
		case 'error':
			return ThreadTheme.error.main;
		case 'info':
			return ThreadTheme.info.main;
		case 'text':
			return ThreadTheme.text.primary;
		default:
			return ThreadTheme.primary.main;
	}
};
