'use client';
import { Card } from '../card';
import { CarouselProvider } from './carousel-context';
import { CarouselProps, CarouselState } from './carousel.types';
import { CarouselContent } from './components/carousel-content';

export const Carousel = ({
	title,
	items: itemList,
	controlsPosition = 'around',
	mdCols,
	lgCol,
}: CarouselProps) => {
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
		current: 0,
		controlsPosition,
		mdCols,
		lgCol: lgCol ? lgCol : mdCols,
	};

	return (
		<CarouselProvider initialValue={initialState}>
			<CarouselContent />
		</CarouselProvider>
	);
};
