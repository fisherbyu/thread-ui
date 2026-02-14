import { IconSizes } from '@/components';
import { UtilitySizeOptions } from '@/types';

export const getUtilityIconSize = (size: UtilitySizeOptions): IconSizes => {
	switch (size) {
		case 'sm':
			return 16;
		case 'md':
			return 24;
		case 'lg':
			return 32;
		default:
			return 24;
	}
};
