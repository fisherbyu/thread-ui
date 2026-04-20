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
	/** Surface level shorthand — resolves surface, shadow, and structure from SurfaceLevelMap @default `'surface'` */
	level?: SurfaceLayerOptions;
	/** Override surface background @default resolved from level: `'surface'` */
	surface?: SurfaceColorOptions;
	/** Override shadow @default resolved from level: `'sm'` */
	shadow?: ShadowOptions;
	/** Override border structure color @default resolved from level: `'subtle'` */
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
