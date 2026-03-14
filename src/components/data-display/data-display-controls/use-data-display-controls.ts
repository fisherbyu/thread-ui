'use client';

import { useFilterControls } from '../filter-controls';
import { useSortControls } from '../sort-controls';
import { DataDisplayControlsConfig, DataDisplayControlsData } from './data-display-controls.types';

/**
 * Composes `useFilterControls` and `useSortControls` into a single hook.
 * Sorting is applied after filtering, and sort fields are automatically narrowed
 * to fields with more than one unique value in the filtered dataset.
 *
 * @example
 * const { refinedData, dataDisplayControlsProps } = useDataDisplayControls({
 *   data: products,
 *   fields: [{ key: 'category', label: 'Category' }, { key: 'price', label: 'Price' }],
 *   filterMode: 'or',
 *   multiSort: true,
 * });
 *
 * return (
 *   <>
 *     <DataDisplayControls {...dataDisplayControlsProps} />
 *     <ProductList data={refinedData} />
 *   </>
 * );
 */
export const useDataDisplayControls = <T>({
	data,
	defaultSort,
	defaultFilters,
	filterMode,
	multiSort,
	fields,
}: DataDisplayControlsConfig<T>): DataDisplayControlsData<T> => {
	const {
		filteredData,
		clearAllFilters,
		clearFilter,
		filterControlsProps,
		activeFilters,
		toggleFilter,
	} = useFilterControls<T>({
		data,
		fields,
		filterMode,
		defaultFilters,
	});

	const sortFields = filterControlsProps.fields.filter((field) => {
		const unique = new Set(filteredData.map((row) => row[field.key]));
		return unique.size > 1;
	});

	const {
		sortedData: refinedData,
		activeSort,
		clearSort,
		toggleSort,
		sortControlsProps,
	} = useSortControls({
		data: filteredData,
		fields: sortFields,
		defaultSort,
		multiSort,
	});

	const onClearAll = () => {
		clearAllFilters();
		clearSort();
	};

	return {
		refinedData,
		dataDisplayControlsProps: {
			fields: filterControlsProps.fields,
			sortFields,
			activeSort,
			activeFilters,
			isDefault: filterControlsProps.isDefault && sortControlsProps.isDefault,
			isActive: filterControlsProps.isActive,
			onClearAll,
			onToggleSort: toggleSort,
			onToggleFilter: toggleFilter,
			onClearFilter: clearFilter,
		},
	};
};
