'use client';
import { TabViewProps, TabViewState } from './tab-view.types';
import { TabViewContent } from './components/tab-view-content';
import { TabViewProvider } from './tab-view-context';

export const TabView = ({
	items: itemList,
	defaultValueId,
	layer = 'surface',
	unmountInactive = false,
}: TabViewProps) => {
	if (!itemList.length) return null;

	const items = Object.fromEntries(
		itemList.map((item) => [item.id, item])
	) as TabViewState['items'];

	const itemOrder = itemList.map((item) => item.id);

	const activeItemId = defaultValueId && items[defaultValueId] ? defaultValueId : itemList[0]?.id;

	const initialValue: TabViewState = {
		items,
		itemOrder,
		activeItemId,
		unmountInactive,
		layer,
	};

	return (
		<TabViewProvider initialValue={initialValue}>
			<TabViewContent />
		</TabViewProvider>
	);
};
