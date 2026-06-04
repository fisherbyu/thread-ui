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
import { GalleryItemsDisplay } from './item-display/gallery-items-display';
import { ItemTrack } from './item-track/item-track';

const styles = {
	container: cva({
		base: {
			display: 'flex',
			flexDirection: 'column',
			width: '100%',
		},
		variants: {
			size: {
				sm: { height: '300px' },
				md: { height: '500px' },
				lg: { height: '700px' },
				fill: { height: '100%' },
			},
		},
	}),
	internalContent: css({
		display: 'flex',
		flexDirection: 'column',
		width: '100%',
		flex: '1',
		gap: '3',
		minHeight: 0,
	}),
	displayContent: css({
		width: '100%',
		flex: '1',
		minHeight: 0,
		overflow: 'hidden',
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

	const titleDisplay: ReactNode = typeof title === 'string' ? <H2>{title}</H2> : title;

	const cssVariables: Record<string, string> = Object.fromEntries(
		(Object.entries(GALLERY_DISPLAY_CONSTANT_NAMES) as [DisplayConstantsKeys, string][]).map(
			([key, cssVar]) => [cssVar, GALLERY_DISPLAY_CONSTANTS[key]]
		)
	);

	return (
		<div className={styles.container({ size })} style={cssVariables}>
			{title && titleDisplay}
			<div className={styles.internalContent}>
				<div className={styles.displayContent}>
					<GalleryItemsDisplay />
				</div>
				<div className={styles.trackContent({ size: size === 'fill' ? 'lg' : size })}>
					<ItemTrack />
				</div>
			</div>
		</div>
	);
};
