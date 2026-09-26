'use client';
import type { KeyboardEventHandler, PointerEventHandler } from 'react';
import type { DraggableAttributes, DraggableSyntheticListeners } from '@dnd-kit/core';
import { cva } from '@/styled-system/css';
import { Icon } from '@/components/ui';
import type { DragHandleProps } from '../types/reorderable.types';

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
			true: { cursor: 'grabbing', color: 'text.secondary', backgroundColor: 'active' },
			false: {},
		},
	},
});

/** Input for `createDragHandleProps`, taken from `useSortable` output. */
type CreateDragHandlePropsInput = {
	attributes: DraggableAttributes;
	listeners: DraggableSyntheticListeners;
	setActivatorNodeRef: (element: HTMLElement | null) => void;
	/** Human-readable name; the handle's `aria-label` becomes `Reorder {label}` */
	label: string;
};

// Listener keys match the pointer and keyboard sensors registered by the reorderable components
export const createDragHandleProps = ({
	attributes,
	listeners,
	setActivatorNodeRef,
	label,
}: CreateDragHandlePropsInput): DragHandleProps => ({
	...attributes,
	onPointerDown: listeners?.onPointerDown as PointerEventHandler<HTMLElement> | undefined,
	onKeyDown: listeners?.onKeyDown as KeyboardEventHandler<HTMLElement> | undefined,
	ref: setActivatorNodeRef,
	'aria-label': `Reorder ${label}`,
	style: { touchAction: 'none' },
});

/** Props for the default `DragHandle` button. */
type DragHandleComponentProps = {
	dragHandleProps: DragHandleProps;
	isDragging: boolean;
};

/**
 * Default drag handle button for reorderable items and groups.
 *
 * @example
 * <DragHandle dragHandleProps={dragHandleProps} isDragging={isDragging} />
 */
export const DragHandle = ({ dragHandleProps, isDragging }: DragHandleComponentProps) => (
	<button
		type="button"
		className={dragHandleRecipe({ dragging: isDragging })}
		{...dragHandleProps}
	>
		<Icon name="DotsSixVertical" size={16} />
	</button>
);
