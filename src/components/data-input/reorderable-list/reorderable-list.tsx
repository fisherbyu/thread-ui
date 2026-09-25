'use client';
import { useCallback, useEffect, useId, useMemo, useRef } from 'react';
import {
	DndContext,
	closestCenter,
	KeyboardSensor,
	PointerSensor,
	useSensor,
	useSensors,
	type Announcements,
	type DragEndEvent,
	type ScreenReaderInstructions,
	type UniqueIdentifier,
} from '@dnd-kit/core';
import {
	arrayMove,
	SortableContext,
	sortableKeyboardCoordinates,
	verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { css } from '@/styled-system/css';
import { InputWrapper } from '../shared/input-wrapper';
import { SortableItem, type ReorderableItem } from './sortable-item';
import type { NumericKeys, ReorderableListProps } from './reorderable-list.types';

const styles = {
	list: css({
		width: '100%',
	}),
};

const screenReaderInstructions: ScreenReaderInstructions = {
	draggable:
		'To pick up an item, press Space or Enter. While dragging, use the arrow keys to move it. Press Space or Enter again to drop it in its new position, or press Escape to cancel.',
};

const defaultGetItemLabel = (_item: unknown, index: number) => `Item ${index + 1}`;

// Rewrite `orderProperty` to match array position
const applyOrder = <T,>(items: T[], orderProperty?: NumericKeys<T>): T[] =>
	orderProperty
		? items.map((item, index) => ({
				...item,
				[orderProperty]: index,
			}))
		: items;

/**
 * Controlled vertical list input whose items can be reordered by pointer, touch, or keyboard. Each item renders through `ItemComponent`, which receives a `dragHandle` to place wherever the item should be grabbed. Set `name` to submit the order with a form.
 *
 * @example
 * const [tasks, setTasks] = useState(initialTasks);
 *
 * <ReorderableList
 *     name="taskOrder"
 *     title="Tasks"
 *     value={tasks}
 *     orderProperty="order"
 *     ItemComponent={TaskRow}
 *     onChange={setTasks}
 *     getItemLabel={(task) => task.title}
 * />
 */
export const ReorderableList = <T extends ReorderableItem>({
	value,
	orderProperty,
	ItemComponent,
	onChange,
	getItemLabel = defaultGetItemLabel,
	id: idProp,
	name,
	title,
	size = 'md',
	divider,
	secondaryContent,
}: ReorderableListProps<T>) => {
	// Resolve Id
	const generatedId = useId();
	const inputId = idProp ?? name ?? generatedId;

	// Latest value, so delayed item callbacks never act on a stale list
	const valueRef = useRef(value);
	useEffect(() => {
		valueRef.current = value;
	}, [value]);

	// Configure sensors for mouse, touch, and keyboard interactions
	const sensors = useSensors(
		useSensor(PointerSensor, {
			activationConstraint: { distance: 4 },
		}),
		useSensor(KeyboardSensor, {
			coordinateGetter: sortableKeyboardCoordinates,
		})
	);

	// Item IDs in display order
	const ids = useMemo(() => value.map((item) => item.id), [value]);

	// Screen reader announcements
	const announcements = useMemo<Announcements>(() => {
		const total = ids.length;
		const position = (id: UniqueIdentifier) => ids.indexOf(id) + 1;
		const label = (id: UniqueIdentifier) => {
			const index = ids.indexOf(id);
			return index === -1 ? 'Item' : getItemLabel(value[index], index);
		};

		return {
			onDragStart: ({ active }) =>
				`Picked up ${label(active.id)}. Position ${position(active.id)} of ${total}.`,
			onDragOver: ({ active, over }) =>
				over
					? `${label(active.id)} moved to position ${position(over.id)} of ${total}.`
					: `${label(active.id)} is not over a valid position.`,
			onDragEnd: ({ active, over }) =>
				over
					? `${label(active.id)} dropped at position ${position(over.id)} of ${total}.`
					: `${label(active.id)} dropped.`,
			onDragCancel: ({ active }) =>
				`Reordering cancelled. ${label(active.id)} returned to position ${position(active.id)} of ${total}.`,
		};
	}, [ids, value, getItemLabel]);

	// Handle drag end with memoized callback
	const handleDragEnd = useCallback(
		(event: DragEndEvent) => {
			const { active, over } = event;
			if (!over || active.id === over.id) return;

			// Find current indices
			const oldIndex = ids.indexOf(active.id);
			const newIndex = ids.indexOf(over.id);
			if (oldIndex === -1 || newIndex === -1) return;

			// Reorder Array
			const newItems = arrayMove(value, oldIndex, newIndex);

			// Update OrderProperty on each Item
			const updatedItems = applyOrder(newItems, orderProperty);

			// Update Data
			onChange(updatedItems);
		},
		[value, ids, onChange, orderProperty]
	);

	// Handle Item Change with memoized callback
	const handleItemChange = useCallback(
		(updatedItem: T) => {
			const current = valueRef.current;

			// Find the item index in the current list
			const itemIndex = current.findIndex((item) => item.id === updatedItem.id);
			if (itemIndex === -1) return;

			// Create a new array with the updated item
			const updatedItems = [...current];
			updatedItems[itemIndex] = updatedItem;

			// Notify parent component
			onChange(updatedItems);
		},
		[onChange]
	);

	// Handle Item Remove with memoized callback
	const handleItemRemove = useCallback(
		(itemId: ReorderableItem['id']) => {
			const current = valueRef.current;

			// Drop the item
			const remaining = current.filter((item) => item.id !== itemId);
			if (remaining.length === current.length) return;

			// Re-index and notify parent component
			onChange(applyOrder(remaining, orderProperty));
		},
		[onChange, orderProperty]
	);

	return (
		<InputWrapper
			id={inputId}
			title={title}
			size={size}
			divider={divider}
			secondaryContent={secondaryContent}
		>
			<DndContext
				sensors={sensors}
				collisionDetection={closestCenter}
				onDragEnd={handleDragEnd}
				accessibility={{ announcements, screenReaderInstructions }}
			>
				<SortableContext items={ids} strategy={verticalListSortingStrategy}>
					<div
						id={inputId}
						role="group"
						aria-labelledby={title ? `${inputId}-label` : undefined}
						className={styles.list}
					>
						{value.map((item, index) => (
							<SortableItem
								key={item.id}
								item={item}
								label={getItemLabel(item, index)}
								ItemComponent={ItemComponent}
								onItemChange={handleItemChange}
								onItemRemove={handleItemRemove}
							/>
						))}

						{/* Form Participation */}
						{name &&
							ids.map((id) => (
								<input key={id} type="hidden" name={name} value={id} />
							))}
					</div>
				</SortableContext>
			</DndContext>
		</InputWrapper>
	);
};
