'use client';
import { css } from '@/styled-system/css';
import { Card } from '../../card';
import { useCarouselContext } from '../carousel-context';
import { CarouselItemId } from '../carousel.types';

type CarouselItemProps = {
	itemId: CarouselItemId;
};

export const CarouselItem = ({ itemId }: CarouselItemProps) => {
	const {
		value: { items, ItemWrapper },
	} = useCarouselContext();

	const item = items[itemId];

	if (ItemWrapper) {
		return <ItemWrapper>{item.content}</ItemWrapper>;
	}

	return (
		<Card title={{ text: item.title }} size="md">
			{item.content}
		</Card>
	);
};
