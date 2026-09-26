'use client';
import { useCallback, useEffect, useRef, useState } from 'react';
import {
	closestCenter,
	pointerWithin,
	rectIntersection,
	type CollisionDetection,
	type DragEndEvent,
	type DragOverEvent,
	type DragStartEvent,
	type KeyboardCoordinateGetter,
	type UniqueIdentifier,
} from '@dnd-kit/core';
import { arrayMove, sortableKeyboardCoordinates } from '@dnd-kit/sortable';
import { useLatestRef } from '@/internal';
import { applyOrder, type NumericKeys, type ReorderableLayout } from '../shared';
import { containerKey, findGroupIndex, itemKey, itemsOf, nodeKind, withItems } from './group-utils';
import type {
	GroupItem,
	ReorderableGroup,
	ReorderableGroupsProps,
} from './reorderable-groups.types';

/** Options for `useGroupDrag`. */
type UseGroupDragOptions<G extends ReorderableGroup> = {
	value: G[];
	onChange: ReorderableGroupsProps<G>['onChange'];
	orderProperty?: NumericKeys<GroupItem<G>>;
	/** Item arrangement within a group; decides whether arrow keys sort or cross groups */
	layout: ReorderableLayout;
	/** Group arrangement; its axis is the one arrow keys cross groups on */
	groupLayout: ReorderableLayout;
};

// Re-index items within every group
const orderAll = <G extends ReorderableGroup>(
	groups: G[],
	orderProperty?: NumericKeys<GroupItem<G>>
) =>
	orderProperty
		? groups.map((group) => withItems(group, applyOrder(itemsOf(group), orderProperty)))
		: groups;

/**
 * Drag state for `ReorderableGroups`. Holds a draft copy of `value` while an item is dragged so it can jump between groups mid-drag, commits once on drop, and discards on cancel. Also provides multi-container collision detection and a keyboard coordinate getter that can move items into empty groups.
 *
 * @example
 * const { groups, collisionDetection, keyboardCoordinates, onDragStart, onDragOver, onDragEnd, onDragCancel } =
 *     useGroupDrag({ value, onChange, orderProperty, layout, groupLayout });
 */
