'use client';
import { TabItemContent } from './tab-item-content';
import { useTabViewContext } from '../tab-view-context';

export const TabViewContent = () => {
	const {
		value: { items },
	} = useTabViewContext();
	return (
		<div>
			{Object.entries(items).map(([itemId]) => (
				<TabItemContent key={itemId} itemId={itemId} />
			))}
		</div>
	);
};
