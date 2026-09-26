import type { NumericKeys } from '../types/reorderable.types';

// Rewrite `orderProperty` to match array position; unchanged when omitted
export const applyOrder = <T>(items: T[], orderProperty?: NumericKeys<T>): T[] =>
	orderProperty
		? items.map((item, index) => ({
				...item,
				[orderProperty]: index,
			}))
		: items;
