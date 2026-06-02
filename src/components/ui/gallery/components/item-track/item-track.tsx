'use client';
import { css } from '@/styled-system/css';
import { useGalleryContext, useGalleryEmblaContext } from '../../gallery-context';
import { TrackItem } from './track-item';

const styles = {
	viewport: css({
		overflow: 'hidden',
	}),
	window: css({
		display: 'flex',
		flexDirection: 'row',
		paddingLeft: 'calc(12px * -1)',
	}),
};

export const ItemTrack = () => {
	const {
		value: { itemOrder },
	} = useGalleryContext();

	const { emblaItemTrackRef } = useGalleryEmblaContext();

	return (
		<div ref={emblaItemTrackRef} className={styles.viewport}>
			<div className={styles.window}>
				{itemOrder.map((itemId) => (
					<TrackItem itemId={itemId} />
				))}
			</div>
		</div>
	);
};
