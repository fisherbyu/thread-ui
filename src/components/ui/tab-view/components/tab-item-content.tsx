import { css, cva } from '@/styled-system/css';
import { Card } from '../../card';
import { useTabViewContext } from '../tab-view-context';
import { TabItem, TabViewProps } from '../tab-view.types';

type TabItemContentProps = {
	itemId: TabItem['id'];
};

const styles = {
	container: css({}),
};

export const TabItemContent = ({ itemId }: TabItemContentProps) => {
	const {
		value: { activeItemId, items, unmountInactive },
	} = useTabViewContext();

	const isActive = activeItemId === itemId;

	if (unmountInactive && !isActive) {
		return null;
	}

	const item = items[itemId];

	return (
		<div hidden={!isActive} className={styles.container}>
			<Card fullWidth title={{ text: item.title }}>
				{item.content}
			</Card>
		</div>
	);
};
