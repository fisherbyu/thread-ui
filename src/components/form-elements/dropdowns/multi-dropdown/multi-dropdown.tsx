'use client';
import { useState } from 'react';
import { cva, css, cx } from '@/styled-system/css';
import { MultiDropdownProps } from './multi-dropdown.types';
import { DropdownBase } from '../dropdown-base/dropdown-base';
import { Icon } from '@/components/ui';

const itemStyles = cva({
	base: {
		cursor: 'pointer',
		paddingX: '4',
		paddingY: '2',
		display: 'flex',
		alignItems: 'center',
		gap: '2',
		_hover: { backgroundColor: 'surface' },
	},
	variants: {
		isSelected: {
			true: { backgroundColor: 'elevated' },
		},
	},
});

const badgeStyles = css({
	display: 'inline-flex',
	alignItems: 'center',
	justifyContent: 'center',
	backgroundColor: 'accent',
	color: 'accent.fg',
	borderRadius: 'full',
	fontSize: 'xs',
	lineHeight: '1',
	minWidth: '4',
	height: '4',
	paddingX: '1',
});

/**
 * Multi-select dropdown — stays open on selection, renders a count badge
 * when values are active, and exposes a per-field clear.
 *
 * @example
 * <MultiDropdown
 *   title="Course"
 *   options={[{ label: 'Main', value: 'main' }, { label: 'Dessert', value: 'dessert' }]}
 *   values={selected}
 *   onToggle={(val) => toggle(val)}
 *   onClear={() => clear()}
 * />
 */
export const MultiDropdown = ({
	id,
	title,
	placeholder = 'Select...',
	options,
	values,
	onToggle,
	onClear,
}: MultiDropdownProps) => {
	const [isOpen, setIsOpen] = useState(false);

	const triggerLabel =
		values.length === 0 ? placeholder : `${title ?? 'Selected'} (${values.length})`;

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
			triggerLabel={triggerLabel}
			renderItem={(option, index) => {
				const isSelected = values.includes(option.value);
				return (
					<li
						key={index}
						className={itemStyles({ isSelected })}
						onClick={() => onToggle(option.value)}
					>
						<Icon name={isSelected ? 'CheckSquare' : 'Square'} size={12} />
						{option.label}
					</li>
				);
			}}
		/>
	);
};
