import type { ComponentType, ReactNode } from 'react';
import type { Prettify } from '@/types';
import type { BaseInputProps, ControlledValueProps } from '../../shared/input-props.types';
import type { FormLabelProps } from '../../shared/form-label';
import type {
	DragHandleProps,
	NumericKeys,
	ReorderableItem,
	ReorderableItemComponent,
	ReorderableLayout,
	ReorderableWrapper,
} from '../shared';

/** A titled group of items in a `ReorderableGroups`. */
export type ReorderableGroup<T extends ReorderableItem = ReorderableItem> = {
	id: string | number;
	/** A `string` renders through the default title; a node renders as-is */
	title: ReactNode;
	items: T[];
};

/** Item type held by a group type. */
export type GroupItem<G extends ReorderableGroup> = G['items'][number];

/** Where each group's title sits relative to its items. */
export type GroupTitlePosition = 'top' | 'start';

/** Props passed to `GroupTitleComponent`. */
export type ReorderableGroupTitleProps<G extends ReorderableGroup> = {
	group: G;
	/** Default drag handle button; `null` when `sortableGroups` is `false` */
	dragHandle: ReactNode;
	/** Spread onto any element to make it the group's drag handle; `undefined` when `sortableGroups` is `false` */
	dragHandleProps?: DragHandleProps;
	/** `true` while this group is being dragged */
	isDragging: boolean;
	size: NonNullable<BaseInputProps['size']>;
};

/** Component used to render each group's title. */
export type ReorderableGroupTitleComponent<G extends ReorderableGroup> = ComponentType<
	ReorderableGroupTitleProps<G>
>;

/** Props for a `ReorderableGroups`, a controlled input whose value is a list of groups, each holding an ordered list of items. */
export type ReorderableGroupsProps<G extends ReorderableGroup> = Prettify<
	{
		/** Groups to render, in display order */
		value: ControlledValueProps<G[], G[]>['value'];
		/** Number property rewritten on each item with its index within its group after a move. Omit to rely on array order alone */
		orderProperty?: NumericKeys<GroupItem<G>>;
		/** Component rendered for each item. Receives the `item`, a default `dragHandle`, spreadable `dragHandleProps`, `onItemChange`, `onItemRemove`, and `isDragging` */
		ItemComponent: ReorderableItemComponent<GroupItem<G>>;
		/** Fires with all groups after an item move, a group reorder, or an item update */
		onChange: ControlledValueProps<G[], G[]>['onChange'];
		/**
		 * Human-readable name for an item, used in screen reader announcements and the drag handle's `aria-label`.
		 * @default `'Item {n}'`
		 */
		getItemLabel?: (item: GroupItem<G>, index: number) => string;
		/**
		 * Human-readable name for a group, used in announcements, the group's `aria-label`, and its drag handle.
		 * @default the `title` when it's a string, otherwise `'Group {n}'`
		 */
		getGroupLabel?: (group: G, index: number) => string;
		/** Renders each group's title @default drag handle followed by the `title` */
		GroupTitleComponent?: ReorderableGroupTitleComponent<G>;
		/** `'start'` places titles beside their items, like a tier table @default `'top'` */
		titlePosition?: GroupTitlePosition;
		/** Allow dragging groups to reorder them. Items still move between groups when `false` @default `true` */
		sortableGroups?: boolean;
		/** Arrangement of items within each group @default `'grid'` */
		layout?: ReorderableLayout;
		/** Arrangement of the groups @default `'vertical'` */
		groupLayout?: ReorderableLayout;
		/** Lays out each group's rendered items. Replaces the default `layout` styles, so pass a `layout` that matches it */
		ItemsWrapper?: ReorderableWrapper;
		/** Lays out the rendered groups. Replaces the default `groupLayout` styles and `titlePosition="start"` column alignment */
		GroupsWrapper?: ReorderableWrapper;
		/** Form field name. Submits one hidden input holding JSON; read it with `parseReorderableGroups` */
		name?: BaseInputProps['name'];
	} & Pick<BaseInputProps, 'id' | 'title' | 'size' | 'divider'> &
		Pick<FormLabelProps, 'secondaryContent'>
>;
