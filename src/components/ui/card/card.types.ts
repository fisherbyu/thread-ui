import { SurfaceColorOptions, UtilitySizeOptions } from '@/types';
import { ReactNode } from 'react';

export type CardProps = {
	children: ReactNode;
	size?: UtilitySizeOptions;
	shadow?: boolean;
	surfaceColor?: SurfaceColorOptions;
	title?: {
		text: string;
		divider?: boolean;
		align?: 'left' | 'center';
	};
};
