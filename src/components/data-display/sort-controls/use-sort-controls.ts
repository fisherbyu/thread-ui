'use client';
import { useState, useMemo } from 'react';
import type {
	UseSortOptions,
	SortControlsData,
	ActiveSort,
	SortDirection,
} from './sort-controls.types';

export const useSortControls = <T>({
	data,
	fields,
	multi = false,
}: UseSortOptions<T>): SortControlsData<T> => {
	const [activeSort, setActiveSort] = useState<ActiveSort<T>[]>([]);

	const toggleSort = (key: keyof T) => {
		setActiveSort((prev) => {
			const existing = prev.find((s) => s.key === key);

			if (!existing) {
				const next: ActiveSort<T> = { key, direction: 'asc' };
				return multi ? [...prev, next] : [next];
			}

			if (existing.direction === 'asc') {
				// flip to desc
				return prev.map((s) =>
					s.key === key ? { ...s, direction: 'desc' as SortDirection } : s
				);
			}

			// remove (was desc, now off)
			return prev.filter((s) => s.key !== key);
		});
	};

	const clearSort = () => setActiveSort([]);

	const sortedData = useMemo(() => {
		if (activeSort.length === 0) return data;

		return [...data].sort((a, b) => {
			for (const { key, direction } of activeSort) {
				const aVal = a[key];
				const bVal = b[key];
				const dir = direction === 'asc' ? 1 : -1;

				if (aVal < bVal) return -1 * dir;
				if (aVal > bVal) return 1 * dir;
			}
			return 0;
		});
	}, [data, activeSort]);

	return {
		sortedData,
		activeSort,
		toggleSort,
		clearSort,
		sortControlsProps: { fields, activeSort, onToggle: toggleSort, onClear: clearSort, multi },
	};
};
