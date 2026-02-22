import { UtilitySizeOptions } from '@/types';

export const getUtilitySizeValue = (size: UtilitySizeOptions) => {
	switch (size) {
		case 'sm':
			return 4;
		case 'md':
			return 8;
		case 'lg':
			return 12;
		default:
			return 8;
	}
};
