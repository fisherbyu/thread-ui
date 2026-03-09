import { IconNames } from '@/components/ui';
import { UtilityColorOptions, UtilitySizeOptions } from '@/types';

export type FilterOption<V> = {
	value: V;
	label: string;
};

export type FilterField<T> = {
	key: keyof T;
	label: string;
	icon?: IconNames;
	color?: UtilityColorOptions;
	options?: FilterOption<T[keyof T]>[];
};

export type ResolvedFilterField<T> = Omit<FilterField<T>, 'options'> & {
	options: FilterOption<T[keyof T]>[];
};

export type ActiveFilter<T> = {
	key: keyof T;
	values: T[keyof T][];
};

export type FilterControlsConfig<T> = {
	data: T[];
	fields: FilterField<T>[];
	defaultFilters?: ActiveFilter<T>[];
	mode?: 'and' | 'or';
};

export type FilterControlsData<T> = {
	filteredData: T[];
	activeFilters: ActiveFilter<T>[];
	toggleFilter: (key: keyof T, value: T[keyof T]) => void;
	clearFilter: (key: keyof T) => void;
	clearAllFilters: () => void;
	filterControlsProps: FilterControlsProps<T>;
};

export type FilterControlsProps<T> = {
	size?: UtilitySizeOptions;
	color?: UtilityColorOptions;
	fields: ResolvedFilterField<T>[];
	activeFilters: ActiveFilter<T>[];
	isDefault?: boolean;
	onToggle: (key: keyof T, value: T[keyof T]) => void;
	onClear: (key: keyof T) => void;
	onClearAll: () => void;
};
