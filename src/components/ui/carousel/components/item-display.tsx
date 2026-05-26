'use client';
import { useCarouselContext } from '../carousel-context';
import { CarouselItemId } from '../carousel.types';

type ItemDisplayProps = {
	itemId: CarouselItemId;
};

export const ItemDisplay = ({ itemId }: ItemDisplayProps) => {
	const {
		value: { items },
	} = useCarouselContext();

	return <>{items[itemId].title}</>;
};
