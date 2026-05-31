'use client';
import { css } from '@/styled-system/css';
import { IconButton } from '../../icon-button';
import { useCarouselEmblaContext } from '../carousel-context';

const styles = {
	container: css({
		display: 'flex',
		flexDirection: 'row',
		alignItems: 'center',
		gap: '1',
	}),
};

export const CarouselControls = () => {
	const { emblaApi, canScrollPrev, canScrollNext } = useCarouselEmblaContext();

	const goToPrev = () => emblaApi?.scrollPrev();
	const goToNext = () => emblaApi?.scrollNext();

	const leftButton = (
		<IconButton
			color="neutral"
			name="CaretLeft"
			size="sm"
			onClick={goToPrev}
			disabled={!canScrollPrev}
		/>
	);

	const rightButton = (
		<IconButton
			color="neutral"
			name="CaretRight"
			size="sm"
			onClick={goToNext}
			disabled={!canScrollNext}
		/>
	);

	return (
		<div className={styles.container}>
			{leftButton}
			{rightButton}
		</div>
	);
};
