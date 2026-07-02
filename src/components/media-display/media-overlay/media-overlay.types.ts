import { ScrimScaleOptions } from '@/types';
import { ReactNode } from 'react';

export type MediaOverlayProps = {
	children: ReactNode;
	overlay: ReactNode;
	/** Scrim Background Opacity @default `medium` */
	scrimLevel?: 'none' | ScrimScaleOptions;
};
