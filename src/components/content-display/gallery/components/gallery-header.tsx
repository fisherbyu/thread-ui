'use client';
import { ReactNode } from 'react';
import { css } from '@/styled-system/css';
import { useGalleryContext } from '../gallery-context';
import { H2 } from '@/components/typography';

const styles = {
	container: css({
		display: 'flex',
		width: '100%',
		flexDirection: 'row',
		justifyContent: 'space-between',
	}),
};

export const GalleryHeader = () => {
	const {
		value: { title },
	} = useGalleryContext();

	const titleDisplay: ReactNode = typeof title === 'string' ? <H2 inline>{title}</H2> : title;

	return <div className={styles.container}>{title && titleDisplay}</div>;
};
