'use client';
import { css } from '@/styled-system/css';
import { IconButton } from '@/components/ui';
import { useSplitView, useSplitViewColumn } from '../split-view-context';
import { SplitViewBackButtonProps } from '../split-view.types';

const styles = {
	wrapper: css({ display: 'none', mdDown: { display: 'contents' } }),
};

/**
 * Returns to the previous column. Only shown in compact mode when there is somewhere to go back to.
 * Inside a column it goes back from that column; elsewhere, from the frontmost one.
 */
export const SplitViewBackButton = ({ children }: SplitViewBackButtonProps) => {
	const { columns, column: activeColumn, titles, show } = useSplitView();
	const column = useSplitViewColumn() ?? activeColumn;
	const previous = columns[columns.indexOf(column) - 1];
	if (!previous) return null;

	return (
		<span className={styles.wrapper}>
			<IconButton name="CaretLeft" color="info" text onClick={() => show(previous)}>
				{children ?? titles[previous] ?? 'Back'}
			</IconButton>
		</span>
	);
};
