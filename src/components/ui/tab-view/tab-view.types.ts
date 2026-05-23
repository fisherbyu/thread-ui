import { ReactNode } from 'react';
import { IconNames } from '../icon';
import { Prettify, SurfaceLayerOptions } from '@/types';

export type TabItem = {
	id: string;
	icon?: IconNames;
	title: string;
	content: ReactNode;
};

export type TabViewProps = {
	items: TabItem[];
	defaultValueId: TabItem['id'];
	layer?: SurfaceLayerOptions;
};

export type TabViewState = Prettify<
	Omit<TabViewProps, 'defaultValue' | 'items'> & {
		items: Record<TabItem['id'], TabItem>;
		itemOrder: TabItem['id'][];
		activeItemId: TabItem['id'];
	}
>;
