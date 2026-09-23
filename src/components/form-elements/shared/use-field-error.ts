'use client';
import { useCallback, useEffect, useRef, useState } from 'react';
import { InputElement } from './input-props.types';

/** Options for `useFieldError`. */
type UseFieldErrorProps = {
	/** Id of the control; the message id is derived from it */
	id: string;
	/** Consumer-supplied error; takes precedence over the native validation message */
	error?: string;
	/** Current value; refreshes a visible native message when the value changes without user input, like stepper buttons */
	value?: unknown;
};

/** Id of the message element linked to a control via `aria-describedby`. */
export const getErrorId = (id: string) => `${id}-error`;

/**
 * Replaces the browser validation bubble with an inline message.
 * Mirrors `error` into native validity via `setCustomValidity`, captures native messages on `invalid`,
 * and returns props wiring `aria-invalid` and `aria-describedby` to the message rendered by `InputWrapper`.
 *
 * @example
 * const { ref, message, fieldProps } = useFieldError({ id, error, value });
 *
 * <InputWrapper id={id} error={message} size={size}>
 *   <input ref={ref} id={id} {...fieldProps} />
 * </InputWrapper>
 *
 * @example
 * // One `ref` for either element when the control can swap
 * const { ref, fieldProps } = useFieldError<HTMLInputElement | HTMLTextAreaElement>({ id, error });
 */
export const useFieldError = <T extends InputElement = HTMLInputElement>({
	id,
	error,
	value,
}: UseFieldErrorProps) => {
	const elementRef = useRef<T | null>(null);
	const [nativeMessage, setNativeMessage] = useState<string | null>(null);

	// Mirror `error` into native validity so the form refuses to submit while it is set.
	// A callback ref re-applies it when `error` changes or the element is swapped
	const ref = useCallback(
		(node: T | null) => {
			elementRef.current = node;
			node?.setCustomValidity(error ?? '');
		},
		[error]
	);

	// Refresh a visible native message; clears once the field is valid
	const refresh = useCallback(() => {
		setNativeMessage((prev) =>
			prev === null ? null : elementRef.current?.validationMessage || null
		);
	}, []);

	// Catch changes that don't fire `input`, like programmatic value updates or `error` being cleared
	useEffect(() => {
		refresh();
	}, [value, error, refresh]);

	const handleInvalid = (e: React.FormEvent<T>) => {
		// Suppress the browser bubble; the message renders inline instead
		e.preventDefault();
		setNativeMessage(e.currentTarget.validationMessage);

		// Cancelling `invalid` also cancels the browser's focus on the first invalid field, so restore it
		const form = e.currentTarget.form;
		const firstInvalid = form?.querySelector('input:invalid, select:invalid, textarea:invalid');
		if (firstInvalid === e.currentTarget) {
			e.currentTarget.focus();
		}
	};

	const message = error || nativeMessage || null;

	return {
		ref,
		message,
		fieldProps: {
			onInvalid: handleInvalid,
			onInput: refresh,
			'aria-invalid': message ? true : undefined,
			'aria-describedby': message ? getErrorId(id) : undefined,
		},
	};
};
