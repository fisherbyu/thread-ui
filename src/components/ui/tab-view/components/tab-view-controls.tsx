import { cva } from '@/styled-system/css';
import { Divider, Icon, Text } from '@/components';
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
			borderBottomWidth: 'md',
			borderBottomColor: 'transparent',
			cursor: 'pointer',
			fontFamily: 'heading',
			flexShrink: 0,
			whiteSpace: 'nowrap',
			_hover: {
				borderBottomColor: 'structure.subtle',
			},
		},
		variants: {
			isActive: {
				true: {
					borderBottomColor: 'structure.default',
					_hover: {
						borderBottomColor: 'structure.strong',
					},
				},
				false: {},
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
							<Text
								weight="semibold"
								color={isActive ? 'standard' : 'text-secondary'}
								inline
							>
								{item.title}
							</Text>
						</button>
					);
				})}
			</div>
			{showDivider && <Divider marginY="16px" width="100%" />}
		</>
	);
};
