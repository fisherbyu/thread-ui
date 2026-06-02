'use client';
import { css } from '@/styled-system/css';
import { useGalleryContext, useGalleryEmblaContext } from '../../gallery-context';
import { GalleryItem } from './gallery-item';

const styles = {
	viewport: css({
		overflow: 'hidden',
	}),
	window: css({
		display: 'flex',
		touchAction: 'pan-y pinch-zoom',
		marginLeft: 'calc(var(--thread-gallery-display-item-spacing) * -1)', // Tracks with GALLERY_DISPLAY_CONSTANT_NAMES
	}),
};

export const GalleryItemsDisplay = () => {
	const {
		value: { itemOrder },
	} = useGalleryContext();
	const { emblaDisplayRef } = useGalleryEmblaContext();

	return (
		<div ref={emblaDisplayRef} className={styles.viewport}>
			<div className={styles.window}>
				{itemOrder.map((itemId) => (
					<GalleryItem itemId={itemId} />
				))}
			</div>
		</div>
	);
};
