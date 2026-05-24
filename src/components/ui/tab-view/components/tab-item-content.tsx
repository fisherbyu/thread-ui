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
		value: { activeItemId, items },
	} = useTabViewContext();

	const item = items[itemId];

	const showItem = activeItemId === itemId;

	return (
		<div hidden={showItem} className={styles.container}>
			<Card title={{ text: item.title }}>{item.content}</Card>
		</div>
	);
};
