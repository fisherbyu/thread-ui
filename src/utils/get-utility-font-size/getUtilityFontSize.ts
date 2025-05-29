import { UtilitySizeOptions, UtilitySizes } from '@/types';

export const getUtilityFontSize = (size: UtilitySizeOptions) => {
	switch (size) {
		case 'sm':
			return '0.75rem';
		case 'md':
			return '1rem';
		case 'lg':
			return '1.25rem';
	}
};
