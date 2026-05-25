import { css } from '@/styled-system/css';
import { Card } from '../../card';
import { useTabViewContext } from '../tab-view-context';
import { TabViewControls } from './tab-view-controls';

type TabItemContentProps = {
	itemId: string;
};

const styles = {
	container: css({}),
};

export const TabItemContent = ({ itemId }: TabItemContentProps) => {
	const {
		value: { activeItemId, items, unmountInactive, layer },
	} = useTabViewContext();

	const isActive = activeItemId === itemId;

	if (unmountInactive && !isActive) {
		return null;
	}

	const item = items[itemId];

	return (
		<div hidden={!isActive} className={styles.container}>
			<Card layer={layer} fullWidth>
				<TabViewControls />
				{item.content}
			</Card>
		</div>
	);
};
