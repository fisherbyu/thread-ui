'use client';
import { ReactNode } from 'react';
import { css } from '@/styled-system/css';
import { useSplitView, useSplitViewColumn } from '../split-view-context';
import { SplitViewBackButton } from './split-view-back-button';
import { SplitViewSidebarToggle } from './split-view-sidebar-toggle';

const styles = {
	header: css({
		position: 'sticky',
		top: 0,
		zIndex: 1,
		// Flex child of a scrolling column: keep its full height so the backing covers the title row
		flexShrink: 0,
		display: 'flex',
		alignItems: 'center',
		gap: '2',
		minHeight: '12',
		paddingX: '4',
		paddingY: '2',
		backgroundColor: 'inherit',
		// Compact: controls on the first row, a large title on its own row below, like iOS
		mdDown: { flexWrap: 'wrap', rowGap: '1' },
	}),
	title: css({
		flex: 1,
		minWidth: 0,
		overflow: 'hidden',
		textOverflow: 'ellipsis',
		whiteSpace: 'nowrap',
		fontFamily: 'heading',
		fontSize: 'heading.sm',
		lineHeight: 'tight',
		color: 'text.standard',
		mdDown: { order: 1, flexBasis: '100%', fontSize: 'heading.md' },
	}),
	actions: css({ display: 'flex', alignItems: 'center', gap: '1', marginLeft: 'auto' }),
};

/** Sticky column header: back button, sidebar toggle on the first content column, title, actions. */
export const SplitViewHeader = ({ title, actions }: { title?: ReactNode; actions?: ReactNode }) => {
	const { columns } = useSplitView();
	const column = useSplitViewColumn();

	return (
		<header className={styles.header}>
			<SplitViewBackButton />
			{column === columns[1] && <SplitViewSidebarToggle />}
			{title && <h2 className={styles.title}>{title}</h2>}
			{actions && <div className={styles.actions}>{actions}</div>}
		</header>
	);
};
