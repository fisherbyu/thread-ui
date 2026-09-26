'use client';
import { useCallback, useId, useMemo } from 'react';
import {
	DndContext,
	KeyboardSensor,
	PointerSensor,
	useSensor,
	useSensors,
	type Announcements,
	type UniqueIdentifier,
} from '@dnd-kit/core';
import { SortableContext } from '@dnd-kit/sortable';
import { css } from '@/styled-system/css';
import { InputWrapper } from '../../shared/input-wrapper';
import {
	SortableItem,
	applyOrder,
	defaultGetItemLabel,
	layoutRecipe,
	layoutStrategies,
	screenReaderInstructions,
	serializeReorderableGroups,
	type ReorderableItem,
} from '../shared';
import { useLatestRef } from '@/internal';
import { GroupTitle } from './group-title';
import { SortableGroup } from './sortable-group';
import {
	defaultGetGroupLabel,
	findGroupIndex,
	groupKey,
	itemKey,
	itemsOf,
	nodeKind,
	withItems,
} from './group-utils';
import { useGroupDrag } from './use-group-drag';
import type {
	GroupItem,
	ReorderableGroup,
	ReorderableGroupsProps,
} from './reorderable-groups.types';

const styles = {
	root: css({
		width: '100%',
	}),
	columns: css({
		display: 'grid',
		gridTemplateColumns: 'max-content minmax(0, 1fr)',
		columnGap: '2',
		width: '100%',
	}),
};

/**
 * Controlled input of titled groups whose items can be reordered within a group and moved between groups by pointer, touch, or keyboard. Groups can be reordered too unless `sortableGroups` is `false`. Set `name` to submit the structure as JSON.
 *
 * @example
 * const [tiers, setTiers] = useState(initialTiers);
 *
 * <ReorderableGroups
 *     name="tiers"
 *     title="Tier List"
 *     value={tiers}
 *     onChange={setTiers}
 *     ItemComponent={TierTile}
 *     titlePosition="start"
 *     sortableGroups={false}
 * />
 */
