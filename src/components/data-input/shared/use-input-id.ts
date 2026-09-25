'use client';
import { useId } from 'react';

/**
 * Resolves a control's `id`: the explicit `id`, then `name`, then a generated id.
 * Keeps label, error message, and ARIA wiring working for unnamed inputs like search bars.
 *
 * @example
 * const id = useInputId(idProp, name);
 */
export const useInputId = (id?: string, name?: string) => {
	const generatedId = useId();
	return id ?? name ?? generatedId;
};
