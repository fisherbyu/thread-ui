'use client';

import { TabViewProps } from './tab-view.types';
import { TabViewContent } from './components/tab-view-content';
import { TabViewProvider } from './tab-view-context';

export const TabView = ({ items, defaultValue, layer = 'surface' }: TabViewProps) => {
	const defaultItem = items.find((item) => item.name === defaultValue) ?? items[0];

	return (
		<TabViewProvider value={{ activeItem: defaultItem, items, layer }}>
			<TabViewContent />
		</TabViewProvider>
	);
};
