'use client';
import { RefObject, useEffect, useRef, useState } from 'react';
import { InputElement } from './input-props.types';

/** Options for `useControllableState`. */
type UseControllableStateProps<T> = {
	/** Controlled value; the hook is uncontrolled while this is `undefined` */
	value?: T;
	/** Initial value for uncontrolled use; restored when the parent form resets */
	defaultValue: T;
	/** Called with the next value on every change */
	onChange?: (value: T) => void | Promise<void>;
	/** Control inside the form whose `reset` event restores `defaultValue` */
	elementRef?: RefObject<InputElement | null>;
};

/**
 * Value state that works controlled or uncontrolled.
 * Internal state only backs the uncontrolled case, and a native form `reset` restores `defaultValue`.
 *
 * @example
 * const [selected, setSelected] = useControllableState({ value, defaultValue: [], onChange, elementRef });
 */
export const useControllableState = <T>({
	value,
	defaultValue,
	onChange,
	elementRef,
}: UseControllableStateProps<T>) => {
	const isControlled = value !== undefined;
	const [internalValue, setInternalValue] = useState(defaultValue);
	const current = isControlled ? value : internalValue;

	// Latest default, so a reset restores what the parent passes now rather than on mount
	const defaultValueRef = useRef(defaultValue);
	defaultValueRef.current = defaultValue;

	const setValue = (next: T) => {
		if (!isControlled) {
			setInternalValue(next);
		}
		onChange?.(next);
	};

	// Mirror native form reset; a controlled parent owns its own reset
	useEffect(() => {
		const form = elementRef?.current?.form;
		if (!form || isControlled) return;

		const handleReset = () => setInternalValue(defaultValueRef.current);
		form.addEventListener('reset', handleReset);
		return () => form.removeEventListener('reset', handleReset);
	}, [elementRef, isControlled]);

	return [current, setValue] as const;
};
