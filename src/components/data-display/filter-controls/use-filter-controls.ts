'use client';
import { useState, useMemo } from 'react';
import type {
	FilterControlsConfig,
	FilterControlsData,
	ActiveFilter,
	ResolvedFilterField,
} from './filter-controls.types';

/**
 * Manages filter state for a dataset and returns filtered data alongside
 * pre-assembled props for `FilterControls`.
 *
 * Options for each field are derived automatically from the data if not provided.
 * Supports AND and OR filter logic across multiple active fields.
 *
 * @example
 * const { filteredData, filterControlsProps } = useFilterControls({
 *   data: products,
 *   fields: [{ key: 'category', label: 'Category' }],
 *   mode: 'or',
 * });
 *
 * return (
 *   <>
 *     <FilterControls {...filterControlsProps} />
 *     <ProductList data={filteredData} />
 *   </>
 * );
 */
export const useFilterControls = <T>({
	data,
	fields,
	defaultFilters,
	mode = 'and',
}: FilterControlsConfig<T>): FilterControlsData<T> => {
	const [activeFilters, setActiveFilters] = useState<ActiveFilter<T>[]>(defaultFilters ?? []);

	const resolvedFields = useMemo<ResolvedFilterField<T>[]>(
		() =>
			fields.map((field) => {
				if (field.options) {
					const options = field.options.map((o) =>
						typeof o === 'string' ? { value: o as T[keyof T], label: o } : o
					);
					return { ...field, options };
				}
				const unique = [...new Set(data.map((row) => row[field.key]))];
				const options = unique
					.map((value) => ({ value, label: String(value) }))
					.sort((a, b) => a.label.localeCompare(b.label));
				return { ...field, options };
			}),
		[data, fields]
	);

	const isDefault = useMemo(() => {
		if (!defaultFilters) return activeFilters.length === 0;
		if (activeFilters.length !== defaultFilters.length) return false; // was comparing activeFilters.length to itself
		return activeFilters.every(
			(f, i) =>
				f.key === defaultFilters[i].key &&
				f.values.length === defaultFilters[i].values.length &&
				f.values.every((v) => defaultFilters[i].values.includes(v))
		);
	}, [activeFilters, defaultFilters]);

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

	const clearAllFilters = () => setActiveFilters(defaultFilters ?? []);

	const filteredData = useMemo(() => {
		if (activeFilters.length === 0) return data;
		return data.filter((row) => {
			if (mode === 'and') {
				return activeFilters.every((f) => f.values.includes(row[f.key]));
			}
			return activeFilters.some((f) => f.values.includes(row[f.key]));
		});
	}, [data, activeFilters, mode]);

	const activeSet = useMemo(() => {
		const set = new Set<string>();
		activeFilters.forEach((f) =>
			f.values.forEach((v) => set.add(`${String(f.key)}:${String(v)}`))
		);
		return set;
	}, [activeFilters]);

	const isActive = (key: keyof T, value: T[keyof T]): boolean =>
		activeSet.has(`${String(key)}:${String(value)}`);

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
			isDefault,
			isActive,
		},
	};
};
