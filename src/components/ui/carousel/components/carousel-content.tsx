'use client';
import { Container } from '@/components/layouts';
import { useCarouselContext } from '../carousel-context';
import { ItemDisplay } from './item-display';

export const CarouselContent = () => {
	const {
		value: { itemOrder },
	} = useCarouselContext();
	return (
		<Container>
			{itemOrder.map((itemId) => (
				<ItemDisplay itemId={itemId} />
			))}
		</Container>
	);
};
