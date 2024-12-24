import { UtilityColorOptions } from '../../types/colors/utility-color-options.types';
import { useTheme } from '../theme/use-theme';

export const getUtilityColorValue = (color: UtilityColorOptions): string => {
	const theme = useTheme();
	switch (color) {
		case 'primary':
			return theme.colors.primary.medium;
		case 'secondary':
			return theme.colors.secondary.medium;
		case 'tertiary':
			return theme.colors.tertiary.medium;
		case 'black':
			return theme.colors.black;
		case 'grey':
			return theme.colors.gray.medium;
		case 'success':
			return theme.colors.success.medium;
		case 'error':
			return theme.colors.error.medium;
		case 'info':
			return theme.colors.info.medium;
		default:
			return theme.colors.primary.medium;
	}
};
