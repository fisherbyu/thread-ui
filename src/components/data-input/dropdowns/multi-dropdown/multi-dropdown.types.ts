import { InputProps } from '../../shared/input-props.types';
import { DropdownSharedProps, DropdownValue } from '../dropdown-base/dropdown-base.types';

/** Props for `MultiDropdown`. */
export type MultiDropdownProps<T extends DropdownValue = DropdownValue> = InputProps<T[], T[]> &
	DropdownSharedProps<T>;
