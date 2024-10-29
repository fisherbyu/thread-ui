import { BorderSizes } from './borders.types';

export type ThemeBorders = {
	style: 'solid' | 'dashed' | 'none';
	size: BorderSizes;
	radius: BorderSizes;
};
