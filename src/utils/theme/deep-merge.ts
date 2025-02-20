// Merge Partial Type
export type DeepPartial<T> = {
	[P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
};

// Function with ability to merge two objects together
export const deepMerge = <T extends Record<string, any>>(target: T, source: DeepPartial<T>): T => {
	const result = { ...target };

	for (const key in source) {
		if (!(key in source)) continue;

		const sourceValue = source[key];
		const targetValue = target[key];

		if (sourceValue === null || sourceValue === undefined) {
			continue;
		}

		if (
			targetValue &&
			typeof sourceValue === 'object' &&
			typeof targetValue === 'object' &&
			!Array.isArray(sourceValue) &&
			!Array.isArray(targetValue)
		) {
			result[key] = deepMerge(targetValue, sourceValue) as T[typeof key];
		} else {
			result[key] = sourceValue as T[typeof key];
		}
	}

	return result;
};
