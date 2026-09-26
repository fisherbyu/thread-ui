'use client';
import { useEffect, useRef } from 'react';

/**
 * Ref that always holds the latest `value`, so delayed callbacks (debounced item updates, drag handlers) never act on stale data.
 *
 * @example
 * const valueRef = useLatestRef(value);
 */
export const useLatestRef = <T>(value: T) => {
	const ref = useRef(value);

	useEffect(() => {
		ref.current = value;
	}, [value]);

	return ref;
};
