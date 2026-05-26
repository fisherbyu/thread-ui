import { Prettify } from '@/types';
import { ReactNode } from 'react';

export type CarouselControlsPosition = 'above' | 'around' | 'below';

/** A single pane consumed and displayed by the `Carousel` component */
export type CarouselItem = {
	/** Optional title rendered with content */
	title: string;
	/** Content rendered in the carousel */
	content: ReactNode;
};

export type CarouselItemId = string;

type InternalCarouselItem = Prettify<CarouselItem & { id: CarouselItemId }>;

export type CarouselProps = Prettify<{
	/** Optional Title */
	title?: string | ReactNode;
	/** Items to render, in display order */
	items: InternalCarouselItem[];
	/** Location to Render Controls @default 'around' */
	controlsPosition?: CarouselControlsPosition;
}>;

export type CarouselState = Prettify<
	Pick<CarouselProps, 'title' | 'controlsPosition'> & {
		items: Record<CarouselItemId, InternalCarouselItem>;
		itemOrder: CarouselItemId[];
		activeItemId: CarouselItemId;
	}
>;