export const ReorderableGroups = <G extends ReorderableGroup>({
	value,
	orderProperty,
	ItemComponent,
	onChange,
	getItemLabel = defaultGetItemLabel,
	getGroupLabel = defaultGetGroupLabel,
	GroupTitleComponent = GroupTitle,
	titlePosition = 'top',
	sortableGroups = true,
	layout = 'grid',
	groupLayout = 'vertical',
	ItemsWrapper,
	GroupsWrapper,
	name,
	id: idProp,
	title,
	size = 'md',
	divider,
	secondaryContent,
}: ReorderableGroupsProps<G>) => {
	// Resolve Id
	const generatedId = useId();
	const inputId = idProp ?? name ?? generatedId;

	// Latest value, so delayed item callbacks never act on stale groups
	const valueRef = useLatestRef(value);

	// Drag State
	const {
		groups,
		collisionDetection,
		keyboardCoordinates,
		onDragStart,
		onDragOver,
		onDragEnd,
		onDragCancel,
	} = useGroupDrag({
		value,
		onChange,
		orderProperty,
		layout,
		groupLayout,
	});

	// Configure sensors for mouse, touch, and keyboard interactions
	const sensors = useSensors(
		useSensor(PointerSensor, {
			activationConstraint: { distance: 4 },
		}),
		useSensor(KeyboardSensor, {
			coordinateGetter: keyboardCoordinates,
		})
	);

	// Group keys in display order
	const groupKeys = useMemo(() => groups.map((group) => groupKey(group.id)), [groups]);

	// Screen reader announcements
	const announcements = useMemo<Announcements>(() => {
		const name = (key: UniqueIdentifier) => {
			const groupIndex = findGroupIndex(groups, key);
			if (groupIndex === -1) return 'Item';
			const group = groups[groupIndex];
			if (nodeKind(key) !== 'item') return getGroupLabel(group, groupIndex);
			const items = itemsOf(group);
			const itemIndex = items.findIndex((item) => itemKey(item.id) === key);
			return getItemLabel(items[itemIndex], itemIndex);
		};

		const target = (key: UniqueIdentifier) => {
			const groupIndex = findGroupIndex(groups, key);
			if (groupIndex === -1) return 'no valid position';
			const group = groups[groupIndex];
			const kind = nodeKind(key);
			if (kind === 'group') return `position ${groupIndex + 1} of ${groups.length}`;
			if (kind === 'container') return getGroupLabel(group, groupIndex);
			const itemIndex = group.items.findIndex((item) => itemKey(item.id) === key);
			return `${getGroupLabel(group, groupIndex)}, position ${itemIndex + 1} of ${group.items.length}`;
		};

		return {
			onDragStart: ({ active }) => `Picked up ${name(active.id)}, at ${target(active.id)}.`,
			onDragOver: ({ active, over }) =>
				over
					? `${name(active.id)} moved to ${target(over.id)}.`
					: `${name(active.id)} is not over a valid position.`,
			onDragEnd: ({ active, over }) =>
				over
					? `${name(active.id)} dropped at ${target(over.id)}.`
					: `${name(active.id)} dropped.`,
			onDragCancel: ({ active }) =>
				`Moving cancelled. ${name(active.id)} returned to its original position.`,
		};
	}, [groups, getItemLabel, getGroupLabel]);

	// Handle Item Change with memoized callback
	const handleItemChange = useCallback(
		(updatedItem: GroupItem<G>) => {
			const current = valueRef.current;

			// Find the group holding the item
			const groupIndex = current.findIndex((group) =>
				group.items.some((item) => item.id === updatedItem.id)
			);
			if (groupIndex === -1) return;

			// Replace the item within its group
			const next = [...current];
			next[groupIndex] = withItems(
				current[groupIndex],
				itemsOf(current[groupIndex]).map((item) =>
					item.id === updatedItem.id ? updatedItem : item
				)
			);

			// Notify parent component
			onChange(next);
		},
		[onChange, valueRef]
	);

	// Handle Item Remove with memoized callback
	const handleItemRemove = useCallback(
		(itemId: ReorderableItem['id']) => {
			const current = valueRef.current;

			// Find the group holding the item
			const groupIndex = current.findIndex((group) =>
				group.items.some((item) => item.id === itemId)
			);
			if (groupIndex === -1) return;

			// Drop the item and re-index its group
			const remaining = itemsOf(current[groupIndex]).filter((item) => item.id !== itemId);
			const next = [...current];
			next[groupIndex] = withItems(current[groupIndex], applyOrder(remaining, orderProperty));

			// Notify parent component
			onChange(next);
		},
		[onChange, orderProperty, valueRef]
	);

	// Title column alignment only applies to the default vertical groups container
	const subgrid = titlePosition === 'start' && groupLayout === 'vertical' && !GroupsWrapper;

	const renderedGroups = groups.map((group, groupIndex) => {
		const items = itemsOf(group);
		return (
			<SortableGroup
				key={group.id}
				group={group}
				label={getGroupLabel(group, groupIndex)}
				itemKeys={items.map((item) => itemKey(item.id))}
				sortable={sortableGroups}
				titlePosition={titlePosition}
				subgrid={subgrid}
				layout={layout}
				size={size}
				GroupTitleComponent={GroupTitleComponent}
				ItemsWrapper={ItemsWrapper}
			>
				{items.map((item, itemIndex) => (
					<SortableItem
						key={item.id}
						sortableId={itemKey(item.id)}
						item={item}
						label={getItemLabel(item, itemIndex)}
						ItemComponent={ItemComponent}
						onItemChange={handleItemChange}
						onItemRemove={handleItemRemove}
					/>
				))}
			</SortableGroup>
		);
	});

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
				collisionDetection={collisionDetection}
				onDragStart={onDragStart}
				onDragOver={onDragOver}
				onDragEnd={onDragEnd}
				onDragCancel={onDragCancel}
				accessibility={{ announcements, screenReaderInstructions }}
			>
				<SortableContext items={groupKeys} strategy={layoutStrategies[groupLayout]}>
					<div
						id={inputId}
						role="group"
						aria-labelledby={title ? `${inputId}-label` : undefined}
						className={styles.root}
					>
						{GroupsWrapper ? (
							<GroupsWrapper>{renderedGroups}</GroupsWrapper>
						) : (
							<div
								className={
									subgrid ? styles.columns : layoutRecipe({ layout: groupLayout })
								}
							>
								{renderedGroups}
							</div>
						)}

						{/* Form Participation */}
						{name && (
							<input
								type="hidden"
								name={name}
								value={serializeReorderableGroups(value)}
							/>
						)}
					</div>
				</SortableContext>
			</DndContext>
		</InputWrapper>
	);
};
