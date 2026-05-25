import { css } from '@/styled-system/css';
import { Card } from '../../card';
import { useTabViewContext } from '../tab-view-context';
import { TabViewControls } from './tab-view-controls';
import { H3 } from '@/components/typography';

type TabItemContentProps = {
	itemId: string;
};

const styles = {
	container: css({}),
};

export const TabItemContent = ({ itemId }: TabItemContentProps) => {
	const {
		value: { activeItemId, items, unmountInactive, cardStyles, title },
	} = useTabViewContext();

	const isActive = activeItemId === itemId;

	if (unmountInactive && !isActive) {
		return null;
	}

	const item = items[itemId];

	return (
		<div hidden={!isActive} className={styles.container}>
			<Card layer={cardStyles} fullWidth>
				{title && <H3>{title}</H3>}
				<TabViewControls />
				{item.content}
			</Card>
		</div>
	);
};
