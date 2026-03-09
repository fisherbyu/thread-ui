import { IconSizes } from '@/components';
import { UtilitySizeOptions } from '@/types';

export const getUtilityIconSize = (size: UtilitySizeOptions): IconSizes => {
	switch (size) {
		case 'sm':
			return 8;
		case 'md':
			return 16;
		case 'lg':
			return 24;
		default:
			return 16;
	}
};
