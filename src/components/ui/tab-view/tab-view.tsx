'use client';
import { TabViewProps, TabViewState } from './tab-view.types';
import { TabViewContent } from './components/tab-view-content';
import { TabViewProvider } from './tab-view-context';

export const TabView = ({
	items,
	defaultValueId,
	layer = 'surface',
	unmountInactive = false,
}: TabViewProps) => {
	if (!items.length) return null;

	const itemsStore = Object.fromEntries(
		items.map((item) => [item.id, item])
	) as TabViewState['items'];

	const itemOrder = items.map((item) => item.id);

	const activeItemId =
		defaultValueId && itemsStore[defaultValueId] ? defaultValueId : items[0]?.id;

	const initialValue: TabViewState = {
		items: itemsStore,
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
