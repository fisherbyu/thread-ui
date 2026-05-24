import { css, cva } from '@/styled-system/css';
import { useTabViewContext } from '../tab-view-context';
import { Divider } from '../../divider';
import { H3, Text } from '@/components/typography';

const styles = {
	container: cva({
		base: {
			width: '100%',
			display: 'flex',
			flexDirection: 'row',
			justifyContent: 'start',
			gap: '2',
			alignItems: 'center',
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
			padding: '2',
			borderBottomWidth: 'md',
			borderBottomColor: 'transparent',
			cursor: 'pointer',
			fontFamily: 'heading',
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
					const isActive = activeItemId === itemId;
					return (
						<button
							key={itemId}
							className={styles.item({ isActive })}
							onClick={() => setValue((prev) => ({ ...prev, activeItemId: itemId }))}
						>
							<Text
								weight="semibold"
								color={isActive ? 'standard' : 'text-secondary'}
								inline
							>
								{items[itemId].title}
							</Text>
						</button>
					);
				})}
			</div>
			{showDivider && <Divider marginY="16px" width="100%" />}
		</>
	);
};
