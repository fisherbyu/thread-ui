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
		justifyContent: 'flex-start',
		alignItems: 'center',
	}),
};

export const CarouselHeader = () => {
	const {
		value: { controlsPosition, title },
	} = useCarouselContext();

	const titleDisplay: ReactNode = typeof title === 'string' ? <H2>{title}</H2> : title;

	return (
		<div className={styles.titleBlock}>
			{title && titleDisplay}
			{controlsPosition === 'above' && <CarouselControls />}
		</div>
	);
};
