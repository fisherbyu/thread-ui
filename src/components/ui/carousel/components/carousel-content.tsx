'use client';
import { Container } from '@/components/layouts';
import { useCarouselContext } from '../carousel-context';
import { ItemDisplay } from './item-display';
import { css } from '@/styled-system/css';
import { CarouselHeader } from './carousel-header';
import { CarouselControls } from './carousel-controls';
import { CarouselItem } from './carousel-item';
import { ColumnSkeleton } from '@/components/layouts/column-layout/column-skeleton';

const styles = {
	content: css({
		width: '100%',
		display: 'flex',
		flexDirection: 'column',
	}),
	belowControls: css({
		width: '50px',
		marginX: 'auto',
	}),
	viewport: css({ width: '100%', overflow: 'hidden' }),
	track: css({
		display: 'flex',
		flexDirection: 'row',
		translateX: '',
	}),
};

export const CarouselContent = () => {
	const {
		value: { itemOrder, controlsPosition },
	} = useCarouselContext();

	return (
		<Container>
			<CarouselHeader />
			<ColumnSkeleton mdcol={3} lgcol={3}>
				{itemOrder.map((itemId) => (
					<CarouselItem itemId={itemId} />
				))}
			</ColumnSkeleton>
		</Container>
	);
};
