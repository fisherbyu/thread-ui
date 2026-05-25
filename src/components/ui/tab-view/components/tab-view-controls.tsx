import { cva } from '@/styled-system/css';
import { Divider, Icon } from '@/components';
import { useTabViewContext } from '../tab-view-context';

const styles = {
	container: cva({
		base: {
			width: '100%',
			display: 'flex',
			flexDirection: 'row',
			justifyContent: 'start',
			gap: '2',
			alignItems: 'center',
			overflowX: 'auto',
			scrollbarWidth: 'none',
			'&::-webkit-scrollbar': { display: 'none' },
		},
		variants: {
			showDivider: {
				true: {},
				false: { marginBottom: '4' },
			},
		},
	}),
	item: cva({
		base: {
			display: 'flex',
			flexDirection: 'row',
			alignItems: 'center',
			gap: '1',
			padding: '2',
			borderWidth: 'md',
			borderColor: 'transparent',
			cursor: 'pointer',
			fontWeight: 'semibold',
			fontSize: 'md',
			whiteSpace: 'nowrap',

			_hover: {
				borderBottomColor: 'structure.subtle',
			},
		},
		variants: {
			isActive: {
				true: {
					color: 'text.standard',
					borderBottomColor: 'structure.default',
					_hover: {
						borderBottomColor: 'structure.strong',
					},
				},
				false: {
					color: 'text.secondary',
				},
			},
		},
	}),
};

export const TabViewControls = () => {
	const {
		value: { activeItemId, items, itemOrder, showDivider },
		setValue,
	} = useTabViewContext();

	return (
		<>
			<div className={styles.container({ showDivider })}>
				{itemOrder.map((itemId) => {
					const item = items[itemId];
					const isActive = activeItemId === itemId;

					return (
						<button
							key={itemId}
							className={styles.item({ isActive })}
							onClick={() => setValue((prev) => ({ ...prev, activeItemId: itemId }))}
						>
							{item.icon && <Icon name={item.icon} size={16} />}
							{item.title}
						</button>
					);
				})}
			</div>
			{showDivider && <Divider marginY="16px" width="100%" />}
		</>
	);
};
