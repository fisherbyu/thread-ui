import { UtilityColorOptions } from '../../types/colors/utility-color-options.types';
import { useTheme } from '../theme/use-theme';

export const getUtilityColorValue = (color: UtilityColorOptions): string => {
	const theme = useTheme();
	switch (color) {
		case 'primary':
			return theme.colors.primary.main;
		case 'secondary':
			return theme.colors.secondary.main;
		case 'tertiary':
			return theme.colors.tertiary.main;
		case 'black':
			return theme.colors.black;
		case 'grey':
			return theme.colors.gray.main;
		case 'success':
			return theme.colors.success.main;
		case 'error':
			return theme.colors.error.main;
		case 'info':
			return theme.colors.info.main;
		default:
			return theme.colors.primary.main;
	}
};
