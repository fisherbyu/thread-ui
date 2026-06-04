import { ReactNode, ComponentType } from 'react';
import { Prettify, UtilitySizeOptions } from '@/types';
import { EmblaViewportRefType } from 'embla-carousel-react';
import { EmblaCarouselType } from 'embla-carousel';

export type GalleryItemId = number;

export type GalleryItem = ReactNode;

export type GalleryProps = {
	title?: string;
	items: GalleryItem[];
	itemWrapper?: ComponentType<any>;
	size?: UtilitySizeOptions;
};

type InternalGalleryItem = {
	id: GalleryItemId;
	content: GalleryItem;
};

export type GalleryState = Prettify<
	Pick<GalleryProps, 'title'> &
		Required<Pick<GalleryProps, 'size'>> & {
			items: Record<GalleryItemId, InternalGalleryItem>;
			ItemWrapper: GalleryProps['itemWrapper'];
			itemOrder: GalleryItemId[];
		}
>;

export type GalleryEmblaContext = {
	emblaDisplayRef: EmblaViewportRefType;
	emblaDisplayApi: EmblaCarouselType | undefined;
	emblaItemTrackRef: EmblaViewportRefType;
	emblaItemTrackApi: EmblaCarouselType | undefined;
	onTrackItemClick: (index: number) => void;
	selectedIndex: number;
};
