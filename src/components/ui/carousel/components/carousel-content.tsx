'use client';
import { Container } from '@/components/layouts';
import { useCarouselContext } from '../carousel-context';
import { ItemDisplay } from './item-display';
import { css } from '@/styled-system/css';
import { CarouselHeader } from './carousel-header';

const styles = {
	content: css({}),
};

export const CarouselContent = () => {
	const {
		value: { itemOrder },
	} = useCarouselContext();

	return (
		<Container>
			<CarouselHeader />
			{itemOrder.map((itemId) => (
				<ItemDisplay itemId={itemId} />
			))}
		</Container>
	);
};
