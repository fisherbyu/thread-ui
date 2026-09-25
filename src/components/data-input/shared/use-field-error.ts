'use client';
import { RefObject, useCallback, useEffect, useRef, useState } from 'react';
import { InputElement } from './input-props.types';

/** Props for `useFieldError`. */
type UseFieldErrorProps<T extends InputElement> = {
	/** Id of the control; the message id is derived from it */
	id: string;
	/** Consumer-supplied error; takes precedence over the native validation message */
	error?: string;
	/** Current value; refreshes a visible native message when the value changes without user input, like stepper buttons */
	value?: unknown;
	/** Ref to share the validated element with other hooks; one is created when omitted */
	elementRef?: RefObject<T | null>;
	/** Element to focus when validation fails, for controls whose native element is hidden. Defaults to the validated element */
	focusRef?: RefObject<HTMLElement | null>;
};

/** Id of the message element linked to a control via `aria-describedby`. */
export const getErrorId = (id: string) => `${id}-error`;

/**
 * Replaces the browser validation bubble with an inline message.
 * Mirrors `error` into native validity via `setCustomValidity`, captures native messages on `invalid`,
 * clears them on form `reset`, and wires `aria-invalid` and `aria-describedby` to the message rendered by `InputWrapper`.
 *
 * `validationProps` go on the native element, `ariaProps` on the element the user focuses.
 * `fieldProps` combines both for controls where those are the same element.
 *
 * @example
 * const { ref, message, fieldProps } = useFieldError({ id, error, value });
 *
 * <InputWrapper id={id} error={message} size={size}>
 *   <input ref={ref} id={id} {...fieldProps} />
 * </InputWrapper>
 *
 * @example
 * // Hidden native element with a custom trigger
 * const { ref, validationProps, ariaProps } = useFieldError<HTMLSelectElement>({ id, error, focusRef: triggerRef });
 *
 * <button ref={triggerRef} {...ariaProps} />
 * <select ref={ref} {...validationProps} />
 */
export const useFieldError = <T extends InputElement = HTMLInputElement>({
	id,
	error,
	value,
	elementRef: externalRef,
	focusRef,
}: UseFieldErrorProps<T>) => {
	const internalRef = useRef<T | null>(null);
	const elementRef = externalRef ?? internalRef;
	const [nativeMessage, setNativeMessage] = useState<string | null>(null);

	// Mirror `error` into native validity so the form refuses to submit while it is set.
	// A callback ref re-applies it when `error` changes or the element is swapped
	const ref = useCallback(
		(node: T | null) => {
			elementRef.current = node;
			node?.setCustomValidity(error ?? '');
		},
		[error, elementRef]
	);

	// Refresh a visible native message; clears once the field is valid
	const refresh = useCallback(() => {
		setNativeMessage((prev) =>
			prev === null ? null : elementRef.current?.validationMessage || null
		);
	}, [elementRef]);

	// Catch changes that don't fire `input`, like programmatic value updates or `error` being cleared
	useEffect(() => {
		refresh();
	}, [value, error, refresh]);

	// A form reset clears native messages, matching browser behaviour
	useEffect(() => {
		const form = elementRef.current?.form;
		if (!form) return;

		const handleReset = () => setNativeMessage(null);
		form.addEventListener('reset', handleReset);
		return () => form.removeEventListener('reset', handleReset);
	}, [elementRef]);

	const handleInvalid = (e: React.FormEvent<T>) => {
		// Suppress the browser bubble; the message renders inline instead
		e.preventDefault();
		setNativeMessage(e.currentTarget.validationMessage);

		// Cancelling `invalid` also cancels the browser's focus on the first invalid field, so restore it
		const form = e.currentTarget.form;
		const firstInvalid = form?.querySelector('input:invalid, select:invalid, textarea:invalid');
		if (firstInvalid === e.currentTarget) {
			(focusRef?.current ?? e.currentTarget).focus();
		}
	};

	const message = error || nativeMessage || null;

	const validationProps = {
		onInvalid: handleInvalid,
		onInput: refresh,
	};

	const ariaProps = {
		'aria-invalid': message ? true : undefined,
		'aria-describedby': message ? getErrorId(id) : undefined,
	};

	return {
		ref,
		message,
		validationProps,
		ariaProps,
		fieldProps: { ...validationProps, ...ariaProps },
	};
};
