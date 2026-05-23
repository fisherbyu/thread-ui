import { css, cva } from '@/styled-system/css';
import { useTabViewContext } from '../tab-view-context';

const styles = {
	container: css({
		width: '100%',
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'start',
		gap: 0.5,
		alignItems: 'center',
	}),
	item: cva({
		base: {
			height: '4',
			borderRadius: 'sm',
			_hover: {
				backgroundColor: 'hover',
			},
		},
		variants: {
			active: {
				true: {
					backgroundColor: 'active',
				},
				false: {},
			},
		},
	}),
};

export const TabDisplay = () => {
	const { activeItemId, items, itemOrder } = useTabViewContext();

	return (
		<div className={styles.container}>
			{itemOrder.map((itemId) => (
				<div key={itemId} className={styles.item({ active: activeItemId === itemId })}>
					{items[itemId].title}
				</div>
			))}
		</div>
	);
};
