import type { UniqueIdentifier } from '@dnd-kit/core';
import type { ReorderableItem } from '../shared';
import type { GroupItem, ReorderableGroup } from './reorderable-groups.types';

/** Kind of dnd-kit node, encoded as the key prefix. */
export type NodeKind = 'group' | 'item' | 'container';

// Namespaced dnd-kit keys so group and item ids never collide
export const groupKey = (id: ReorderableItem['id']) => `group:${id}`;
export const itemKey = (id: ReorderableItem['id']) => `item:${id}`;
export const containerKey = (id: ReorderableItem['id']) => `container:${id}`;
export const nodeKind = (key: UniqueIdentifier) => String(key).split(':', 1)[0] as NodeKind;

// Typed item access for a generic group
export const itemsOf = <G extends ReorderableGroup>(group: G) => group.items as GroupItem<G>[];
export const withItems = <G extends ReorderableGroup>(group: G, items: GroupItem<G>[]): G => ({
	...group,
	items,
});

// Index of the group holding the node `key` points at
export const findGroupIndex = <G extends ReorderableGroup>(groups: G[], key: UniqueIdentifier) => {
	switch (nodeKind(key)) {
		case 'item':
			return groups.findIndex((group) =>
				group.items.some((item) => itemKey(item.id) === key)
			);
		case 'container':
			return groups.findIndex((group) => containerKey(group.id) === key);
		case 'group':
			return groups.findIndex((group) => groupKey(group.id) === key);
		default:
			return -1;
	}
};

export const defaultGetGroupLabel = (group: ReorderableGroup, index: number) =>
	typeof group.title === 'string' ? group.title : `Group ${index + 1}`;
