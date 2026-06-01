import { ReactNode, ComponentType } from 'react';
import { Prettify } from '@/types';
import { EmblaViewportRefType } from 'embla-carousel-react';
import { EmblaCarouselType } from 'embla-carousel';

export type GalleryItem = ReactNode;

export type GalleryProps = {
	title?: string;
	items: GalleryItem[];
	itemWrapper?: ComponentType<any>;
};

export type GalleryState = Prettify<
	Omit<GalleryProps, 'itemWrapper'> & {
		ItemWrapper: GalleryProps['itemWrapper'];
	}
>;

export type GalleryEmblaContext = {
	emblaRef: EmblaViewportRefType;
	emblaApi: EmblaCarouselType | undefined;
	selectedIndex: number;
	canScrollPrev: boolean;
	canScrollNext: boolean;
};
