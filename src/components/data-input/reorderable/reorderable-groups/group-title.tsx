'use client';
import { css } from '@/styled-system/css';
import { Text } from '@/components/typography';
import type { ReorderableGroup, ReorderableGroupTitleProps } from './reorderable-groups.types';

const styles = {
	root: css({
		display: 'flex',
		alignItems: 'center',
		gap: '1',
		minWidth: '0',
	}),
};

/**
 * Default group title: the drag handle followed by the `title`. A string `title` renders as semibold `Text`; a node renders as-is.
 *
 * @example
 * <GroupTitle group={group} dragHandle={dragHandle} isDragging={false} size="md" />
 */
export const GroupTitle = <G extends ReorderableGroup>({
	group,
	dragHandle,
	size,
}: ReorderableGroupTitleProps<G>) => (
	<div className={styles.root}>
		{dragHandle}
		{typeof group.title === 'string' ? (
			<Text marginBottom={false} weight="semibold" size={size}>
				{group.title}
			</Text>
		) : (
			group.title
		)}
	</div>
);
