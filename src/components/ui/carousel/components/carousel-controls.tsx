'use client';
import { css } from '@/styled-system/css';
import { IconButton } from '../../icon-button';
import { useCarouselContext } from '../carousel-context';
import useEmblaCarousel from 'embla-carousel-react';

const styles = {
	container: css({
		display: 'flex',
		flexDirection: 'row',
		alignItems: 'center',
		gap: '1',
	}),
};

export const CarouselControls = () => {
	const {
		value: {
			emblaControls: [, emblaApi],
		},
	} = useCarouselContext();

	const goToPrev = () => emblaApi?.scrollPrev();
	const goToNext = () => emblaApi?.scrollNext();

	const leftButton = <IconButton color="neutral" name="CaretLeft" size="sm" onClick={goToPrev} />;
	const rightButton = (
		<IconButton color="neutral" name="CaretRight" size="sm" onClick={goToNext} />
	);

	return (
		<div className={styles.container}>
			{leftButton}
			{rightButton}
		</div>
	);
};
