import { ReactNode } from 'react';
import { IconNames } from '../icon';
import { Prettify, SurfaceLayerOptions } from '@/types';

/** A single tab definition consumed by the `TabView` component. */
export type TabItem = {
	/** Optional icon rendered alongside the tab title. */
	icon?: IconNames;
	/** Label displayed in the tab control. */
	title: string;
	/** Content rendered in the panel when this tab is active. */
	content: ReactNode;
};

export type TabItemId = string;

type InternalTabItem = TabItem & {
	id: TabItemId;
};

export type TabViewProps = {
	/** Optional Title */
	title?: string | ReactNode;
	/** Tabs to render, in display order. */
	items: TabItem[];
	/** Card surface layer styles applied to the tab view container @default `'surface'` */
	cardStyles?: SurfaceLayerOptions | 'none';
	/** Display Divider between Controls and Content @default `'false'` */
	showDivider?: boolean;
	/** When true, inactive tab panels are removed from the DOM rather than hidden @default `false` */
	unmountInactive?: boolean;
};

export type TabViewState = Prettify<
	Pick<TabViewProps, 'title' | 'showDivider' | 'cardStyles'> & {
		items: Record<TabItemId, InternalTabItem>;
		itemOrder: TabItemId[];
		activeItemId: TabItemId;
		unmountInactive: boolean;
	}
>;
