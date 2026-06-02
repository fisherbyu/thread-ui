'use client';
import { css } from '@/styled-system/css';
import { useGalleryContext } from '../../gallery-context';
import { GalleryItemId } from '../../gallery.types';
import { Card } from '@/components/ui/card';

type GalleryItemProps = {
	itemId: GalleryItemId;
};

const styles = {
	container: css({
		transform: 'translate3d(0, 0, 0)',
		flexGrow: 0,
		flexShrink: 0,
		flexBasis: 'var(--thread-gallery-display-item-width)', // Tracks with GALLERY_DISPLAY_CONSTANT_NAMES
		minWidth: 0,
		paddingLeft: 'var(--thread-gallery-display-item-spacing)', // Tracks with GALLERY_DISPLAY_CONSTANT_NAMES
	}),
	content: css({
		width: '100%',
		height: 'var(--thread-gallery-display-item-height)', // Tracks with GALLERY_DISPLAY_CONSTANT_NAMES
		backgroundColor: 'elevated',
		borderColor: 'structure.default',
		borderRadius: 'lg',
		borderWidth: 'md',
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
		userSelect: 'none',
	}),
};

export const GalleryItem = ({ itemId }: GalleryItemProps) => {
	const {
		value: { items, ItemWrapper },
	} = useGalleryContext();

	const item = items[itemId];

	if (ItemWrapper) {
		return (
			<div className={styles.container}>
				<ItemWrapper>{item.content}</ItemWrapper>
			</div>
		);
	}

	return (
		<div className={styles.container}>
			<div className={styles.content}>{item.content}</div>
		</div>
	);
};
