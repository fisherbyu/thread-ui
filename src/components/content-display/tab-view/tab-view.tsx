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
 * />
 */
export const TabView = ({
	items: itemList,
	cardStyles = 'surface',
	unmountInactive = false,
	showDivider = false,
	title,
}: TabViewProps) => {
	if (!itemList.length) return null;
	const normalizedItems = itemList.map((item, index) => ({
		...item,
		id: String(index),
	}));
	const items = Object.fromEntries(
		normalizedItems.map((item) => [item.id, item])
	) as TabViewState['items'];
	const itemOrder = normalizedItems.map((item) => item.id);
	const activeItemId = normalizedItems[0].id;
	const initialValue: TabViewState = {
		title,
		items,
		itemOrder,
		activeItemId,
		unmountInactive,
		cardStyles,
		showDivider,
	};
	return (
		<TabViewProvider syncedKeys={['title', 'items']} initialValue={initialValue}>
			<TabViewContent />
		</TabViewProvider>
	);
};
