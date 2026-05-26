'use client';
import { Container } from '@/components/layouts';
import { useCarouselContext } from '../carousel-context';
import { ItemDisplay } from './item-display';
import { css } from '@/styled-system/css';
import { CarouselHeader } from './carousel-header';
import { CarouselControls } from './carousel-controls';

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
};

export const CarouselContent = () => {
	const {
		value: { itemOrder, controlsPosition },
	} = useCarouselContext();

	return (
		<Container>
			<div className={styles.content}>
				<CarouselHeader />
				<div>
					{itemOrder.map((itemId) => (
						<ItemDisplay itemId={itemId} />
					))}
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
