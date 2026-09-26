import type { ReorderableItem } from './reorderable.types';

/** How a `ReorderableList` submits its order when `name` is set. `'inputs'` renders one hidden input per item; `'json'` renders one hidden input holding a JSON array of ids. */
export type FormValueMode = 'inputs' | 'json';

/** Submitted shape of a `ReorderableGroups` value. */
export type ReorderableGroupsFormValue = {
	groupId: ReorderableItem['id'];
	itemIds: ReorderableItem['id'][];
}[];

const isId = (value: unknown): value is ReorderableItem['id'] =>
	typeof value === 'string' || typeof value === 'number';

const parseJson = (value: FormDataEntryValue | null): unknown => {
	if (typeof value !== 'string' || value === '') {
		throw new Error('Expected a JSON string form value');
	}
	return JSON.parse(value);
};

/**
 * Parses a `ReorderableList` value submitted with `formValue="json"` into item `id`s in order.
 *
 * @throws When the value is missing or isn't a JSON array of ids.
 *
 * @example
 * const ids = parseReorderableValue(formData.get('taskOrder'));
 */
export const parseReorderableValue = (
	value: FormDataEntryValue | null
): ReorderableItem['id'][] => {
	const parsed = parseJson(value);
	if (!Array.isArray(parsed) || !parsed.every(isId)) {
		throw new Error('Expected a JSON array of ids');
	}
	return parsed;
};

/**
 * Parses a submitted `ReorderableGroups` value into groups with their item `id`s in order.
 *
 * @throws When the value is missing or doesn't match `ReorderableGroupsFormValue`.
 *
 * @example
 * const tiers = parseReorderableGroups(formData.get('tiers'));
 */
export const parseReorderableGroups = (
	value: FormDataEntryValue | null
): ReorderableGroupsFormValue => {
	const parsed = parseJson(value);
	const valid =
		Array.isArray(parsed) &&
		parsed.every(
			(group) =>
				typeof group === 'object' &&
				group !== null &&
				isId(group.groupId) &&
				Array.isArray(group.itemIds) &&
				group.itemIds.every(isId)
		);
	if (!valid) {
		throw new Error('Expected a JSON array of { groupId, itemIds }');
	}
	return parsed;
};

// Group structure -> JSON string for the hidden input
export const serializeReorderableGroups = (
	groups: { id: ReorderableItem['id']; items: ReorderableItem[] }[]
): string =>
	JSON.stringify(
		groups.map((group) => ({
			groupId: group.id,
			itemIds: group.items.map((item) => item.id),
		}))
	);
