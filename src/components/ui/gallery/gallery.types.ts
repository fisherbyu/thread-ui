import { ReactNode, ComponentType } from 'react';
import { Prettify } from '@/types';
import { EmblaViewportRefType } from 'embla-carousel-react';
import { EmblaCarouselType } from 'embla-carousel';

export type GalleryItemId = number;

export type GalleryItem = ReactNode;

export type GalleryProps = {
	title?: string;
	items: GalleryItem[];
	itemWrapper?: ComponentType<any>;
};

type InternalGalleryItem = {
	id: GalleryItemId;
	content: GalleryItem;
};

export type GalleryState = Prettify<
	Pick<GalleryProps, 'title'> & {
		items: Record<GalleryItemId, InternalGalleryItem>;
		ItemWrapper: GalleryProps['itemWrapper'];
		itemOrder: GalleryItemId[];
	}
>;

export type GalleryEmblaContext = {
	emblaRef: EmblaViewportRefType;
	emblaApi: EmblaCarouselType | undefined;
	selectedIndex: number;
};
