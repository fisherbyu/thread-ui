'use client';
import { useEffect, useRef, RefObject } from 'react';

type UseClickOutsideProps = {
	elementRef: RefObject<HTMLElement | null>;
	isOpen: boolean;
	onClose: () => void;
	disabled: boolean;
};

/**
 * Calls `onClose` when a click is detected outside of `elementRef`.
 * Only active when `isOpen` is true and `disabled` is false.
 *
 * @example
 * const ref = useRef<HTMLDivElement>(null);
 * useClickOutside(ref, isOpen, () => setIsOpen(false));
 */
export const useClickOutside = ({
	elementRef,
	isOpen,
	onClose,
	disabled = false,
}: UseClickOutsideProps) => {
	const onCloseRef = useRef(onClose);
	onCloseRef.current = onClose;

	useEffect(() => {
		if (!isOpen || disabled) return;

		const handleClickOutside = (e: MouseEvent) => {
			if (elementRef.current && !elementRef.current.contains(e.target as Node)) {
				onCloseRef.current();
			}
		};

		document.addEventListener('mousedown', handleClickOutside);
		return () => document.removeEventListener('mousedown', handleClickOutside);
	}, [isOpen, disabled, elementRef]);
};
