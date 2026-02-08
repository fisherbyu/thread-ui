import { SurfaceColorOptions, UtilitySizeOptions } from '@/types';
import { ReactNode } from 'react';

export type CardProps = {
	children: ReactNode;
	size: UtilitySizeOptions;
	surfaceColor?: SurfaceColorOptions;
	title?: string;
};
