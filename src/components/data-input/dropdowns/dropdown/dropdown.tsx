'use client';
import { DropdownProps } from './dropdown.types';
import { DropdownValue } from '../dropdown-base/dropdown-base.types';
import { DropdownBase } from '../dropdown-base/dropdown-base';

const toArray = <T,>(value: T | null) => (value === null ? [] : [value]);

/**
 * Single-select dropdown with keyboard navigation, outside-click dismissal, and native form participation.
 * Controlled when `value` is passed, uncontrolled otherwise.
 *
 * @example
 * <Dropdown
 *   name="status"
 *   title="Status"
 *   value={status}
 *   options={[{ label: 'Active', value: 'active' }, { label: 'Inactive', value: 'inactive' }]}
 *   onChange={setStatus}
 * />
 *
 * @example
 * <Dropdown name="status" title="Status" options={options} defaultValue="active" required />
 */
export const Dropdown = <T extends DropdownValue>({
	value,
	defaultValue,
	onChange,
	...props
}: DropdownProps<T>) => (
	<DropdownBase
		{...props}
		value={value === undefined ? undefined : toArray(value)}
		defaultValue={defaultValue === undefined ? undefined : toArray(defaultValue)}
		onChange={(next) => onChange?.(next[0] ?? null)}
	/>
);
