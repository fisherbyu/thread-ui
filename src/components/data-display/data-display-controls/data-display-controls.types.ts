import { Override, Prettify } from '@/types';
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

/** A field that supports both sorting and filtering */
export type DataField<T> = Prettify<Override<SortField<T> & ResolvedFilterField<T>, {}>>;

/** Configuration passed to `useDataDisplayControls` combining sort and filter config */
export type DataDisplayControlsConfig<T> = Prettify<
	Override<SortControlsConfig<T> & FilterControlsConfig<T>, { fields: DataField<T>[] }>
>;

/** Return value of `useDataDisplayControls` — refined data plus props to pass to `DataDisplayControls` */
export type DataDisplayControlsData<T> = {
	/** Dataset after all active filters and sorts are applied */
	refinedData: T[];
	/** Pre-assembled props to spread directly onto `DataDisplayControls` */
	dataDisplayControlsProps: DataDisplayControlsProps<T>;
};

export type DataDisplayControlsProps<T> = Prettify<
	Omit<
		SortControlsProps<T> & FilterControlsBaseProps<T>,
		'fields' | 'hideReset' | 'onToggle' | 'onClear'
	> & {
		/** Fields for both filtering and sorting */
		fields: DataField<T>[];
		/** Fields available for sorting, derived from fields with more than one unique value in the filtered data */
		sortFields: DataField<T>[];
		/** Called when a sort field is toggled */
		onToggleSort: SortControlsProps<T>['onToggle'];
		/** Called when a filter field is cleared */
		onClearFilter: FilterControlsBaseProps<T>['onClear'];
		/** Called when a filter value is toggled */
		onToggleFilter: FilterControlsBaseProps<T>['onToggle'];
		/** Which filter control variant to render @default `'inline'` */
		filterVariant?: 'standard' | 'inline';
	}
>;
