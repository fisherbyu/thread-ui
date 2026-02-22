import { ThreadTheme } from '@/theme';
import { ColoredTextOptions } from '@/types';

/**
 * Returns Theme Color CSS Variable
 * @param color Colored Text Option
 * @returns CSS Theme Variable
 */
export const getColoredTextColor = (color: ColoredTextOptions): string => {
	switch (color) {
		case 'standard':
			return ThreadTheme.text.standard;
		case 'text-secondary':
			return ThreadTheme.text.secondary;
		case 'disabled':
			return ThreadTheme.text.disabled;
		case 'accent':
			return ThreadTheme.text.accent;
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
		default:
			return ThreadTheme.text.standard;
	}
};
