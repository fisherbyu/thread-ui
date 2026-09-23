'use client';
import { useEffect, useRef, useState } from 'react';
import { InputElement } from './input-props.types';

/** Options for `useFieldError`. */
type UseFieldErrorProps = {
	/** Id of the control; the message id is derived from it */
	id: string;
	/** Consumer-supplied error; takes precedence over the native validation message */
	error?: string;
	/** Current value; keeps a visible native message in step as it changes */
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
 */
export const useFieldError = <T extends InputElement = HTMLInputElement>({
	id,
	error,
	value,
}: UseFieldErrorProps) => {
	const ref = useRef<T>(null);
	const [nativeMessage, setNativeMessage] = useState<string | null>(null);

	// Mirror the `error` prop into native validity so the form refuses to submit while it is set
	useEffect(() => {
		ref.current?.setCustomValidity(error ?? '');
	}, [error]);

	// Once a native message is showing, refresh it as the value or `error` changes; clears when valid
	useEffect(() => {
		if (nativeMessage !== null) {
			setNativeMessage(ref.current?.validationMessage || null);
		}
	}, [value, error, nativeMessage]);

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
			'aria-invalid': message ? true : undefined,
			'aria-describedby': message ? getErrorId(id) : undefined,
		},
	};
};
