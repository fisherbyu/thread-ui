'use client';
import useEmblaCarousel from 'embla-carousel-react';
import { Card } from '../card';
import { CarouselProvider } from './carousel-context';
import { CarouselProps, CarouselState } from './carousel.types';
import { CarouselContent } from './components/carousel-content';

export const Carousel = ({
	title,
	items: itemList,
	controlsPosition = 'around',
	mdCols,
	lgCols,
}: CarouselProps) => {
	const emblaControls = useEmblaCarousel();

	if (!itemList.length) return null;

	const normalizedItems = itemList.map((item, index) => ({
		...item,
		id: String(index),
	}));

	const items = Object.fromEntries(
		normalizedItems.map((item) => [item.id, item])
	) as CarouselState['items'];

	const itemOrder = normalizedItems.map((item) => item.id);

	const initialState: CarouselState = {
		title,
		items,
		itemOrder,
		ItemWrapper: Card,
		current: mdCols,
		controlsPosition,
		mdCols,
		lgCols: lgCols ? lgCols : mdCols,
		emblaControls,
	};

	return (
		<CarouselProvider initialValue={initialState}>
			<CarouselContent />
		</CarouselProvider>
	);
};
