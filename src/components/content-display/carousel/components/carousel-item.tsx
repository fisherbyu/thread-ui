'use client';
import { cva } from '@/styled-system/css';
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
			paddingLeft: { base: '3', md: '4' },
		},
		variants: {
			mdCols: {
				1: { flexBasis: { base: '100%', md: '100%' } },
				2: { flexBasis: { base: '100%', md: '50%' } },
				3: { flexBasis: { base: '100%', md: '33.333%' } },
			},
			lgCols: {
				1: { flexBasis: { lg: '100%' } },
				2: { flexBasis: { lg: '50%' } },
				3: { flexBasis: { lg: '33.333%' } },
				4: { flexBasis: { lg: '25%' } },
				5: { flexBasis: { lg: '20%' } },
				6: { flexBasis: { lg: '16.666%' } },
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

	return (
		<div className={styles.wrapper({ mdCols, lgCols })}>
			<ItemWrapper title={item.title}>{item.content}</ItemWrapper>
		</div>
	);
};
