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
		flexBasis: '100%',
		minWidth: 0,
		paddingLeft: '2',
	}),
};

export const GalleryItem = ({ itemId }: GalleryItemProps) => {
	const {
		value: { items, ItemWrapper },
	} = useGalleryContext();

	const item = items[itemId];

	if (ItemWrapper) {
		<div className={styles.container}>
			<ItemWrapper>{item.content}</ItemWrapper>
		</div>;
	}

	return (
		<div className={styles.container}>
			<Card layer="elevated" fullWidth size="lg">
				{item.content}
			</Card>
		</div>
	);
};
