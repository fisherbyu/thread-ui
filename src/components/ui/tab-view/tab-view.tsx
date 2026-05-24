'use client';
import { TabViewProps, TabViewState } from './tab-view.types';
import { TabViewContent } from './components/tab-view-content';
import { TabViewProvider } from './tab-view-context';

/**
 * Tabbed view component that renders a row of tab controls and a panel for the active tab.
 *
 * Items are normalized into a keyed record and an order array, then handed to
 * `TabViewProvider` so descendant components can read and update the active tab via context.
 * Returns `null` when `items` is empty.
 *
 * @example
 * <TabView
 *   items={[
 *     { id: 'overview', title: 'Overview', content: <Overview /> },
 *     { id: 'details', title: 'Details', content: <Details /> },
 *   ]}
 *   defaultValueId="details"
 * />
 */
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
