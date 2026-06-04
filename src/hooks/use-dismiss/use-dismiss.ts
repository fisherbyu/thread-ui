'use client';
import { useEffect, useRef, RefObject } from 'react';

type UseDismissProps = {
	elementRef: RefObject<HTMLElement | null>;
	isOpen: boolean;
	onClose: () => void;
	dismissOnClick: boolean;
	dismissOnEsc: boolean;
};

/**
 * Calls `onClose` when a click is detected outside of `elementRef` or when `Escape` is pressed.
 * Each trigger can be independently disabled. Only active when `isOpen` is true.
 *
 * @example
 * const ref = useRef<HTMLDivElement>(null);
 * useDismiss(ref, isOpen, () => setIsOpen(false));
 *
 * // Disable outside click, keep Escape
 * useDismiss(ref, isOpen, () => setIsOpen(false), true, false);
 */
export const useDismiss = ({
	elementRef,
	isOpen,
	onClose,
	dismissOnClick = true,
	dismissOnEsc = true,
}: UseDismissProps) => {
	const onCloseRef = useRef(onClose);
	onCloseRef.current = onClose;

	useEffect(() => {
		if (!isOpen || (!dismissOnClick && !dismissOnEsc)) return;

		const handleClickOutside = (e: MouseEvent) => {
			if (elementRef.current && !elementRef.current.contains(e.target as Node)) {
				onCloseRef.current();
			}
		};

		const handleKeyDown = (e: KeyboardEvent) => {
			if (e.key === 'Escape') {
				onCloseRef.current();
			}
		};

		if (dismissOnClick) {
			document.addEventListener('mousedown', handleClickOutside);
		}

		if (dismissOnEsc) {
			document.addEventListener('keydown', handleKeyDown);
		}

		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
			document.removeEventListener('keydown', handleKeyDown);
		};
	}, [elementRef, isOpen, dismissOnClick, dismissOnEsc]);
};
