'use client';
import { useMemo } from 'react';
import { TabViewProps, TabViewState } from './tab-view.types';
import { TabViewContent } from './components/tab-view-content';
import { TabViewProvider } from './tab-view-context';

export const TabView = ({ items, defaultValueId, layer = 'surface' }: TabViewProps) => {
	const value = useMemo<TabViewState>(() => {
		const itemsStore = Object.fromEntries(
			items.map((item) => [item.id, item])
		) as TabViewState['items'];

		const itemOrder = items.map((item) => item.id);

		const activeItemId =
			defaultValueId && itemsStore[defaultValueId] ? defaultValueId : items[0]?.id;

		return { items: itemsStore, itemOrder, activeItemId, layer };
	}, [items, defaultValueId, layer]);

	if (!items.length) return null;

	return (
		<TabViewProvider value={value}>
			<TabViewContent />
		</TabViewProvider>
	);
};
