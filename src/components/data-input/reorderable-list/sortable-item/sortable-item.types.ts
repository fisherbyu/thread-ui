import type { ComponentType, ReactNode } from 'react';

/** Minimum shape required for items rendered in a `ReorderableList`. */
export type ReorderableItem = { id: string | number };

/** Callback an item uses to report its own updated data. */
export type ReorderableItemChangeHandler<T> = (item: T) => void;

/** Props passed to the consumer-provided `ItemComponent`. */
export type ReorderableItemProps<T> = {
	item: T;
	/** Pre-wired drag handle. Render it wherever the item should be grabbed. */
	dragHandle: ReactNode;
	/** Report changes to this item back to the list. */
	onItemChange: ReorderableItemChangeHandler<T>;
	/** `true` while this item is being dragged. */
	isDragging: boolean;
};

/** Component used to render each item in a `ReorderableList`. */
export type ReorderableItemComponent<T> = ComponentType<ReorderableItemProps<T>>;

/** Props for the internal `SortableItem` wrapper. */
export type SortableItemProps<T extends ReorderableItem> = {
	item: T;
	/** Human-readable name used in the drag handle's `aria-label`. */
	label: string;
	ItemComponent: ReorderableItemComponent<T>;
	onItemChange: ReorderableItemChangeHandler<T>;
};
