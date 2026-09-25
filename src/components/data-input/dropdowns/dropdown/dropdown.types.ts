import { InputProps } from '../../shared/input-props.types';
import { DropdownSharedProps, DropdownValue } from '../dropdown-base/dropdown-base.types';

/** Props for the single-select `Dropdown`. */
export type DropdownProps<T extends DropdownValue = DropdownValue> = InputProps<
	T | null,
	T | null
> &
	DropdownSharedProps<T>;
