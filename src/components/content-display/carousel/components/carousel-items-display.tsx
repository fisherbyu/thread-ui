'use client';

import { css } from '@/styled-system/css';
import { useCarouselContext, useCarouselEmblaContext } from '../carousel-context';
import { CarouselItem } from './carousel-item';

const styles = {
	viewport: css({ width: '100%', overflow: 'hidden' }),
	track: css({
		display: 'flex',
		marginLeft: { base: '-3', md: '-4' },
		touchAction: 'pan-y pinch-zoom',
	}),
};

export const CarouselItemsDisplay = () => {
	const {
		value: { itemOrder },
	} = useCarouselContext();

	const { emblaRef } = useCarouselEmblaContext();

	return (
		<div ref={emblaRef} className={styles.viewport}>
			<div className={styles.track}>
				{itemOrder.map((itemId) => (
					<CarouselItem key={itemId} itemId={itemId} />
				))}
			</div>
		</div>
	);
};
