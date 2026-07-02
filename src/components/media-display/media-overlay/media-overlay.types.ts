import { ScrimScaleOptions } from '@/types';
import { ReactNode } from 'react';

export type ImageOverlayProps = {
	children: ReactNode;
	overlay: ReactNode;
	/** Scrim Background Opacity @default `medium` */
	scrimLevel?: 'none' | ScrimScaleOptions;
};
