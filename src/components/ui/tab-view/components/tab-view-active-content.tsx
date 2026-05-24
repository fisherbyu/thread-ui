import { Card } from '../../card';
import { useTabViewContext } from '../tab-view-context';

export const TabItemContent = () => {
	const {
		value: { activeItemId, items },
	} = useTabViewContext();

	const activeItem = items[activeItemId];

	return <Card title={{ text: activeItem.title }}>{activeItem.content}</Card>;
};
