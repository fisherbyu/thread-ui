'use client';
import { useEffect, useRef, useState } from 'react';
import { DropdownBaseProps, DropdownOption, DropdownValue } from './dropdown-base.types';
import { InputWrapper } from '../../shared/input-wrapper';
import { useFieldError } from '../../shared/use-field-error';
import { useControllableState } from '../../shared/use-controllable-state';
import { useInputId } from '../../shared/use-input-id';
import { baseInputStyles, inputIconSizes } from '../../shared/styles';
import { Icon, IconButton } from '@/components/ui';
import { css, cva, cx } from '@/styled-system/css';
import { useDismiss } from '@/hooks';
import { getUtilityIconSize } from '@/utils';
import { OptionalIconButton } from '@/internal';

export const styles = {
	interior: css({
		width: '100%',
		position: 'relative',
		color: 'text.standard',
		// The `button` variant renders a library `Button`, so its invalid state is styled from here
		'& > button[aria-invalid=true]': {
			boxShadow: '0 0 0 2px {colors.error.main}',
		},
	}),
	fieldTrigger: css({
		display: 'flex',
		alignItems: 'center',
		gap: '2',
		textAlign: 'start',
		cursor: 'pointer',
	}),
	triggerLabel: cva({
		base: {
			flex: '1',
			overflow: 'hidden',
			textOverflow: 'ellipsis',
			whiteSpace: 'nowrap',
		},
		variants: {
			placeholder: {
				true: { opacity: '0.6' },
			},
		},
	}),
	popover: css({
		backgroundColor: 'overlay',
		position: 'absolute',
		width: 'fit-content',
		minWidth: '75%',
		borderRadius: 'md',
		marginTop: '3',
		boxShadow: 'lg',
		zIndex: 'overlay',
		maxHeight: '60',
		overflow: 'auto',
	}),
	listHeader: css({
		paddingX: '3',
		paddingY: '1',
		display: 'flex',
	}),
	option: cva({
		base: {
			cursor: 'pointer',
			paddingX: '4',
			paddingY: '2',
			display: 'flex',
			alignItems: 'center',
			gap: '2',
			_hover: { backgroundColor: 'hover' },
		},
		variants: {
			isSelected: {
				true: { backgroundColor: 'active' },
			},
			// Keyboard highlight; a ring so it stays visible on selected options
			isActive: {
				true: { boxShadow: 'inset 0 0 0 2px {colors.info.main}' },
			},
			disabled: {
				true: { opacity: '0.5', cursor: 'not-allowed' },
			},
		},
	}),
	srOnly: css({ srOnly: true }),
};

/**
 * Shared engine for `Dropdown` and `MultiDropdown`: trigger, listbox, keyboard navigation,
 * and a hidden native `select` for form submission and validation. Label and error slot come from `InputWrapper`.
 * Selection is always an array; wrappers map it to their own value shape.
 *
 * @example
 * <DropdownBase name="tags" title="Tags" options={options} value={tags} onChange={setTags} multiple />
 */
