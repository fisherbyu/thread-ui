'use client';
import { css } from '@/styled-system/css';
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
		paddingLeft: 'var(--thread-gallery-item-track-spacing)',
	}),
};

export const TrackItem = ({ itemId }: TrackItemProps) => {
	const {
		value: { items },
	} = useGalleryContext();
	const { onTrackItemClick } = useGalleryEmblaContext();

	const item = items[itemId];

	return (
		<button className={styles.container} onClick={() => onTrackItemClick(itemId)}>
			{item.content}
		</button>
	);
};
