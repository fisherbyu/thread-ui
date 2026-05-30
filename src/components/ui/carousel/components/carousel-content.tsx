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
			<div className={styles.content}>
				<CarouselHeader />
				<div className={styles.viewport}>
					<div className={styles.track}>
						{itemOrder.map((itemId) => (
							<CarouselItem itemId={itemId} />
						))}
					</div>
				</div>
			</div>
			{controlsPosition === 'below' && (
				<div className={styles.belowControls}>
					<CarouselControls />
				</div>
			)}
		</Container>
	);
};
