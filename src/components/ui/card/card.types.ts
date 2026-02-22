import { ReactNode } from 'react';
import { SurfaceColorOptions, UtilitySizeOptions } from '@/types';

export type CardProps = {
	children: ReactNode;
	/** Size variant controlling border radius and max width @default `'md'` */
	size?: UtilitySizeOptions;
	/** Renders a subtle drop shadow @default `true` */
	shadow?: boolean;
	/** Background color token @default `'background'` */
	surfaceColor?: SurfaceColorOptions;
	/** Optional title rendered above the card content */
	title?: {
		/** Title text */
		text: string;
		/** Renders a divider below the title */
		divider?: boolean;
		/** Title alignment @default `'left'` */
		align?: 'left' | 'center';
	};
};
