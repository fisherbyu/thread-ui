'use client';

import { ReactNode } from 'react';
import { useCarouselContext } from '../carousel-context';
import { H2 } from '@/components/typography';
import { css } from '@/styled-system/css';

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
		value: { itemOrder, title },
	} = useCarouselContext();

	const titleDisplay: ReactNode = typeof title === 'string' ? <H2>{title}</H2> : title;

	return <div className={styles.titleBlock}>{title && titleDisplay}</div>;
};
