import { IconNames } from '@/components/ui';
import { UtilityColorOptions, UtilitySizeOptions } from '@/types';

/** A single selectable option within a filter field */
export type FilterOption<V> = {
	value: V;
	label: string;
};

/** Configuration for a single filterable field */
export type FilterField<T> = {
	/** Key of the data object this field filters on */
	key: keyof T;
	/** Display label for the filter */
	label: string;
	/** Optional icon displayed in the filter control */
	icon?: IconNames;
	/** Optional color accent for the filter control */
	color?: UtilityColorOptions;
	/** Customize options for this field (order or display label). If omitted, options are derived from the data */
	filterOptions?: (string | { label: string; value: T[keyof T] })[];
};

/** `FilterField` with `options` guaranteed to be present after resolution */
export type ResolvedFilterField<T> = Omit<FilterField<T>, 'options'> & {
	options: FilterOption<T[keyof T]>[];
};

/** A currently active filter with one or more selected values */
export type ActiveFilter<T> = {
	/** The field being filtered */
	key: keyof T;
	/** Currently selected values for this field */
	values: T[keyof T][];
};

/** Configuration passed to `useFilterControls` to set up filtering behavior */
export type FilterControlsConfig<T> = {
	/** Dataset to filter */
	data: T[];
	/** Fields available for filtering */
	fields: FilterField<T>[];
	/** Filters applied on initial render */
	defaultFilters?: ActiveFilter<T>[];
	/** Whether multiple active filters combine with AND or OR logic @default `'and'` */
	filtermode?: 'and' | 'or';
};

/** Return value of `useFilterControls` — filtered data plus props to pass to `FilterControls` */
export type FilterControlsData<T> = {
	/** The dataset after all active filters are applied */
	filteredData: T[];
	/** Currently active filters */
	activeFilters: ActiveFilter<T>[];
	/** Toggles a single value on or off for a given field */
	toggleFilter: (key: keyof T, value: T[keyof T]) => void;
	/** Clears all selected values for a given field */
	clearFilter: (key: keyof T) => void;
	/** Clears all active filters across all fields */
	clearAllFilters: () => void;
	/** Pre-assembled props to spread directly onto `FilterControls` */
	filterControlsProps: FilterControlsBaseProps<T>;
};

export type FilterControlsBaseProps<T> = {
	/** Size variant for the filter controls @default `'sm'` */
	size?: UtilitySizeOptions;
	/** Color accent applied to the controls */
	color?: UtilityColorOptions;
	/** Resolved filter fields with guaranteed options */
	fields: ResolvedFilterField<T>[];
	/** Currently active filters */
	activeFilters: ActiveFilter<T>[];
	/** Hides the reset button when true, indicating filters are in their default state */
	isDefault?: boolean;
	/** Called when a filter value is toggled */
	onToggle: (key: keyof T, value: T[keyof T]) => void;
	/** Called when all values for a field are cleared */
	onClear: (key: keyof T) => void;
	/** Called when all active filters are cleared */
	onClearAll: () => void;
	/** Checks whether a specific value is active for a given field */
	isActive: (key: keyof T, value: T[keyof T]) => boolean;
	/** Optionally hide button to reset filters */
	hideReset?: boolean;
};

export type FilterControlsProps<T> = FilterControlsBaseProps<T>;

export type InlineFilterControlsProps<T> = FilterControlsBaseProps<T> & {
	/** Determines where field Title is displayed */
	fieldTitleDisplay?: 'none' | 'inline' | 'block';
};
