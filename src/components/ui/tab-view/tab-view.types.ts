import { ReactNode } from 'react';
import { IconNames } from '../icon';
import { Prettify, SurfaceLayerOptions } from '@/types';

export type TabItem = {
	name: string;
	icon?: IconNames;
	title: string;
	content: ReactNode;
};

export type TabViewProps = {
	items: TabItem[];
	defaultValue: string;
	layer?: SurfaceLayerOptions;
};

export type TabViewState = Prettify<
	Omit<TabViewProps, 'defaultValue' | 'items'> & {
		items: Record<number, TabItem>;
		activeItem: TabItem;
	}
>;
