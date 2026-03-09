'use client';
import { useState, useMemo } from 'react';
import type {
	SortControlsConfig,
	SortControlsData,
	ActiveSort,
	SortDirection,
} from './sort-controls.types';

export const useSortControls = <T>({
	data,
	fields,
	multi = false,
	defaultSort,
}: SortControlsConfig<T>): SortControlsData<T> => {
	const [activeSort, setActiveSort] = useState<ActiveSort<T>[]>(defaultSort ?? []);

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

	const clearSort = () => setActiveSort(defaultSort ?? []);

	const sortedData = useMemo(() => {
		if (activeSort.length === 0) return data;
		return [...data].sort((a, b) => {
			for (const { key, direction } of activeSort) {
				const aVal = a[key];
				const bVal = b[key];
				const dir = direction === 'asc' ? 1 : -1;

				const field = fields.find((f) => f.key === key);
				const { sortOrder } = field ?? {};

				let cmp = 0;
				if (typeof sortOrder === 'function') {
					cmp = sortOrder(aVal, bVal);
				} else if (Array.isArray(sortOrder)) {
					const aIdx = sortOrder.indexOf(aVal);
					const bIdx = sortOrder.indexOf(bVal);
					// unknowns sort to the end
					const aNorm = aIdx === -1 ? Infinity : aIdx;
					const bNorm = bIdx === -1 ? Infinity : bIdx;
					cmp = aNorm - bNorm;
				} else {
					cmp = aVal < bVal ? -1 : aVal > bVal ? 1 : 0;
				}

				if (cmp !== 0) return cmp * dir;
			}
			return 0;
		});
	}, [data, activeSort, fields]);

	return {
		sortedData,
		activeSort,
		toggleSort,
		clearSort,
		sortControlsProps: { fields, activeSort, onToggle: toggleSort, onClear: clearSort },
	};
};
