export type SortDirection = 'asc' | 'desc';

export type SortField<T> = {
	key: keyof T;
	label: string;
};

export type ActiveSort<T> = {
	key: keyof T;
	direction: SortDirection;
};

export type UseSortOptions<T> = {
	data: T[];
	fields: SortField<T>[];
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
	fields: SortField<T>[];
	activeSort: ActiveSort<T>[];
	onToggle: (key: keyof T) => void;
	onClear: () => void;
	multi?: boolean;
};
