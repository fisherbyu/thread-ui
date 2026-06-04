'use client';
import { css } from '@/styled-system/css';
import { IconButton } from '@/components/ui';
import { useCarouselEmblaContext } from '../carousel-context';

const styles = {
	container: css({
		display: 'flex',
		flexDirection: 'row',
		alignItems: 'center',
		gap: '1',
	}),
};

export const PreviousButton = () => {
	const { emblaApi, canScrollPrev } = useCarouselEmblaContext();

	const goToPrev = () => emblaApi?.scrollPrev();

	return (
		<IconButton
			color="neutral"
			name="CaretLeft"
			size="sm"
			onClick={goToPrev}
			disabled={!canScrollPrev}
		/>
	);
};

export const NextButton = () => {
	const { emblaApi, canScrollPrev, canScrollNext } = useCarouselEmblaContext();

	const goToNext = () => emblaApi?.scrollNext();

	return (
		<IconButton
			color="neutral"
			name="CaretRight"
			size="sm"
			onClick={goToNext}
			disabled={!canScrollNext}
		/>
	);
};

export const CarouselControls = () => {
	return (
		<div className={styles.container}>
			<PreviousButton />
			<NextButton />
		</div>
	);
};
