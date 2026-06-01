'use client';
import { css } from '@/styled-system/css';
import { Container } from '@/components/layouts';
import { useCarouselContext } from '../carousel-context';
import { CarouselHeader } from './carousel-header';
import { CarouselControls, NextButton, PreviousButton } from './carousel-controls';
import { CarouselItemsDisplay } from './carousel-items-display';

const styles = {
	belowControls: css({
		width: '50px',
		marginX: 'auto',
		marginTop: '3',
	}),
	aroundWrapper: css({
		display: 'flex',
		flexDirection: 'row',
		gap: '1',
	}),
	buttonWrapper: css({
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
	}),
};

export const CarouselContent = () => {
	const {
		value: { controlsPosition },
	} = useCarouselContext();

	if (controlsPosition === 'around') {
		return (
			<Container>
				<CarouselHeader />
				<div className={styles.aroundWrapper}>
					<div className={styles.buttonWrapper}>
						<PreviousButton />
					</div>
					<CarouselItemsDisplay />
					<div className={styles.buttonWrapper}>
						<NextButton />
					</div>
				</div>
			</Container>
		);
	}

	return (
		<Container>
			<CarouselHeader />
			<CarouselItemsDisplay />
			{controlsPosition === 'below' && (
				<div className={styles.belowControls}>
					<CarouselControls />
				</div>
			)}
		</Container>
	);
};
