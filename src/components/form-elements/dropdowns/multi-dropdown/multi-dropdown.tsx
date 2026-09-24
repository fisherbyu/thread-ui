'use client';
import { MultiDropdownProps } from './multi-dropdown.types';
import { DropdownValue } from '../dropdown-base/dropdown-base.types';
import { DropdownBase } from '../dropdown-base/dropdown-base';

/**
 * Multi-select dropdown that stays open on selection, shows a selected count on the trigger,
 * and offers a clear action. Controlled when `value` is passed, uncontrolled otherwise.
 *
 * @example
 * <MultiDropdown
 *   name="course"
 *   title="Course"
 *   options={[{ label: 'Main', value: 'main' }, { label: 'Dessert', value: 'dessert' }]}
 *   value={selected}
 *   onChange={setSelected}
 * />
 *
 * @example
 * <MultiDropdown name="course" title="Course" options={options} variant="button" icon="Funnel" showLabel={false} />
 */
export const MultiDropdown = <T extends DropdownValue>(props: MultiDropdownProps<T>) => (
	<DropdownBase {...props} multiple />
);
