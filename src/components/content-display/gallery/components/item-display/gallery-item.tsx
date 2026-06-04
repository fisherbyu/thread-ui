'use client';
import { css, cva } from '@/styled-system/css';
import { useGalleryContext } from '../../gallery-context';
import { GalleryItemId } from '../../gallery.types';

type GalleryItemProps = {
	itemId: GalleryItemId;
};

const styles = {
	container: css({
		borderColor: 'transparent',
		borderWidth: 'lg',
		borderStyle: 'solid',
		transform: 'translate3d(0, 0, 0)',
		flexGrow: 0,
		flexShrink: 0,
		flexBasis: 'var(--thread-gallery-display-item-width)', // Tracks with GALLERY_DISPLAY_CONSTANT_NAMES
		minWidth: 0,
		paddingLeft: 'var(--thread-gallery-display-item-spacing)', // Tracks with GALLERY_DISPLAY_CONSTANT_NAMES
	}),
	content: cva({
		base: {
			width: '100%',
			height: 'var(--thread-gallery-display-item-height)', // Tracks with GALLERY_DISPLAY_CONSTANT_NAMES
			display: 'flex',
			alignItems: 'center',
			justifyContent: 'center',
			userSelect: 'none',
			overflow: 'hidden',
			'& img': {
				maxWidth: '100%',
				maxHeight: '100%',
				width: 'auto',
				height: 'auto',
				objectFit: 'contain',
				borderRadius: 'lg',
			},
		},
		variants: {
			appearance: {
				framed: {
					backgroundColor: 'elevated',
					borderRadius: 'lg',
					borderWidth: 'md',
					borderColor: 'structure.subtle',
				},
				bare: {},
			},
		},
		defaultVariants: {
			appearance: 'framed',
		},
	}),
};

export const GalleryItem = ({ itemId }: GalleryItemProps) => {
	const {
		value: { items, ItemWrapper, appearance },
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
			<div className={styles.content({ appearance })}>{item.content}</div>
		</div>
	);
};
