import { ScrimScaleOptions } from '@/types';
import { ReactNode } from 'react';

export type OverlayPlacementOptions = 'full' | 'top' | 'bottom' | 'left' | 'right';

export type MediaOverlayProps = {
	children: ReactNode;
	overlay: ReactNode;
	/** Scrim Background Opacity @default `medium` */
	scrimLevel?: 'none' | ScrimScaleOptions;
	/** Scrim Overlay Position @default `full` */
	placement?: OverlayPlacementOptions;
	maxHeight?: string;
	maxWidth?: string;
};
