'use client';
import { css } from '@/styled-system/css';
import { useGalleryContext } from '../../gallery-context';
import { GalleryItemId } from '../../gallery.types';
import { Card } from '@/components/ui/card';

type GalleryItemProps = {
	itemId: GalleryItemId;
};

const styles = {
	wrapper: css({
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
		<div className={styles.wrapper}>
			<ItemWrapper>{item.content}</ItemWrapper>
		</div>;
	}

	return (
		<div className={styles.wrapper}>
			<Card layer="elevated" fullWidth size="lg">
				{item.content}
			</Card>
		</div>
	);
};
