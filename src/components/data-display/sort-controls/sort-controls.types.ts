import { IconNames } from '@/components/ui';
import { UtilityColorOptions, UtilitySizeOptions } from '@/types';

export type SortDirection = 'asc' | 'desc';

/** Configuration for a single sortable field */
export type SortField<T> = {
	/** Key of the data object this field sorts on */
	key: keyof T;
	/** Display label for the sort button */
	label: string;
	/** Optional icon displayed in the sort button */
	icon?: IconNames;
	/** Optional color accent for the sort button */
	color?: UtilityColorOptions;
	/** Custom sort order. Accepts an explicit value array or a comparator function */
	sortOrder?: T[keyof T][] | ((a: T[keyof T], b: T[keyof T]) => number);
};

/** A currently active sort with a direction */
export type ActiveSort<T> = {
	/** The field being sorted */
	key: keyof T;
	direction: SortDirection;
};

/** Configuration passed to `useSortControls` to set up sorting behavior */
export type SortControlsConfig<T> = {
	/** Dataset to sort */
	data: T[];
	/** Fields available for sorting */
	fields: SortField<T>[];
	/** Sort applied on initial render */
	defaultSort?: ActiveSort<T>[];
	/** Allows multiple fields to be sorted simultaneously @default `false` */
	multi?: boolean;
};

/** Return value of `useSortControls` — sorted data plus props to pass to `SortControls` */
export type SortControlsData<T> = {
	/** The dataset after all active sorts are applied */
	sortedData: T[];
	/** Currently active sorts */
	activeSort: ActiveSort<T>[];
	/** Cycles a field through asc → desc → off */
	toggleSort: (key: keyof T) => void;
	/** Resets all active sorts to `defaultSort` */
	clearSort: () => void;
	/** Pre-assembled props to spread directly onto `SortControls` */
	sortControlsProps: SortControlsProps<T>;
};

export type SortControlsProps<T> = {
	/** Size variant for the sort controls @default `'sm'` */
	size?: UtilitySizeOptions;
	/** Fallback color for sort buttons when a field has no color set @default `'tertiary'` */
	color?: UtilityColorOptions;
	/** Fields available for sorting */
	fields: SortField<T>[];
	/** Currently active sorts */
	activeSort: ActiveSort<T>[];
	/** Called when a sort field button is clicked */
	onToggle: (key: keyof T) => void;
	/** Called when the reset button is clicked */
	onClear: () => void;
	/** Hides the reset button when true, indicating sort is in its default state */
	isDefault?: boolean;
};
