import type { UniqueIdentifier } from '@dnd-kit/core';
import type {
	ReorderableItem,
	ReorderableItemChangeHandler,
	ReorderableItemComponent,
} from './reorderable.types';

/** Props for the internal `SortableItem` wrapper. */
export type SortableItemProps<T extends ReorderableItem> = {
	item: T;
	/** Human-readable name used in the drag handle's `aria-label`. */
	label: string;
	ItemComponent: ReorderableItemComponent<T>;
	onItemChange: ReorderableItemChangeHandler<T>;
	/** Remove an item from the list by `id`. */
	onItemRemove: (id: ReorderableItem['id']) => void;
	/** dnd-kit id. The item `id` in a flat list, namespaced in `ReorderableGroups`. */
	sortableId: UniqueIdentifier;
};
