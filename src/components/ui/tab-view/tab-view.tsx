'use client';

import { TabViewProps } from './tab-view.types';
import { TabViewContent } from './components/tab-view-content';
import { TabViewProvider } from './tab-view-context';

export const TabView = ({ items, defaultValue, layer = 'surface' }: TabViewProps) => {
	return (
		<TabViewProvider value={{ items, defaultValue, layer }}>
			<TabViewContent />
		</TabViewProvider>
	);
};
