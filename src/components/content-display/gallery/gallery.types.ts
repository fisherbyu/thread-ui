import { ReactNode, ComponentType } from 'react';
import { Prettify, UtilitySizeOptions } from '@/types';
import { EmblaViewportRefType } from 'embla-carousel-react';
import { EmblaCarouselType } from 'embla-carousel';

export type GalleryItemId = number;

/** Content renderable as a gallery slide — any valid React node. */
export type GalleryItem = ReactNode;

/**
 * Controls the visual treatment of gallery item containers.
 * - `'framed'` — Adds background, border, and border-radius to each item.
 * - `'bare'` — Renders items without any decorative container styles.
 */
export type GalleryAppearanceOptions = 'framed' | 'bare';

export type GalleryProps = {
	/** Visual treatment for item containers @default `'framed'` */
	appearance?: GalleryAppearanceOptions;
	/** Optional title rendered above the gallery */
	title?: string | ReactNode;
	/** Array of React nodes to render as slides, in display order */
	items: GalleryItem[];
	/** Optional component used to wrap each item, replacing the default container */
	itemWrapper?: ComponentType<any>;
	/** Controls the gallery's dimensional presets @default `'lg'` */
	size?: UtilitySizeOptions | 'fill';
	/** Index of Item Gallery opens at Start @default 0 */
	startIndex?: number;
	/** Display thumbnail items with varying widths @default `false` */
	variableWidths?: boolean;
};

type InternalGalleryItem = {
	id: GalleryItemId;
	content: GalleryItem;
};

export type GalleryState = Prettify<
	Pick<GalleryProps, 'title'> &
		Required<Pick<GalleryProps, 'size' | 'appearance' | 'variableWidths'>> & {
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
