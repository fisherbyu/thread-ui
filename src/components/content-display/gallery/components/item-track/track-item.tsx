'use client';
import { css, cva } from '@/styled-system/css';
import { useGalleryContext, useGalleryEmblaContext } from '../../gallery-context';
import { GalleryItemId } from '../../gallery.types';

type TrackItemProps = {
	itemId: GalleryItemId;
};

const styles = {
	container: cva({
		base: {
			cursor: 'pointer',
			flex: ' 0 0 auto',
			minWidth: '0',
			paddingLeft: 'var(--thread-gallery-item-track-spacing)', // Tracks with GALLERY_DISPLAY_CONSTANT_NAMES
			borderColor: 'transparent',
			borderWidth: 'lg',
			borderStyle: 'solid',
		},
		variants: {
			variableWidths: {
				true: { flex: ' 0 0 auto' },
				false: { flex: ' 0 0 22%' },
			},
		},
	}),
	internalContent: cva({
		base: {
			borderRadius: 'sm',
			display: 'flex',
			alignItems: 'center',
			justifyContent: 'center',
			height: 'var(--thread-gallery-track-item-height)',
			overflow: 'hidden',
			position: 'relative',
			'& img': {
				width: 'auto',
				height: '100%',
				objectFit: 'contain',
			},
		},
		variants: {
			appearance: {
				framed: {
					backgroundColor: 'surface',
					borderColor: 'structure.subtle',
					borderWidth: 'sm',
					borderStyle: 'solid',
				},
				bare: {},
			},
		},
		defaultVariants: {
			appearance: 'framed',
		},
	}),
};

export const TrackItem = ({ itemId }: TrackItemProps) => {
	const {
		value: { items, appearance, variableWidths },
	} = useGalleryContext();
	const { onTrackItemClick } = useGalleryEmblaContext();

	const item = items[itemId];

	return (
		<button
			className={styles.container({ variableWidths })}
			onClick={() => onTrackItemClick(itemId)}
		>
			<div className={styles.internalContent({ appearance })}>{item.content}</div>
		</button>
	);
};
