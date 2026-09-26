import type {
	CSSProperties,
	ComponentType,
	KeyboardEventHandler,
	PointerEventHandler,
	ReactNode,
} from 'react';
import type { DraggableAttributes } from '@dnd-kit/core';

/** Minimum shape required for items rendered in a reorderable component. */
export type ReorderableItem = { id: string | number };

/** Keys of `T` whose values are numbers. */
export type NumericKeys<T> = { [K in keyof T]: T[K] extends number ? K : never }[keyof T];

/** Layout and sorting arrangement of items or groups */
export type ReorderableLayout = 'vertical' | 'horizontal' | 'grid';

/** Props passed to a consumer-provided layout wrapper. */
export type ReorderableWrapperProps = { children: ReactNode };

/** Consumer-provided component that lays out rendered items or groups. */
export type ReorderableWrapper = ComponentType<ReorderableWrapperProps>;

/** Props that turn any element into a drag handle. Spread onto the element; merge `style` if you pass your own. */
export type DragHandleProps = DraggableAttributes & {
	ref: (element: HTMLElement | null) => void;
	'aria-label': string;
	/** Sets `touchAction: 'none'` so touch drags don't scroll the page */
	style: CSSProperties;
	onPointerDown?: PointerEventHandler<HTMLElement>;
	onKeyDown?: KeyboardEventHandler<HTMLElement>;
};

/** Callback an item uses to report its own updated data. */
export type ReorderableItemChangeHandler<T> = (item: T) => void;

/** Props passed to the consumer-provided `ItemComponent`. */
export type ReorderableItemProps<T> = {
	item: T;
	/** Default drag handle button. Render it, or spread `dragHandleProps` onto your own element instead. */
	dragHandle: ReactNode;
	/** Spread onto any element to make it the drag handle, e.g. `<img {...dragHandleProps} />` */
	dragHandleProps: DragHandleProps;
	/** Report changes to this item back to the list. */
	onItemChange: ReorderableItemChangeHandler<T>;
	/** Remove this item from the list. Remaining items are re-indexed via `orderProperty`. */
	onItemRemove: () => void;
	/** `true` while this item is being dragged. */
	isDragging: boolean;
};

/** Component used to render each item in a reorderable component. */
export type ReorderableItemComponent<T> = ComponentType<ReorderableItemProps<T>>;
