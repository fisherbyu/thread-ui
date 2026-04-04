import { ReactNode } from 'react';
import {
	SurfaceLayerOptions,
	SurfaceColorOptions,
	ShadowOptions,
	StructureColorOptions,
	UtilitySizeOptions,
} from '@/types';

export type CardProps = {
	children: ReactNode;
	/** Surface level shorthand @default `'surface'` */
	level?: SurfaceLayerOptions;
	/** Override surface background */
	surface?: SurfaceColorOptions;
	/** Override shadow */
	shadow?: ShadowOptions;
	/** Override border structure color */
	structure?: StructureColorOptions | 'none';
	/** Size variant controlling border radius and max width @default `'md'` */
	size?: UtilitySizeOptions;
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
