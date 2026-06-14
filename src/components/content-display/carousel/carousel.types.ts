import { ComponentType, ReactNode } from 'react';
import { Prettify } from '@/types';
import { EmblaViewportRefType } from 'embla-carousel-react';
import { EmblaCarouselType } from 'embla-carousel';
import { LargeColumnOptions, MediumColumnOptions } from '@/components';

export type CarouselControlsPosition = 'above' | 'around' | 'below' | 'none';

/** A single pane consumed and displayed by the `Carousel` component */
export type CarouselItem = {
	/** Optional title rendered with content */
	title?: string;
	/** Content rendered in the carousel */
	content: ReactNode;
};

export type CarouselItemId = string;

type InternalCarouselItem = Prettify<CarouselItem & { id: CarouselItemId }>;

type ItemWrapperComponent = ComponentType<any>;

export type ItemWrapperOptions = 'none' | 'card' | 'cardFrame' | ItemWrapperComponent;

export type CarouselProps = Prettify<{
	/** Optional Title */
	title?: string | ReactNode;
	/** Items to render, in display order */
	items: CarouselItem[];
	/** Location to Render Controls @default 'around' */
	controlsPosition?: CarouselControlsPosition;
	/** Optional Carousel Item Wrapper @default `cardOutline` */
	itemWrapper?: ItemWrapperOptions;
	/** Number of Columns in Medium Viewport */
	mdCols: MediumColumnOptions;
	/** Number of Columns in Large Viewport */
	lgCols?: LargeColumnOptions;
}>;

export type CarouselState = Prettify<
	Pick<CarouselProps, 'title' | 'mdCols'> &
		Required<Pick<CarouselProps, 'lgCols'>> & {
			items: Record<CarouselItemId, InternalCarouselItem>;
			itemOrder: CarouselItemId[];
			controlsPosition: CarouselControlsPosition;
			ItemWrapper: ItemWrapperComponent;
		}
>;

/** Live embla values, bridged out of embla's mutable api via its event loop.
 *  Separate from CarouselState because these change externally, not via dispatch. */
export type CarouselEmblaContext = {
	emblaRef: EmblaViewportRefType;
	emblaApi: EmblaCarouselType | undefined;
	selectedIndex: number;
	canScrollPrev: boolean;
	canScrollNext: boolean;
};
