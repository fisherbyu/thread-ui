'use client';
import { css, cva } from '@/styled-system/css';
import { ReactNode } from 'react';
import { useGalleryContext } from '../gallery-context';
import { H2 } from '@/components/typography';

const styles = {
	container: css({
		width: '100%',
	}),
	internalContent: cva({
		base: {
			display: 'flex',
			flexDirection: 'column',
			width: '100%',
			backgroundColor: 'primary.dark',
		},
		variants: {
			size: {
				sm: {
					height: '300px',
				},
				md: {
					height: '500px',
				},
				lg: {
					height: '700px',
				},
			},
		},
	}),
	displayContent: css({
		width: '100%',
		flex: '1',
		backgroundColor: 'primary.light',
	}),
	trackContent: cva({
		base: {
			width: '100%',
			maxHeight: '60px',
			flex: '0 0 25%',
		},
		variants: {
			size: {
				sm: {
					height: '50px',
				},
				md: {
					height: '60px',
				},
				lg: {
					height: '70px',
				},
			},
		},
	}),
};

export const GalleryContent = () => {
	const {
		value: { size, title },
	} = useGalleryContext();

	const titleDisplay: ReactNode = typeof title === 'string' ? <H2 inline>{title}</H2> : title;

	return (
		<div className={styles.container}>
			{title && titleDisplay}
			<div className={styles.internalContent({ size })}>
				<div className={styles.displayContent}></div>
				<div className={styles.trackContent({ size })}></div>
			</div>
		</div>
	);
};
