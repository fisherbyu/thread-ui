'use client';

import { ReactNode } from 'react';
import { useCarouselContext } from '../carousel-context';
import { H2 } from '@/components/typography';
import { css } from '@/styled-system/css';
import { CarouselControls } from './carousel-controls';

const styles = {
	titleBlock: css({
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		marginBottom: '4',
	}),
	controlsWrapper: css({
		marginLeft: 'auto',
	}),
};

export const CarouselHeader = () => {
	const {
		value: { controlsPosition, title },
	} = useCarouselContext();

	if (!title && controlsPosition !== 'above') {
		return null;
	}

	const titleDisplay: ReactNode = typeof title === 'string' ? <H2 inline>{title}</H2> : title;

	return (
		<div className={styles.titleBlock}>
			{title && titleDisplay}
			{controlsPosition === 'above' && (
				<div className={styles.controlsWrapper}>
					<CarouselControls />
				</div>
			)}
		</div>
	);
};
