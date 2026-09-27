import { ReactNode } from 'react';
import { IconNames } from '@/components/ui';
import { SplitViewProps } from '../split-view';

/** A sidebar entry. Selecting one shows its items in the list. */
export type SplitNavigatorSection = {
	id: string;
	title: string;
	icon?: IconNames;
	/** Don't render the list; the detail shows the selected item, or the first when none is selected @default `false` */
	hideList?: boolean;
};

/** Minimum shape of a list item. */
export type SplitNavigatorItem = { id: string | number };

export type SplitNavigatorProps<T extends SplitNavigatorItem> = Omit<SplitViewProps, 'children'> & {
	/** Sidebar entries, in display order */
	sections: SplitNavigatorSection[];
	/** Items of the selected section, shown in the list */
	items: T[];
	/** Content of a list row */
	renderItem: (item: T) => ReactNode;
	/** Detail column content for the selected item */
	renderDetail: (item: T) => ReactNode;

	/** Selected section id. Makes the section controlled */
	section?: string;
	/** Initial section for uncontrolled use @default the first section */
	defaultSection?: string;
	/** Called with the next section id whenever it changes */
	onSectionChange?: (section: string) => void;
	/** Selected item id, or `null` for none. Makes the item controlled */
	item?: T['id'] | null;
	/** Initial item for uncontrolled use @default `null` */
	defaultItem?: T['id'] | null;
	/** Called with the next item id, or `null` when the section changes */
	onItemChange?: (item: T['id'] | null) => void;

	/** Renders sections as links, e.g. for router-driven selection */
	getSectionHref?: (section: SplitNavigatorSection) => string;
	/** Renders items as links, e.g. for router-driven selection */
	getItemHref?: (item: T, section: SplitNavigatorSection) => string;

	/** Sidebar header title */
	sidebarTitle?: string;
	/** Content pinned to the bottom of the sidebar, e.g. account controls */
	sidebarFooter?: ReactNode;
	/** List header title @default the section's title */
	listTitle?: (section: SplitNavigatorSection) => string;
	/** Detail header title for the selected item */
	detailTitle?: (item: T) => ReactNode;
	/** Trailing list header content */
	listActions?: (section: SplitNavigatorSection) => ReactNode;
	/** Trailing detail header content for the selected item */
	detailActions?: (item: T) => ReactNode;
	/** Content pinned to the bottom of the detail column for the selected item, e.g. a save button */
	detailFooter?: (item: T) => ReactNode;
	/** Shown in the list when the section has no items @default `'Nothing here yet'` */
	emptyList?: ReactNode;
	/** Shown in the detail when no item is selected @default `'Select an item'` */
	emptyDetail?: ReactNode;
};