export const useGroupDrag = <G extends ReorderableGroup>({
	value,
	onChange,
	orderProperty,
	layout,
	groupLayout,
}: UseGroupDragOptions<G>) => {
	// Drag-time copy of `value`; `null` when idle
	const [draft, setDraft] = useState<G[] | null>(null);
	const draftRef = useRef<G[] | null>(null);
	const valueRef = useLatestRef(value);

	// Collision bookkeeping for cross-group moves
	const lastOverKey = useRef<UniqueIdentifier | null>(null);
	const movedToNewGroup = useRef(false);

	const updateDraft = useCallback((next: G[] | null) => {
		draftRef.current = next;
		setDraft(next);
	}, []);

	const reset = useCallback(() => {
		updateDraft(null);
		lastOverKey.current = null;
	}, [updateDraft]);

	// Layout settles one frame after a cross-group move
	useEffect(() => {
		const frame = requestAnimationFrame(() => {
			movedToNewGroup.current = false;
		});
		return () => cancelAnimationFrame(frame);
	}, [draft]);

	// Groups to render: the draft while dragging an item, `value` otherwise
	const groups = draft ?? value;

	const collisionDetection: CollisionDetection = useCallback(
		(args) => {
			// Groups only collide with other groups
			if (nodeKind(args.active.id) === 'group') {
				return closestCenter({
					...args,
					droppableContainers: args.droppableContainers.filter(
						(container) => nodeKind(container.id) === 'group'
					),
				});
			}

			// Items collide with items and drop zones, never whole groups
			const droppableContainers = args.droppableContainers.filter(
				(container) => nodeKind(container.id) !== 'group'
			);
			const scoped = { ...args, droppableContainers };
			const pointerHits = pointerWithin(scoped);
			const hits = pointerHits.length > 0 ? pointerHits : rectIntersection(scoped);
			let overKey = (hits.find((hit) => nodeKind(hit.id) === 'item') ?? hits[0])?.id;

			if (overKey != null) {
				// Over a drop zone with items: target the closest item inside it
				if (nodeKind(overKey) === 'container') {
					const current = draftRef.current ?? valueRef.current;
					const group = current.find(
						(candidate) => containerKey(candidate.id) === overKey
					);
					const keys = new Set(group?.items.map((item) => itemKey(item.id)));
					if (keys.size > 0) {
						const closest = closestCenter({
							...args,
							droppableContainers: droppableContainers.filter((container) =>
								keys.has(String(container.id))
							),
						});
						overKey = closest[0]?.id ?? overKey;
					}
				}
				lastOverKey.current = overKey;
				return [{ id: overKey }];
			}

			// Layout shifted after a cross-group move: hold position until it settles
			if (movedToNewGroup.current) {
				lastOverKey.current = args.active.id;
			}

			return lastOverKey.current ? [{ id: lastOverKey.current }] : [];
		},
		[valueRef]
	);

	// Arrow keys along the group axis move items between groups; everything else sorts within a group
	const keyboardCoordinates: KeyboardCoordinateGetter = useCallback(
		(event, args) => {
			const { active, droppableRects } = args.context;
			const groupAxis = groupLayout === 'horizontal' ? 'x' : 'y';
			const forwardKey = groupAxis === 'y' ? 'ArrowDown' : 'ArrowRight';
			const backKey = groupAxis === 'y' ? 'ArrowUp' : 'ArrowLeft';
			const direction = event.code === forwardKey ? 1 : event.code === backKey ? -1 : 0;

			if (!active || direction === 0 || nodeKind(active.id) !== 'item') {
				return sortableKeyboardCoordinates(event, args);
			}

			const current = draftRef.current ?? valueRef.current;
			const fromGroup = findGroupIndex(current, active.id);
			if (fromGroup === -1) return sortableKeyboardCoordinates(event, args);

			// Items share the group axis: only cross from the first or last item
			const itemAxis = layout === 'vertical' ? 'y' : 'x';
			if (itemAxis === groupAxis) {
				const items = current[fromGroup].items;
				const index = items.findIndex((item) => itemKey(item.id) === active.id);
				const atEdge = direction === 1 ? index === items.length - 1 : index === 0;
				if (!atEdge) return sortableKeyboardCoordinates(event, args);
			}

			event.preventDefault();

			// Jump into the adjacent group's drop zone, empty or not
			const toGroup = current[fromGroup + direction];
			if (!toGroup) return undefined;

			const rect = droppableRects.get(containerKey(toGroup.id));
			return rect ? { x: rect.left, y: rect.top } : undefined;
		},
		[layout, groupLayout, valueRef]
	);

	const onDragStart = useCallback(
		({ active }: DragStartEvent) => {
			if (nodeKind(active.id) === 'item') {
				updateDraft(valueRef.current);
			}
		},
		[updateDraft, valueRef]
	);

	const onDragOver = useCallback(
		({ active, over }: DragOverEvent) => {
			const current = draftRef.current;
			if (!current || !over || nodeKind(active.id) !== 'item') return;

			// Only cross-group moves happen mid-drag; in-group sorting is visual until drop
			const fromGroup = findGroupIndex(current, active.id);
			const toGroup = findGroupIndex(current, over.id);
			if (fromGroup === -1 || toGroup === -1 || fromGroup === toGroup) return;

			const fromItems = itemsOf(current[fromGroup]);
			const toItems = itemsOf(current[toGroup]);
			const activeIndex = fromItems.findIndex((item) => itemKey(item.id) === active.id);
			if (activeIndex === -1) return;

			// Insert before the hovered item, or at the end when over the drop zone
			const overIndex = toItems.findIndex((item) => itemKey(item.id) === over.id);
			const insertAt = overIndex === -1 ? toItems.length : overIndex;

			const next = [...current];
			next[fromGroup] = withItems(
				current[fromGroup],
				fromItems.filter((_, index) => index !== activeIndex)
			);
			next[toGroup] = withItems(current[toGroup], [
				...toItems.slice(0, insertAt),
				fromItems[activeIndex],
				...toItems.slice(insertAt),
			]);

			movedToNewGroup.current = true;
			updateDraft(next);
		},
		[updateDraft]
	);

	const onDragEnd = useCallback(
		({ active, over }: DragEndEvent) => {
			const current = draftRef.current ?? valueRef.current;
			reset();

			// Dropped outside any target: discard the draft
			if (!over) return;

			// Group reorder
			if (nodeKind(active.id) === 'group') {
				const fromIndex = findGroupIndex(current, active.id);
				const toIndex = findGroupIndex(current, over.id);
				if (fromIndex !== -1 && toIndex !== -1 && fromIndex !== toIndex) {
					onChange(arrayMove(current, fromIndex, toIndex));
				}
				return;
			}

			// Item: settle its final position within its (possibly new) group
			const groupIndex = findGroupIndex(current, active.id);
			if (groupIndex === -1) return;

			const items = itemsOf(current[groupIndex]);
			const fromIndex = items.findIndex((item) => itemKey(item.id) === active.id);
			const overIndex = items.findIndex((item) => itemKey(item.id) === over.id);

			let next = current;
			if (overIndex !== -1 && overIndex !== fromIndex) {
				next = [...current];
				next[groupIndex] = withItems(
					current[groupIndex],
					arrayMove(items, fromIndex, overIndex)
				);
			}

			// Nothing moved
			if (next === valueRef.current) return;

			onChange(orderAll(next, orderProperty));
		},
		[onChange, orderProperty, reset, valueRef]
	);

	return {
		groups,
		collisionDetection,
		keyboardCoordinates,
		onDragStart,
		onDragOver,
		onDragEnd,
		onDragCancel: reset,
	};
};
