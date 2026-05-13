import { ThreadTheme } from '@/theme';
import { ColorShadeOptions, UtilityColorOptions } from '@/types';

const getUtilityColorObject = (color: UtilityColorOptions) => {
	switch (color) {
		case 'primary':
			return ThreadTheme.primary;
		case 'secondary':
			return ThreadTheme.secondary;
		case 'tertiary':
			return ThreadTheme.tertiary;
		case 'black':
			return { main: ThreadTheme.black } as Record<string, string>;
		case 'gray':
			return ThreadTheme.gray;
		case 'success':
			return ThreadTheme.success;
		case 'error':
			return ThreadTheme.error;
		case 'warning':
			return ThreadTheme.warning;
		case 'info':
			return ThreadTheme.info;
		case 'text':
			return { main: ThreadTheme.text.standard } as Record<string, string>;
		default: {
			const _exhaustive: never = color;
			return ThreadTheme.primary;
		}
	}
};

/**
 * Returns corresponding default theme color CSS Variable
 * @param color Color Option
 * @param shade Optional shade (defaults to 'main'). 'black' and 'text' only support 'main'.
 * @returns CSS Theme Variable string
 */
export const getUtilityColorValue = (
	color: UtilityColorOptions,
	shade?: ColorShadeOptions
): string => {
	return getUtilityColorObject(color)[shade ?? 'main'];
};
