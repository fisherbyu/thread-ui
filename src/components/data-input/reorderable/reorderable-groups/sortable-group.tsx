'use client';
import type { ReactNode } from 'react';
import { useDroppable } from '@dnd-kit/core';
import { SortableContext, useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { css, cva } from '@/styled-system/css';
import {
	DragHandle,
	createDragHandleProps,
	layoutRecipe,
	layoutStrategies,
	type ReorderableLayout,
	type ReorderableWrapper,
} from '../shared';
import { containerKey, groupKey } from './group-utils';
import type {
	GroupTitlePosition,
	ReorderableGroup,
	ReorderableGroupTitleComponent,
	ReorderableGroupTitleProps,
} from './reorderable-groups.types';

const styles = {
	group: cva({
		base: {
			position: 'relative',
			display: 'flex',
			gap: '2',
			minWidth: '0',
		},
		variants: {
			titlePosition: {
				top: { flexDirection: 'column' },
				start: { flexDirection: 'row', alignItems: 'center' },
			},
			subgrid: {
				true: { display: 'grid', gridColumn: '1 / -1', gridTemplateColumns: 'subgrid' },
				false: {},
			},
			dragging: {
				true: { zIndex: 1 },
				false: {},
			},
		},
	}),
	dropZone: css({
		flex: '1',
		minWidth: '0',
		minHeight: '10',
	}),
};

/** Props for the internal `SortableGroup` wrapper. */
type SortableGroupProps<G extends ReorderableGroup> = {
	group: G;
	/** Human-readable name used in the group's `aria-label` and drag handle */
	label: string;
	/** Namespaced keys of this group's items, in display order */
	itemKeys: string[];
	sortable: boolean;
	titlePosition: GroupTitlePosition;
	/** Align to the parent's two-column grid for `titlePosition="start"` */
	subgrid: boolean;
	layout: ReorderableLayout;
	size: ReorderableGroupTitleProps<G>['size'];
	GroupTitleComponent: ReorderableGroupTitleComponent<G>;
	ItemsWrapper?: ReorderableWrapper;
	children: ReactNode;
};

/**
 * Internal wrapper that makes a group sortable and turns its items area into a drop zone, so empty groups still accept items.
 *
 * @example
 * <SortableGroup group={tier} label="S" itemKeys={keys} sortable titlePosition="start" subgrid layout="grid" size="md" GroupTitleComponent={GroupTitle}>
 *   {items}
 * </SortableGroup>
 */
export const SortableGroup = <G extends ReorderableGroup>({
	group,
	label,
	itemKeys,
	sortable,
	titlePosition,
	subgrid,
	layout,
	size,
	GroupTitleComponent,
	ItemsWrapper,
	children,
}: SortableGroupProps<G>) => {
	// Init DnD Kit Functionality
	const {
		attributes,
		listeners,
		setNodeRef,
		setActivatorNodeRef,
		transform,
		transition,
		isDragging,
	} = useSortable({
		id: groupKey(group.id),
		disabled: !sortable,
	});
	const { setNodeRef: setDropZoneRef } = useDroppable({ id: containerKey(group.id) });

	// DnD Kit Hover/Drag Styling
	const style = {
		transform: CSS.Translate.toString(transform),
		transition,
	};

	// Drag Handle
	const dragHandleProps = sortable
		? createDragHandleProps({ attributes, listeners, setActivatorNodeRef, label })
		: undefined;
	const dragHandle = dragHandleProps ? (
		<DragHandle dragHandleProps={dragHandleProps} isDragging={isDragging} />
	) : null;

	return (
		<div
			ref={setNodeRef}
			style={style}
			role="group"
			aria-label={label}
			className={styles.group({ titlePosition, subgrid, dragging: isDragging })}
		>
			<div>
				<GroupTitleComponent
					group={group}
					dragHandle={dragHandle}
					dragHandleProps={dragHandleProps}
					isDragging={isDragging}
					size={size}
				/>
			</div>
			<div ref={setDropZoneRef} className={styles.dropZone}>
				<SortableContext items={itemKeys} strategy={layoutStrategies[layout]}>
					{ItemsWrapper ? (
						<ItemsWrapper>{children}</ItemsWrapper>
					) : (
						<div className={layoutRecipe({ layout })}>{children}</div>
					)}
				</SortableContext>
			</div>
		</div>
	);
};
