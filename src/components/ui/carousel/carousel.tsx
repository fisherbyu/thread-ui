'use client';
import { CarouselProvider } from './carousel-context';
import { CarouselProps, CarouselState } from './carousel.types';
import { CarouselContent } from './components/carousel-content';

export const Carousel = ({
	title,
	items: itemList,
	controlsPosition = 'around',
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

	const activeItemId = normalizedItems[0].id;

	const initialState = {
		title,
		items,
		itemOrder,
		activeItemId,
		controlsPosition,
	};

	return (
		<CarouselProvider initialValue={initialState}>
			<CarouselContent />
		</CarouselProvider>
	);
};
