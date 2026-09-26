'use client';
import { useCallback, useId, useMemo } from 'react';
import {
	DndContext,
	closestCenter,
	KeyboardSensor,
	PointerSensor,
	useSensor,
	useSensors,
	type DragEndEvent,
} from '@dnd-kit/core';
import { arrayMove, SortableContext, sortableKeyboardCoordinates } from '@dnd-kit/sortable';
import { css } from '@/styled-system/css';
import { InputWrapper } from '../../shared/input-wrapper';
import {
	SortableItem,
	applyOrder,
	createListAnnouncements,
	defaultGetItemLabel,
	layoutRecipe,
	layoutStrategies,
	screenReaderInstructions,
	type ReorderableItem,
} from '../shared';
import { useLatestRef } from '@/internal';
import type { ReorderableListProps } from './reorderable-list.types';

const styles = {
	list: css({
		width: '100%',
	}),
};

/**
 * Controlled list input whose items can be reordered by pointer, touch, or keyboard. Each item renders through `ItemComponent`, which receives a default `dragHandle` or `dragHandleProps` to make any element the handle. Set `name` to submit the order with a form.
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
	layout = 'vertical',
	ItemsWrapper,
	id: idProp,
	name,
	formValue = 'inputs',
	title,
	size = 'md',
	divider,
	secondaryContent,
}: ReorderableListProps<T>) => {
	// Resolve Id
	const generatedId = useId();
	const inputId = idProp ?? name ?? generatedId;

	// Latest value, so delayed item callbacks never act on a stale list
	const valueRef = useLatestRef(value);

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
	const announcements = useMemo(
		() =>
			createListAnnouncements(ids, (key) => {
				const index = ids.indexOf(key);
				return index === -1 ? 'Item' : getItemLabel(value[index], index);
			}),
		[ids, value, getItemLabel]
	);

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
		[onChange, valueRef]
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
		[onChange, orderProperty, valueRef]
	);

	const items = value.map((item, index) => (
		<SortableItem
			key={item.id}
			sortableId={item.id}
			item={item}
			label={getItemLabel(item, index)}
			ItemComponent={ItemComponent}
			onItemChange={handleItemChange}
			onItemRemove={handleItemRemove}
		/>
	));

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
				<SortableContext items={ids} strategy={layoutStrategies[layout]}>
					<div
						id={inputId}
						role="group"
						aria-labelledby={title ? `${inputId}-label` : undefined}
						className={styles.list}
					>
						{ItemsWrapper ? (
							<ItemsWrapper>{items}</ItemsWrapper>
						) : (
							<div className={layoutRecipe({ layout })}>{items}</div>
						)}

						{/* Form Participation */}
						{name &&
							formValue === 'inputs' &&
							ids.map((id) => (
								<input key={id} type="hidden" name={name} value={id} />
							))}
						{name && formValue === 'json' && (
							<input type="hidden" name={name} value={JSON.stringify(ids)} />
						)}
					</div>
				</SortableContext>
			</DndContext>
		</InputWrapper>
	);
};
