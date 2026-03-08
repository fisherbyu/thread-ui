'use client';
import { useState } from 'react';
import { cva, css, cx } from '@/styled-system/css';
import { MultiDropdownProps } from './multi-dropdown.types';
import { DropdownBase } from '../dropdown-base/dropdown-base';
import { Icon, IconButton } from '@/components/ui';

const styles = {
	itemStyles: cva({
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
	}),
	headerStyles: css({
		height: '5',
		paddingX: 4,
		display: 'flex',
		flexDirection: 'row-reverse',
	}),
};

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
			listHeader={
				<div className={styles.headerStyles}>
					{values.length > 0 && (
						<IconButton onClick={onClear} color="text" name="X" text size="sm">
							Clear
						</IconButton>
					)}
				</div>
			}
			triggerLabel={triggerLabel}
			renderItem={(option, index) => {
				const isSelected = values.includes(option.value);
				return (
					<li
						key={index}
						className={styles.itemStyles({ isSelected })}
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
