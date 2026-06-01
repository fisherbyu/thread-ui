'use client';
import { css } from '@/styled-system/css';
import { useGalleryContext, useGalleryEmblaContext } from '../../gallery-context';
import { GalleryItemId } from '../../gallery.types';

type TrackItemProps = {
	itemId: GalleryItemId;
};

const styles = {
	container: css({
		borderWidth: 'md',
		borderColor: 'transparent',
		cursor: 'pointer',
	}),
};

export const TrackItem = ({ itemId }: TrackItemProps) => {
	const {
		value: { items },
	} = useGalleryContext();
	const { onTrackItemClick } = useGalleryEmblaContext();

	const item = items[itemId];

	return <button onClick={() => onTrackItemClick(itemId)}>{item.content}</button>;
};
