'use client';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { cva } from '@/styled-system/css';
import { DragHandle, createDragHandleProps } from './drag-handle';
import type { ReorderableItem } from './reorderable.types';
import type { SortableItemProps } from './sortable-item.types';

const itemRecipe = cva({
	base: {
		position: 'relative',
	},
	variants: {
		dragging: {
			true: { zIndex: 1 },
			false: {},
		},
	},
});

/**
 * Internal wrapper that makes a single item sortable and hands the consumer's `ItemComponent` a default `dragHandle` and spreadable `dragHandleProps`.
 *
 * @example
 * <SortableItem sortableId={task.id} item={task} label={task.title} ItemComponent={TaskRow} onItemChange={handleItemChange} onItemRemove={handleItemRemove} />
 */
export const SortableItem = <T extends ReorderableItem>({
	item,
	label,
	ItemComponent,
	onItemChange,
	onItemRemove,
	sortableId,
}: SortableItemProps<T>) => {
	// Init DnD Kit Functionality
	const {
		attributes,
		listeners,
		setNodeRef,
		setActivatorNodeRef,
		transform,
		transition,
		isDragging,
	} = useSortable({ id: sortableId });

	// DnD Kit Hover/Drag Styling
	const style = {
		transform: CSS.Translate.toString(transform),
		transition,
	};

	// Drag Handle
	const dragHandleProps = createDragHandleProps({
		attributes,
		listeners,
		setActivatorNodeRef,
		label,
	});
	const dragHandle = <DragHandle dragHandleProps={dragHandleProps} isDragging={isDragging} />;

	return (
		<div ref={setNodeRef} style={style} className={itemRecipe({ dragging: isDragging })}>
			<ItemComponent
				item={item}
				dragHandle={dragHandle}
				dragHandleProps={dragHandleProps}
				onItemChange={onItemChange}
				onItemRemove={() => onItemRemove(item.id)}
				isDragging={isDragging}
			/>
		</div>
	);
};
