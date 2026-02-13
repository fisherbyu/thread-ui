'use client';
import { Icon } from '@/components';
import { FormLabel } from '../form-label';
import { InputWrapper } from '../input-wrapper';
import { NumberInputProps } from './number-input.types';
import { useState, useEffect } from 'react';
import { css, cva, cx } from '@/styled-system/css';

const valueWithinRange = (value: number, min?: number, max?: number): boolean => {
	if (min !== undefined && value < min) {
		return false;
	}
	if (max !== undefined && value > max) {
		return false;
	}
	return true;
};

export const NumberInput = ({
	name,
	id = name,
	title,
	value,
	placeholder,
	required,
	dark,
	min,
	max,
	onChange,
}: NumberInputProps) => {
	// Initialize state with the value from props or null
	const [num, setNum] = useState<number | undefined>(value);

	// Update internal state
	useEffect(() => {
		setNum(value);
	}, [value]);

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
			setNum(undefined);
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

	const styles = {
		arrowButton: cva({
			base: {
				backgroundColor: { base: 'gray.light', _hover: 'gray.100' },
				borderWidth: 'md',
				borderColor: 'gray.light',
				// _focus: {
				//     ring:
				// }
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
		baseSegment: css({
			padding: '3',
			height: '11',
			textAlign: 'center',
			fontSize: 'sm',
		}),
		centerSegment: css({
			width: '16',
		}),
		focus: 'focus:ring-gray-100 focus:ring-2 focus:outline-none',
		inputFocus: 'focus:ring-blue-500 focus:border-blue-500',
		alterInput:
			'appearance-none [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none [-moz-appearance:textfield]',
	};

	return (
		<InputWrapper>
			{title && <FormLabel id={id} name={name} title={title} />}
			<div className="flex self-start justify-center items-center">
				<button
					type="button"
					className={cx(styles.arrowButton({ direction: 'left' }), styles.baseSegment)}
					onClick={handleIncrement(-1)}
				>
					<Icon name="CaretLeft" color="gray" size={12} />
				</button>
				<input
					type="number"
					id={id}
					name={name}
					placeholder={placeholder}
					value={num ?? ''}
					onChange={handleInputChange}
					className={cx(styles.baseSegment)}
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
					min={min}
					max={max}
				/>
				<button
					type="button"
					className={cx(styles.arrowButton({ direction: 'right' }), styles.baseSegment)}
					onClick={handleIncrement(1)}
				>
					<Icon name="CaretRight" color="gray" size={12} />
				</button>
			</div>
		</InputWrapper>
	);
};
