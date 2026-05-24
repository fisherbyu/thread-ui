import { css, cva } from '@/styled-system/css';
import { useTabViewContext } from '../tab-view-context';
import { Divider } from '../../divider';

const styles = {
	container: css({
		width: '100%',
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'start',
		gap: 1,
		alignItems: 'center',
		marginBottom: '3',
	}),
	item: cva({
		base: {
			borderRadius: 'sm',
			padding: '2',
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

export const TabViewControls = () => {
	const {
		value: { activeItemId, items, itemOrder },
		setValue,
	} = useTabViewContext();

	return (
		<>
			<div className={styles.container}>
				{itemOrder.map((itemId) => (
					<button
						key={itemId}
						className={styles.item({ active: activeItemId === itemId })}
						onClick={() => setValue((prev) => ({ ...prev, activeItemId: itemId }))}
					>
						{items[itemId].title}
					</button>
				))}
			</div>
			<Divider width="100%" />
		</>
	);
};
