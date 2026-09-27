'use client';
import { css } from '@/styled-system/css';
import { IconButton } from '@/components/ui';
import { useSplitView, useSplitViewColumn } from '../split-view-context';
import { SplitViewBackButtonProps } from '../split-view.types';

const styles = {
	wrapper: css({ display: 'none', mdDown: { display: 'contents' } }),
};

/** Returns to the column before the one it's in. Only shown in compact mode, and not in the first column. */
export const SplitViewBackButton = ({ children }: SplitViewBackButtonProps) => {
	const { columns, titles, show } = useSplitView();
	const column = useSplitViewColumn();
	const previous = columns[columns.indexOf(column) - 1];
	if (!previous) return null;

	return (
		<span className={styles.wrapper}>
			<IconButton size="sm" name="CaretLeft" color="info" text onClick={() => show(previous)}>
				{children ?? titles[previous] ?? 'Back'}
			</IconButton>
		</span>
	);
};
