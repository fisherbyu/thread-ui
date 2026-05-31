'use client';
import { css } from '@/styled-system/css';
import { Container } from '@/components/layouts';
import { useCarouselContext } from '../carousel-context';
import { useCarouselEmblaContext } from '../carousel-context';
import { CarouselHeader } from './carousel-header';
import { CarouselItem } from './carousel-item';

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
		gap: { sm: '1', md: '2' },
		touchAction: 'pan-y pinch-zoom',
	}),
};

export const CarouselContent = () => {
	const {
		value: { itemOrder },
	} = useCarouselContext();

	const { emblaRef } = useCarouselEmblaContext();

	return (
		<Container>
			<CarouselHeader />
			<div ref={emblaRef} className={styles.viewport}>
				<div className={styles.track}>
					{itemOrder.map((itemId) => (
						<CarouselItem key={itemId} itemId={itemId} />
					))}
				</div>
			</div>
		</Container>
	);
};
