import { Card } from '../../card';
import { useTabViewContext } from '../tab-view-context';

export const TabViewActiveContent = () => {
	const { activeItem } = useTabViewContext();

	return <Card title={{ text: activeItem.title }}>{activeItem.content}</Card>;
};
