'use client';
import { ReactNode } from 'react';
import { css, cva } from '@/styled-system/css';
import { H2 } from '@/components/typography';
import { useGalleryContext } from '../gallery-context';
import {
	DisplayConstantsKeys,
	GALLERY_DISPLAY_CONSTANT_NAMES,
	GALLERY_DISPLAY_CONSTANTS,
} from '../gallery-display-constants';

const styles = {
	container: cva({
		base: {
			display: 'flex',
			flexDirection: 'column',
			width: '100%',
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
	internalContent: css({
		display: 'flex',
		flexDirection: 'column',
		width: '100%',
		flex: '1',
		gap: '2',
		backgroundColor: 'primary.dark',
	}),
	displayContent: css({
		width: '100%',
		flex: '1',
		backgroundColor: 'primary.light',
	}),
	trackContent: cva({
		base: {
			width: '100%',
		},
		variants: {
			size: {
				sm: {
					height: '60px',
				},
				md: {
					height: '75px',
				},
				lg: {
					height: '100px',
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

	const cssVariables: Record<string, string> = Object.fromEntries(
		(Object.entries(GALLERY_DISPLAY_CONSTANT_NAMES) as [DisplayConstantsKeys, string][]).map(
			([key, cssVar]) => [cssVar, GALLERY_DISPLAY_CONSTANTS[key]]
		)
	);

	return (
		<div className={styles.container({ size })} style={cssVariables}>
			{title && titleDisplay}
			<div className={styles.internalContent}>
				<div className={styles.displayContent}></div>
				<div className={styles.trackContent({ size })}></div>
			</div>
		</div>
	);
};
