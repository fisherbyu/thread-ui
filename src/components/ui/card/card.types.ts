import { ReactNode } from 'react';
import {
	SurfaceLayerOptions,
	BgColorOptions,
	ShadowOptions,
	StructureColorOptions,
	UtilitySizeOptions,
} from '@/types';

export type CardProps = {
	children: ReactNode;
	/** Layer shorthand — resolves bg, shadow, and structure from SurfaceLayerMap @default `'surface'` */
	layer?: SurfaceLayerOptions;
	/** Override background color @default resolved from layer: `'surface'` */
	bg?: BgColorOptions;
	/** Override shadow @default resolved from layer: `'sm'` */
	shadow?: ShadowOptions;
	/** Override border structure color @default resolved from layer: `'subtle'` */
	structure?: StructureColorOptions | 'none';
	/** Size variant controlling border radius and max width @default `'md'` */
	size?: UtilitySizeOptions;
	/** Allow card to fill available width @default false */
	fullWidth?: boolean;
	/** Remove inner padding so content sits flush against the card edges @default false */
	flush?: boolean;
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
