import type { Announcements, ScreenReaderInstructions, UniqueIdentifier } from '@dnd-kit/core';

export const screenReaderInstructions: ScreenReaderInstructions = {
	draggable:
		'To pick up an item, press Space or Enter. While dragging, use the arrow keys to move it. Press Space or Enter again to drop it in its new position, or press Escape to cancel.',
};

export const defaultGetItemLabel = (_item: unknown, index: number) => `Item ${index + 1}`;

// Announcements for a single flat list, from ids in display order
export const createListAnnouncements = (
	ids: UniqueIdentifier[],
	getLabel: (id: UniqueIdentifier) => string
): Announcements => {
	const total = ids.length;
	const position = (id: UniqueIdentifier) => ids.indexOf(id) + 1;

	return {
		onDragStart: ({ active }) =>
			`Picked up ${getLabel(active.id)}. Position ${position(active.id)} of ${total}.`,
		onDragOver: ({ active, over }) =>
			over
				? `${getLabel(active.id)} moved to position ${position(over.id)} of ${total}.`
				: `${getLabel(active.id)} is not over a valid position.`,
		onDragEnd: ({ active, over }) =>
			over
				? `${getLabel(active.id)} dropped at position ${position(over.id)} of ${total}.`
				: `${getLabel(active.id)} dropped.`,
		onDragCancel: ({ active }) =>
			`Reordering cancelled. ${getLabel(active.id)} returned to position ${position(active.id)} of ${total}.`,
	};
};
