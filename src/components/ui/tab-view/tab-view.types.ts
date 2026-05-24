import { ReactNode } from 'react';
import { IconNames } from '../icon';
import { Prettify, SurfaceLayerOptions } from '@/types';

/** A single tab definition consumed by the `TabView` component. */
export type TabItem = {
	/** Unique identifier for the tab. Used as the React key and to track the active tab. */
	id: string;
	/** Optional icon rendered alongside the tab title. */
	icon?: IconNames;
	/** Label displayed in the tab control. */
	title: string;
	/** Content rendered in the panel when this tab is active. */
	content: ReactNode;
};

export type TabViewProps = {
	/** Tabs to render, in display order. */
	items: TabItem[];
	/** ID of the tab to activate on initial mount @default first item's `id` */
	defaultValueId?: TabItem['id'];
	/** Surface layer token applied to the tab view container card @default `'surface'` */
	layer?: SurfaceLayerOptions;
	/** Display Divider between Controls and Content @default `'true'` */
	showDivider?: boolean;
	/** When true, inactive tab panels are removed from the DOM rather than hidden @default `false` */
	unmountInactive?: boolean;
};

export type TabViewState = Prettify<{
	showDivider: TabViewProps['showDivider'];
	items: Record<TabItem['id'], TabItem>;
	itemOrder: TabItem['id'][];
	activeItemId: TabItem['id'];
	layer: TabViewProps['layer'];
	unmountInactive: boolean;
}>;
