'use client';
import { SplitViewColumnProps } from '../split-view.types';
import { SplitViewColumn } from './split-view-column';

/** Leading column, usually top-level navigation. Docks in wide mode, overlays in medium. */
export const SplitViewSidebar = (props: SplitViewColumnProps) => (
	<SplitViewColumn column="sidebar" {...props} />
);

/** Optional middle column, usually the items within the selected sidebar section. */
export const SplitViewList = (props: SplitViewColumnProps) => (
	<SplitViewColumn column="list" {...props} />
);

/** Trailing column showing the selected item. Fills the remaining width. */
export const SplitViewDetail = (props: SplitViewColumnProps) => (
	<SplitViewColumn column="detail" {...props} />
);
