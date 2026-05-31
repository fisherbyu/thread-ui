'use client';
import { css, cva } from '@/styled-system/css';
import { Card } from '../../card';
import { useCarouselContext } from '../carousel-context';
import { CarouselItemId } from '../carousel.types';

type CarouselItemProps = {
	itemId: CarouselItemId;
};

const styles = {
	wrapper: cva({
		base: {
			flexGrow: 0,
			flexShrink: 0,
			minWidth: '0',
		},
		variants: {
			mdCols: {
				1: { flexBasis: { base: '100%', md: 'calc(100% - 4px)' } },
				2: { flexBasis: { base: '100%', md: 'calc(50% - 4px)' } },
				3: { flexBasis: { base: '100%', md: 'calc(33.333% - 4px)' } },
			},
			lgCols: {
				1: { flexBasis: { lg: 'calc(100% - 8px)' } },
				2: { flexBasis: { lg: 'calc(50% - 8px)' } },
				3: { flexBasis: { lg: 'calc(33.333% - 8px)' } },
				4: { flexBasis: { lg: 'calc(25% - 8px)' } },
				5: { flexBasis: { lg: 'calc(20% - 8px)' } },
				6: { flexBasis: { lg: 'calc(16.666% - 8px)' } },
			},
		},
		defaultVariants: {
			mdCols: 3,
			lgCols: 3,
		},
	}),
};

export const CarouselItem = ({ itemId }: CarouselItemProps) => {
	const {
		value: { items, ItemWrapper, mdCols, lgCols },
	} = useCarouselContext();

	const item = items[itemId];

	if (ItemWrapper) {
		return (
			<div className={styles.wrapper({ mdCols, lgCols })}>
				<ItemWrapper>{item.content}</ItemWrapper>
			</div>
		);
	}

	return (
		<div className={styles.wrapper({ mdCols, lgCols })}>
			<Card fullWidth title={{ text: item.title }} size="md">
				{item.content}
			</Card>
		</div>
	);
};
