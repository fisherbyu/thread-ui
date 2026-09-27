'use client';
import { NavItem } from '@/internal';
import { useSplitView, useSplitViewColumn } from '../split-view-context';
import { SplitViewItemProps } from '../split-view.types';

/**
 * Selectable row inside a `SplitView` column: a pill in the sidebar, a rounded row in the list.
 * Shows the active marker in the column's color (`sidebarActiveColor` / `listActiveColor`).
 *
 * @example
 * <SplitView.Item active={folder === 'Inbox'} icon="Tray" onClick={() => openFolder('Inbox')}>
 *   Inbox
 * </SplitView.Item>
 */
export const SplitViewItem = (props: SplitViewItemProps) => {
	const { activeColors } = useSplitView();
	const column = useSplitViewColumn();

	return (
		<NavItem
			{...props}
			shape={column === 'sidebar' ? 'pill' : 'row'}
			activeColor={activeColors[column]}
		/>
	);
};
