'use client';

import { UtilitySizes } from '../../types';

export const getUtilitySizeValue = (size: UtilitySizes): 12 | 24 | 64 => {
	switch (size) {
		case 'sm':
			return 12;
		case 'md':
			return 24;
		case 'lg':
			return 64;
		default:
			return 24;
	}
};
