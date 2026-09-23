'use client';
import { Icon } from '@/components';
import { FormLabel } from '../shared/form-label';
import { InputWrapper } from '../shared/input-wrapper';
import { useFieldError } from '../shared/use-field-error';
import { NumberInputProps } from './number-input.types';
import { inputIconSizes, inputSegmentStyles } from '../shared/styles';
import { useState } from 'react';
import { cva, cx } from '@/styled-system/css';

const styles = {
	arrowButton: cva({
		base: {
			backgroundColor: { base: 'transparent', _hover: 'hover' },
			borderWidth: 'md',
			borderColor: 'structure.default',
			_focus: {
				ring: '2',
				ringColor: 'structure.default',
				outline: 'none',
			},
		},
		variants: {
			direction: {
				left: {
					borderStartStartRadius: 'lg',
					borderEndStartRadius: 'lg',
				},
				right: {
					borderStartEndRadius: 'lg',
					borderEndEndRadius: 'lg',
				},
			},
		},
	}),
	centerSegment: cva({
		base: {
			textAlign: 'center',
			appearance: 'none',
			'&::-webkit-outer-spin-button': {
				appearance: 'none',
			},
			'&::-webkit-inner-spin-button': {
				appearance: 'none',
			},
		},
		variants: {
			size: {
				sm: {
					width: '12',
				},
				md: {
					width: '14',
				},
				lg: {
					width: '16',
				},
			},
		},
		defaultVariants: {
			size: 'md',
		},
	}),
	container: cva({
		base: {
			display: 'flex',
			justifyContent: 'center',
			alignItems: 'stretch',
			alignSelf: 'start',
		},
	}),
};

const valueWithinRange = (value: number, min?: number, max?: number): boolean => {
	if (min !== undefined && value < min) {
		return false;
	}
	if (max !== undefined && value > max) {
		return false;
	}
	return true;
};

/**
 * Number input with increment/decrement buttons and optional min/max range enforcement.
 * Blocks non-numeric keyboard input and respects range bounds on both direct input and stepping.
 * Controlled when `value` is passed, uncontrolled otherwise.
 *
 * @example
 * <NumberInput
 *   name="quantity"
 *   title="Quantity"
 *   value={qty}
 *   min={1}
 *   max={99}
 *   onChange={handleChange}
 * />
 *
 * @example
 * <NumberInput name="quantity" title="Quantity" defaultValue={1} min={1} max={99} />
 */
export const NumberInput = ({
	name,
	id = name,
	title,
	value,
	defaultValue,
	placeholder,
	required,
	min,
	max,
	size = 'md',
	disabled,
	error,
	onChange,
}: NumberInputProps) => {
	const isControlled = value !== undefined;

	// Internal state only backs the uncontrolled case; a controlled parent owns the value
	const [internalNum, setInternalNum] = useState<number | null>(defaultValue ?? null);
	const num = isControlled ? value : internalNum;

	const { ref, message, fieldProps } = useFieldError({ id, error, value: num });

	// Keep internal state in step unless the parent is driving the value
	const setNum = (newValue: number | null) => {
		if (!isControlled) {
			setInternalNum(newValue);
		}
	};

	// Handle Num Increment
	const handleIncrement = (increment: number) => () => {
		const newValue = (num ?? 0) + increment;

		// Respect min/max values if provided
		if (!valueWithinRange(newValue, min, max)) {
			return;
		}

		setNum(newValue);

		// Create a synthetic event to pass to onChange
		if (onChange) {
			const syntheticEvent = {
				target: {
					name,
					value: newValue,
				},
			} as unknown as React.ChangeEvent<HTMLInputElement>;

			onChange(syntheticEvent);
		}
	};

	// Handle direct input changes
	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const inputValue = e.target.value;

		// Allow empty input
		if (inputValue === '') {
			setNum(null);
			if (onChange) {
				onChange(e);
			}
			return;
		}

		// Check if valid number
		const newValue = Number(inputValue);
		if (isNaN(newValue)) {
			// Invalid number - keep previous value
			return;
		}

		// Only apply range validation for complete inputs
		if (valueWithinRange(newValue, min, max)) {
			setNum(newValue);
			if (onChange) {
				onChange(e);
			}
		}
	};

	return (
		<InputWrapper id={id} error={message} size={size}>
			{title && <FormLabel id={id} name={name} title={title} size={size} />}
			<div className={styles.container()}>
				<button
					type="button"
					className={cx(
						styles.arrowButton({ direction: 'left' }),
						inputSegmentStyles({ size })
					)}
					onClick={handleIncrement(-1)}
					disabled={disabled}
				>
					<Icon name="CaretLeft" color="gray" size={inputIconSizes[size]} />
				</button>
				<input
					ref={ref}
					type="number"
					id={id}
					name={name}
					placeholder={placeholder}
					value={num ?? ''}
					onChange={handleInputChange}
					className={cx(
						inputSegmentStyles({ size, field: true }),
						styles.centerSegment({ size })
					)}
					onKeyDown={(e) => {
						// Allow minus sign as first character if negative values are allowed
						if (
							e.key === '-' &&
							e.currentTarget.value.length === 0 &&
							(min === undefined || min < 0)
						) {
							return; // Allow the minus sign
						}

						// Prevent non-numeric input except allowed control keys
						if (
							!/[0-9]/.test(e.key) &&
							!e.ctrlKey &&
							!e.metaKey &&
							![
								'Backspace',
								'Delete',
								'ArrowLeft',
								'ArrowRight',
								'Tab',
								'Home',
								'End',
							].includes(e.key)
						) {
							e.preventDefault();
						}
					}}
					required={required}
					disabled={disabled}
					min={min}
					max={max}
					{...fieldProps}
				/>
				<button
					type="button"
					className={cx(
						styles.arrowButton({ direction: 'right' }),
						inputSegmentStyles({ size })
					)}
					onClick={handleIncrement(1)}
					disabled={disabled}
				>
					<Icon name="CaretRight" color="gray" size={inputIconSizes[size]} />
				</button>
			</div>
		</InputWrapper>
	);
};
