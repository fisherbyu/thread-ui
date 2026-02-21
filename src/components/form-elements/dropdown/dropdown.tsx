import { useRef, useState } from 'react';
import { DropdownOption, DropdownProps } from './dropdown.types';
import { InputWrapper } from '../input-wrapper';
import { FormLabel } from '../form-label';
import { Icon } from '@/components/ui';
import { css, cva, cx } from '@/styled-system/css';
import { baseInputStyles } from '../styles';

export const Dropdown = ({
	label,
	value,
	options,
	onSelect,
	placeholder = 'Select an option...',
}: DropdownProps) => {
	// UI State Controls
	const [isOpen, setIsOpen] = useState(false);
	const dropdownRef = useRef<HTMLDivElement>(null);

	// Map Value to Dropdown Option
	const selected = options.find((opt) => opt.value === value);

	// User Actions
	const handleSelect = (option: DropdownOption) => {
		onSelect(option.value);
		setIsOpen(false);
	};

	const toggleDropdown = () => setIsOpen(!isOpen);

	// Styles
	const styles = {
		container: css({
			width: '100%',
		}),
		interior: css({
			width: '100%',
			position: 'relative',
		}),
		surfaceButton: css({
			width: '100%',
			display: 'flex',
			justifyContent: 'space-between',
			alignItems: 'center',
		}),
		list: css({
			position: 'absolute',
			width: '100%',
			borderWidth: 'md',
			borderColor: 'structure',
			borderRadius: 'md',
			marginTop: '1',
			boxShadow: 'lg',
			zIndex: '10',
			maxHeight: '60',
			overflow: 'auto',
		}),
		item: cva({
			base: {
				cursor: 'pointer',
				paddingX: '4',
				paddingY: '2',
				_hover: { backgroundColor: 'surface' },
			},
			variants: {
				isSelected: {
					true: {
						backgroundColor: 'elevated',
					},
				},
			},
		}),
	};

	return (
		<div className={styles.container} ref={dropdownRef}>
			<InputWrapper>
				{label && <FormLabel name={label} title={label} />}
				<div className={styles.interior}>
					<button
						className={cx(styles.surfaceButton, baseInputStyles({ alt: true }))}
						onClick={toggleDropdown}
						type="button"
					>
						<span>{selected ? selected.label : placeholder}</span>
						<Icon name={isOpen ? 'CaretUp' : 'CaretDown'} size={16} color="black" />
					</button>
					{isOpen && (
						<ul className={styles.list}>
							{options.map((option, index) => (
								<li
									key={index}
									className={styles.item({
										isSelected: option.value === selected?.value,
									})}
									onClick={() => handleSelect(option)}
								>
									{option.label}
								</li>
							))}
						</ul>
					)}
				</div>
			</InputWrapper>
		</div>
	);
};
