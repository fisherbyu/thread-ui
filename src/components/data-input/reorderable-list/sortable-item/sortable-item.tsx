'use client';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { cva } from '@/styled-system/css';
import type { ReorderableItem, SortableItemProps } from './sortable-item.types';
import { Icon } from '@/components/ui';

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

const dragHandleRecipe = cva({
	base: {
		display: 'inline-flex',
		alignItems: 'center',
		justifyContent: 'center',
		flexShrink: 0,
		padding: '1',
		borderRadius: 'sm',
		color: 'text.standard',
		background: 'transparent',
		border: 'none',
		cursor: 'grab',
		touchAction: 'none',
		_hover: {
			backgroundColor: 'hover',
		},
		_focusVisible: {
			outlineStyle: 'solid',
			outlineWidth: '2px',
			outlineColor: 'text.standard',
			outlineOffset: '0.5',
		},
	},
	variants: {
		dragging: {
			true: { cursor: 'grabbing', color: 'text.secondary' },
			false: {},
		},
	},
});

/**
 * Internal wrapper that makes a single `ReorderableList` item sortable and hands the consumer's `ItemComponent` a pre-wired drag handle.
 *
 * @example
 * <SortableItem item={task} label={task.title} ItemComponent={TaskRow} onItemChange={handleItemChange} />
 */
export const SortableItem = <T extends ReorderableItem>({
	item,
	label,
	ItemComponent,
	onItemChange,
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
	} = useSortable({ id: item.id });

	// DnD Kit Hover/Drag Styling
	const style = {
		transform: CSS.Translate.toString(transform),
		transition,
	};

	// Drag Handle
	const dragHandle = (
		<button
			type="button"
			ref={setActivatorNodeRef}
			className={dragHandleRecipe({ dragging: isDragging })}
			aria-label={`Reorder ${label}`}
			{...attributes}
			{...listeners}
		>
			<Icon name="DotsSixVertical" size={16} />
		</button>
	);

	return (
		<div ref={setNodeRef} style={style} className={itemRecipe({ dragging: isDragging })}>
			<ItemComponent
				item={item}
				dragHandle={dragHandle}
				onItemChange={onItemChange}
				isDragging={isDragging}
			/>
		</div>
	);
};
