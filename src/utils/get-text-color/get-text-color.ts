import { ThreadTheme } from '@/functions';
import { TextColorOptions } from '@/types';

/**
 * Returns Theme Text Color CSS Variable
 * @param color Text Color
 * @returns CSS Theme Variable
 */
export const getTextColor = (color: TextColorOptions) => {
	switch (color) {
		case 'primary':
			return ThreadTheme.text.primary;
		case 'secondary':
			return ThreadTheme.text.secondary;
		case 'disabled':
			return ThreadTheme.text.disabled;
		default:
			return ThreadTheme.text.primary;
	}
};
