'use client';
import { css, cva } from '@/styled-system/css';
import { useGalleryContext, useGalleryEmblaContext } from '../../gallery-context';
import { GalleryItemId } from '../../gallery.types';

type TrackItemProps = {
	itemId: GalleryItemId;
};

const styles = {
	container: css({
		cursor: 'pointer',
		flex: ' 0 0 22%',
		minWidth: '0',
		paddingLeft: 'var(--thread-gallery-item-track-spacing)', // Tracks with GALLERY_DISPLAY_CONSTANT_NAMES
		borderColor: 'transparent',
		borderWidth: 'lg',
		borderStyle: 'solid',
	}),
	internalContent: cva({
		base: {
			borderRadius: 'sm',
			display: 'flex',
			alignItems: 'center',
			justifyContent: 'center',
			height: 'var(--thread-gallery-track-item-height)', // Tracks with GALLERY_DISPLAY_CONSTANT_NAMES
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
		value: { items, appearance },
	} = useGalleryContext();
	const { onTrackItemClick } = useGalleryEmblaContext();

	const item = items[itemId];

	return (
		<button className={styles.container} onClick={() => onTrackItemClick(itemId)}>
			<div className={styles.internalContent({ appearance })}>{item.content}</div>
		</button>
	);
};
