'use client';
import { useState, useMemo } from 'react';
import type {
	FilterControlsConfig,
	FilterControlsData,
	ActiveFilter,
	ResolvedFilterField,
} from './filter-controls.types';

export const useFilterControls = <T>({
	data,
	fields,
	mode = 'and',
}: FilterControlsConfig<T>): FilterControlsData<T> => {
	const [activeFilters, setActiveFilters] = useState<ActiveFilter<T>[]>([]);

	const resolvedFields = useMemo<ResolvedFilterField<T>[]>(
		() =>
			fields.map((field) => {
				if (field.options) return field as ResolvedFilterField<T>;
				const unique = [...new Set(data.map((row) => row[field.key]))];
				const options = unique
					.map((value) => ({ value, label: String(value) }))
					.sort((a, b) => a.label.localeCompare(b.label));
				return { ...field, options };
			}),
		[data, fields]
	);

	const toggleFilter = (key: keyof T, value: T[keyof T]) => {
		setActiveFilters((prev) => {
			const existing = prev.find((f) => f.key === key);
			if (!existing) {
				return [...prev, { key, values: [value] }];
			}
			const hasValue = existing.values.includes(value);
			if (hasValue) {
				const nextValues = existing.values.filter((v) => v !== value);
				// remove the filter entry entirely if no values remain
				if (nextValues.length === 0) return prev.filter((f) => f.key !== key);
				return prev.map((f) => (f.key === key ? { ...f, values: nextValues } : f));
			}
			return prev.map((f) => (f.key === key ? { ...f, values: [...f.values, value] } : f));
		});
	};

	const clearFilter = (key: keyof T) =>
		setActiveFilters((prev) => prev.filter((f) => f.key !== key));

	const clearAllFilters = () => setActiveFilters([]);

	const filteredData = useMemo(() => {
		if (activeFilters.length === 0) return data;
		return data.filter((row) => {
			if (mode === 'and') {
				return activeFilters.every((f) => f.values.includes(row[f.key]));
			}
			return activeFilters.some((f) => f.values.includes(row[f.key]));
		});
	}, [data, activeFilters, mode]);

	return {
		filteredData,
		activeFilters,
		toggleFilter,
		clearFilter,
		clearAllFilters,
		filterControlsProps: {
			fields: resolvedFields,
			activeFilters,
			onToggle: toggleFilter,
			onClear: clearFilter,
			onClearAll: clearAllFilters,
		},
	};
};
