import {
	SortControlsConfig,
	SortField,
	SortControlsProps,
} from '../sort-controls/sort-controls.types';
import {
	FilterControlsConfig,
	ResolvedFilterField,
	FilterControlsBaseProps,
} from '../filter-controls/filter-controls.types';

type Override<T, U> = Omit<T, keyof U> & U;

type Prettify<T> = { [K in keyof T]: T[K] } & {};

export type DataField<T> = Override<SortField<T> & ResolvedFilterField<T>, {}>;

export type DataDisplayControlsConfig<T> = Prettify<
	Override<SortControlsConfig<T> & FilterControlsConfig<T>, { fields: DataField<T>[] }>
>;

export type DataDisplayControlsData<T> = {
	refinedData: T[];
	dataDisplayControlsProps: DataDisplayControlsProps<T>;
};

export type DataDisplayControlsProps<T> = Prettify<
	Omit<
		SortControlsProps<T> & FilterControlsBaseProps<T>,
		'fields' | 'hideReset' | 'onToggle' | 'onClear'
	> & {
		fields: DataField<T>[];
		sortFields: DataField<T>[];
		onToggleSort: SortControlsProps<T>['onToggle'];
		onClearFilter: FilterControlsBaseProps<T>['onClear'];
		onToggleFilter: FilterControlsBaseProps<T>['onToggle'];
		filterVariant?: 'standard' | 'inline';
	}
>;
