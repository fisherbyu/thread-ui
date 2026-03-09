import { IconNames } from '@/components/ui';
import { UtilityColorOptions, UtilitySizeOptions } from '@/types';

export type SortDirection = 'asc' | 'desc';

export type SortField<T> = {
	key: keyof T;
	label: string;
	icon?: IconNames;
	color?: UtilityColorOptions;
	sortOrder?: T[keyof T][] | ((a: T[keyof T], b: T[keyof T]) => number);
};

export type ActiveSort<T> = {
	key: keyof T;
	direction: SortDirection;
};

export type SortControlsConfig<T> = {
	data: T[];
	fields: SortField<T>[];
	defaultSort?: ActiveSort<T>[];
	multi?: boolean; // allow multi-field sorting
};

export type SortControlsData<T> = {
	sortedData: T[];
	activeSort: ActiveSort<T>[];
	toggleSort: (key: keyof T) => void;
	clearSort: () => void;
	sortControlsProps: SortControlsProps<T>;
};

export type SortControlsProps<T> = {
	size?: UtilitySizeOptions;
	color?: UtilityColorOptions;
	fields: SortField<T>[];
	activeSort: ActiveSort<T>[];
	onToggle: (key: keyof T) => void;
	onClear: () => void;
	isDefault?: boolean;
};
