import { Prettify } from '@/types';
import { ReactNode } from 'react';

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
}>;

export type CarouselState = Prettify<
	Pick<CarouselProps, 'title'> & {
		items: Record<CarouselItemId, InternalCarouselItem>;
		itemOrder: CarouselItemId[];
		activeItemId: CarouselItemId;
	}
>;