export const DropdownBase = <T extends DropdownValue>({
	name,
	id: idProp,
	title,
	required,
	placeholder,
	size = 'md',
	disabled,
	divider,
	error,
	options,
	variant = 'field',
	color = 'neutral',
	icon,
	showLabel = true,
	value,
	defaultValue,
	onChange,
	multiple = false,
}: DropdownBaseProps<T>) => {
	const id = useInputId(idProp, name);
	const containerRef = useRef<HTMLDivElement>(null);
	const triggerRef = useRef<HTMLButtonElement>(null);
	const selectRef = useRef<HTMLSelectElement>(null);

	const [selected, setSelected] = useControllableState<T[]>({
		value,
		defaultValue: defaultValue ?? [],
		onChange,
		elementRef: selectRef,
	});

	const { ref, message, validationProps, ariaProps } = useFieldError<HTMLSelectElement>({
		id,
		error,
		value: selected.join(),
		elementRef: selectRef,
		focusRef: triggerRef,
	});

	const [isOpen, setIsOpen] = useState(false);
	// Highlighted option for keyboard navigation; `-1` when none
	const [activeIndex, setActiveIndex] = useState(-1);

	const listId = `${id}-listbox`;
	const optionId = (index: number) => `${id}-option-${index}`;

	const close = () => {
		setIsOpen(false);
		setActiveIndex(-1);
	};

	useDismiss({ elementRef: containerRef, isOpen, onClose: close, dismissOnBlur: true });

	// Keep the highlighted option in view while navigating
	useEffect(() => {
		if (isOpen && activeIndex >= 0) {
			document.getElementById(optionId(activeIndex))?.scrollIntoView({ block: 'nearest' });
		}
	}, [isOpen, activeIndex]);

	// Next enabled option from `from` in direction `dir`; stays put when there is none
	const stepFrom = (from: number, dir: 1 | -1) => {
		const start = from === -1 && dir === -1 ? options.length : from;
		for (let i = start + dir; i >= 0 && i < options.length; i += dir) {
			if (!options[i].disabled) return i;
		}
		return from;
	};

	// Open from the keyboard, highlighting the current selection or the first/last enabled option
	const openFromKeyboard = (dir: 1 | -1) => {
		const selectedIndex = options.findIndex((option) => selected.includes(option.value));
		setIsOpen(true);
		setActiveIndex(selectedIndex >= 0 ? selectedIndex : stepFrom(-1, dir));
	};

	const selectOption = (option: DropdownOption<T>) => {
		if (option.disabled) return;

		if (multiple) {
			setSelected(
				selected.includes(option.value)
					? selected.filter((v) => v !== option.value)
					: [...selected, option.value]
			);
			return;
		}

		setSelected([option.value]);
		close();
	};

	const handleKeyDown = (e: React.KeyboardEvent<HTMLButtonElement>) => {
		switch (e.key) {
			case 'ArrowDown':
			case 'ArrowUp': {
				e.preventDefault();
				const dir = e.key === 'ArrowDown' ? 1 : -1;
				if (!isOpen) {
					openFromKeyboard(dir);
				} else {
					setActiveIndex((i) => stepFrom(i, dir));
				}
				break;
			}
			case 'Home':
			case 'End': {
				if (!isOpen) return;
				e.preventDefault();
				setActiveIndex(stepFrom(-1, e.key === 'Home' ? 1 : -1));
				break;
			}
			case 'Enter':
			case ' ': {
				// Handled here instead of the native click so an open list selects rather than toggles
				e.preventDefault();
				if (!isOpen) {
					openFromKeyboard(1);
				} else if (options[activeIndex]) {
					selectOption(options[activeIndex]);
				} else {
					close();
				}
				break;
			}
		}
	};

	// Space fires the native click on keyup; block it so it can't re-toggle after `handleKeyDown`
	const handleKeyUp = (e: React.KeyboardEvent<HTMLButtonElement>) => {
		if (e.key === ' ') e.preventDefault();
	};

	const selectedOptions = options.filter((option) => selected.includes(option.value));
	const isPlaceholder = selectedOptions.length === 0;
	const triggerLabel = isPlaceholder
		? (placeholder ?? (!showLabel && title ? title : 'Select...'))
		: multiple
			? `${title ?? 'Selected'} (${selectedOptions.length})`
			: selectedOptions[0].label;

	const triggerProps = {
		ref: triggerRef,
		id,
		type: 'button' as const,
		role: 'combobox',
		disabled,
		'aria-expanded': isOpen,
		'aria-haspopup': 'listbox' as const,
		'aria-controls': isOpen ? listId : undefined,
		'aria-activedescendant': isOpen && activeIndex >= 0 ? optionId(activeIndex) : undefined,
		...ariaProps,
		onClick: () => (isOpen ? close() : setIsOpen(true)),
		onKeyDown: handleKeyDown,
		onKeyUp: handleKeyUp,
	};

	return (
		<InputWrapper
			id={id}
			title={title}
			size={size}
			divider={divider}
			hideLabel={!showLabel}
			error={message}
		>
			<div ref={containerRef} className={styles.interior}>
				{variant === 'field' ? (
					<button
						{...triggerProps}
						className={cx(baseInputStyles({ size }), styles.fieldTrigger)}
					>
						{icon && <Icon name={icon} size={inputIconSizes[size]} />}
						<span className={styles.triggerLabel({ placeholder: isPlaceholder })}>
							{triggerLabel}
						</span>
						<Icon name={isOpen ? 'CaretUp' : 'CaretDown'} size={inputIconSizes[size]} />
					</button>
				) : (
					<OptionalIconButton {...triggerProps} size={size} color={color} name={icon}>
						{triggerLabel}
						<Icon
							name={isOpen ? 'CaretUp' : 'CaretDown'}
							size={getUtilityIconSize(size)}
						/>
					</OptionalIconButton>
				)}
				{isOpen && (
					// Block mousedown so focus stays on the trigger for `aria-activedescendant` and blur dismissal
					<div className={styles.popover} onMouseDown={(e) => e.preventDefault()}>
						{multiple && selected.length > 0 && (
							<div className={styles.listHeader}>
								<IconButton
									ariaLabel="Clear selection"
									onClick={() => setSelected([])}
									color="text"
									name="X"
									text
									size="sm"
								>
									Clear
								</IconButton>
							</div>
						)}
						<ul
							id={listId}
							role="listbox"
							aria-multiselectable={multiple || undefined}
							aria-labelledby={title ? `${id}-label` : undefined}
						>
							{options.map((option, index) => {
								const isSelected = selected.includes(option.value);
								return (
									<li
										key={option.value}
										id={optionId(index)}
										role="option"
										aria-selected={isSelected}
										aria-disabled={option.disabled || undefined}
										className={styles.option({
											isSelected,
											isActive: index === activeIndex,
											disabled: !!option.disabled,
										})}
										onClick={() => selectOption(option)}
									>
										{multiple && (
											<Icon
												name={isSelected ? 'CheckSquare' : 'Square'}
												size={12}
											/>
										)}
										{option.label}
									</li>
								);
							})}
						</ul>
					</div>
				)}
				{/* Native control for form submission and constraint validation; users interact with the trigger */}
				<select
					ref={ref}
					{...validationProps}
					name={name}
					required={required}
					disabled={disabled}
					multiple={multiple}
					value={multiple ? selected.map(String) : String(selected[0] ?? '')}
					// Driven by the custom list; the handler only satisfies React's controlled-field check
					onChange={() => {}}
					tabIndex={-1}
					aria-hidden
					className={styles.srOnly}
				>
					{/* Empty first option lets `required` report a missing value */}
					{!multiple && <option value="" />}
					{options.map((option) => (
						<option
							key={option.value}
							value={String(option.value)}
							disabled={option.disabled}
						>
							{option.label}
						</option>
					))}
				</select>
			</div>
		</InputWrapper>
	);
};
