'use client';
import { useState } from 'react';
import { cva } from '@/styled-system/css';
import { DropdownProps } from './dropdown.types';
import { DropdownOption } from '../dropdown-base/dropdown-base.types';
import { DropdownBase } from '../dropdown-base/dropdown-base';

const itemStyles = cva({
	base: {
		cursor: 'pointer',
		paddingX: '4',
		paddingY: '2',
		_hover: { backgroundColor: 'hover' },
	},
	variants: {
		isSelected: {
			true: { backgroundColor: 'active' },
		},
	},
});

/**
 * Single-select dropdown with an option list and outside-click dismissal.
 *
 * @example
 * <Dropdown
 *   title="Status"
 *   value={status}
 *   options={[{ label: 'Active', value: 'active' }, { label: 'Inactive', value: 'inactive' }]}
 *   onSelect={(val) => setStatus(val)}
 * />
 */
export const Dropdown = ({
	id,
	title,
	value,
	options,
	onSelect,
	placeholder = 'Select an option...',
	size,
	color,
}: DropdownProps) => {
	const [isOpen, setIsOpen] = useState(false);
	const selected = options.find((opt) => opt.value === value);

	const handleSelect = (option: DropdownOption) => {
		onSelect(option.value);
		setIsOpen(false);
	};

	return (
		<DropdownBase
			id={id}
			title={title}
			options={options}
			isOpen={isOpen}
			onToggle={() => setIsOpen((prev) => !prev)}
			onClose={() => {
				setIsOpen(false);
			}}
			triggerLabel={selected ? selected.label : placeholder}
			renderItem={(option, index) => (
				<li
					key={index}
					className={itemStyles({ isSelected: option.value === selected?.value })}
					onClick={() => handleSelect(option)}
				>
					{option.label}
				</li>
			)}
			size={size}
			color={color}
		/>
	);
};
