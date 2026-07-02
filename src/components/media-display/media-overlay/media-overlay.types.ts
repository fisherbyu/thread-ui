import { ScrimScaleOptions } from '@/types';
import { ReactNode } from 'react';

export type OverlayPlacementOptions = 'full' | 'top' | 'bottom' | 'left' | 'right';

export type MediaOverlayProps = {
	/** The media (or any content) rendered underneath the overlay. */
	children: ReactNode;
	/** The content rendered in the overlay layer on top of the media. */
	overlay: ReactNode;
	/** Scrim Background Opacity @default `medium` */
	scrimLevel?: 'none' | ScrimScaleOptions;
	/** Scrim Overlay Position @default `full` */
	placement?: OverlayPlacementOptions;
	/** Caps overlay height. Any CSS length. @default `100%` */
	maxHeight?: string;
	/** Caps overlay width. Any CSS length. @default `100%` */
	maxWidth?: string;
};
