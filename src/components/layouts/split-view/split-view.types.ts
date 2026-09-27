import { ReactNode } from 'react';
import { NavListItemActiveColor, NavListItemProps } from '@/internal';

/** A column of the split view, in navigation order. */
export type SplitViewColumn = 'sidebar' | 'list' | 'detail';

/**
 * Current layout, driven by viewport width:
 * - `wide` (≥ `lg`): columns side by side, sidebar docked
 * - `medium` (`md`–`lg`): list and detail side by side, sidebar as an overlay
 * - `compact` (< `md`): one column at a time, stacked
 */
export type SplitViewMode = 'wide' | 'medium' | 'compact';

/**
 * Visual treatment in wide and medium modes. Compact mode is always full-bleed.
 * - `floating`: elevated sidebar card floating beside a full-bleed list and detail surface
 * - `layered`: elevated sidebar card, list directly on the canvas, detail as its own surface card
 */
export type SplitViewVariant = 'floating' | 'layered';

/** Color of the active item marker. `neutral` uses the theme's `active` highlight */
export type SplitViewActiveColor = NavListItemActiveColor;

export type SplitViewProps = {
	/** `SplitView.Sidebar`, optional `SplitView.List`, and `SplitView.Detail` as direct children */
	children: ReactNode;
	/** Frontmost column in compact mode. Makes the column controlled */
	column?: SplitViewColumn;
	/** Initial column for uncontrolled use @default `'list'`, or `'sidebar'` without a list */
	defaultColumn?: SplitViewColumn;
	/** Called with the next column whenever it changes */
	onColumnChange?: (column: SplitViewColumn) => void;
	/** Whether the sidebar is shown (docked in wide mode, overlaid in medium). Makes it controlled */
	sidebarOpen?: boolean;
	/** Initial sidebar visibility for uncontrolled use @default `true` */
	defaultSidebarOpen?: boolean;
	/** Called with the next sidebar visibility whenever it changes */
	onSidebarOpenChange?: (open: boolean) => void;
	/** Sidebar width in wide and medium modes @default `'240px'` */
	sidebarWidth?: string;
	/** List width in wide and medium modes @default `'320px'` */
	listWidth?: string;
	/** Visual treatment in wide and medium modes @default `'floating'` */
	variant?: SplitViewVariant;
	/** Active marker color for `SplitView.Item`s in the sidebar @default `'primary'` */
	sidebarActiveColor?: SplitViewActiveColor;
	/** Active marker color for `SplitView.Item`s in the list and detail @default `'neutral'` */
	listActiveColor?: SplitViewActiveColor;
};

export type SplitViewColumnProps = {
	/** Column contents */
	children: ReactNode;
	/** Title shown in the column's sticky header. A string title also labels the column and the next column's back button */
	title?: ReactNode;
	/** Content at the trailing end of the column header */
	actions?: ReactNode;
	/** Content pinned to the bottom of the column, e.g. account controls in the sidebar */
	footer?: ReactNode;
	/** Accessible label for the column @default `title` when it is a string */
	ariaLabel?: string;
};

export type SplitViewItemProps = Pick<
	NavListItemProps,
	'children' | 'active' | 'icon' | 'href' | 'onClick'
>;

export type SplitViewBackButtonProps = {
	/** Button label @default the previous column's string `title`, otherwise `'Back'` */
	children?: ReactNode;
};

export type SplitViewSidebarToggleProps = {
	/** Accessible label for the button @default `'Toggle sidebar'` */
	ariaLabel?: string;
};

export type SplitViewState = {
	/** Visual treatment in wide and medium modes */
	variant: SplitViewVariant;
	/** Active marker colors by column */
	activeColors: Record<SplitViewColumn, SplitViewActiveColor>;
	/** String titles of each column, used for back button labels */
	titles: Partial<Record<SplitViewColumn, string>>;
	/** Current layout mode. `'wide'` until mounted */
	mode: SplitViewMode;
	/** Frontmost column in compact mode */
	column: SplitViewColumn;
	/** Columns present, in navigation order */
	columns: SplitViewColumn[];
	/** Whether `back` has a column to return to */
	canGoBack: boolean;
	/** Whether the sidebar is shown (docked in wide mode, overlaid in medium) */
	sidebarOpen: boolean;
	/** Bring `column` to the front: pushes it in compact mode, opens or closes the sidebar otherwise */
	show: (column: SplitViewColumn) => void;
	/** Return to the previous column */
	back: () => void;
	setSidebarOpen: (open: boolean) => void;
	toggleSidebar: () => void;
};
