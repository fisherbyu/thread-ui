'use client';
import { css } from '@/styled-system/css';
import { useGalleryContext, useGalleryEmblaContext } from '../../gallery-context';
import { GalleryItem } from './gallery-item';

const styles = {
	viewport: css({
		width: '100%',
		overflow: 'hidden',
	}),
	window: css({}),
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
