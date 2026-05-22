import { ReactNode } from 'react';
import { IconNames } from '../icon';
import { SurfaceLayerOptions } from '@/types';

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

export type TabViewState = Omit<TabViewProps, 'defaultValue'> & {
	activeItem: TabItem;
};
