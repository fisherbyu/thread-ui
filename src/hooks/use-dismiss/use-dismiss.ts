'use client';
import { useEffect, useRef, RefObject } from 'react';

type UseDismissProps = {
	elementRef: RefObject<HTMLElement | null>;
	isOpen: boolean;
	onClose: () => void;
	dismissOnClick?: boolean;
	dismissOnEsc?: boolean;
	dismissOnBlur?: boolean;
};

/**
 * Calls `onClose` when a click is detected outside of `elementRef`, when `Escape` is pressed,
 * or when focus leaves `elementRef`. Each trigger can be independently enabled/disabled.
 * Only active when `isOpen` is true.
 *
 * @example
 * const ref = useRef<HTMLDivElement>(null);
 * useDismiss({ elementRef: ref, isOpen, onClose: () => setIsOpen(false) });
 *
 * // Disable outside click, keep Escape and blur
 * useDismiss({ elementRef: ref, isOpen, onClose: () => setIsOpen(false), dismissOnClick: false, dismissOnBlur: true });
 */
export const useDismiss = ({
	elementRef,
	isOpen,
	onClose,
	dismissOnClick = true,
	dismissOnEsc = true,
	dismissOnBlur = true,
}: UseDismissProps) => {
	const onCloseRef = useRef(onClose);
	onCloseRef.current = onClose;

	useEffect(() => {
		if (!isOpen || (!dismissOnClick && !dismissOnEsc && !dismissOnBlur)) return;

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

		const handleFocusOut = (e: FocusEvent) => {
			if (elementRef.current && !elementRef.current.contains(e.relatedTarget as Node)) {
				onCloseRef.current();
			}
		};

		if (dismissOnClick) {
			document.addEventListener('mousedown', handleClickOutside);
		}

		if (dismissOnEsc) {
			document.addEventListener('keydown', handleKeyDown);
		}
		if (dismissOnBlur) {
			elementRef.current?.addEventListener('focusout', handleFocusOut);
		}

		const el = elementRef.current;
		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
			document.removeEventListener('keydown', handleKeyDown);
			el?.removeEventListener('focusout', handleFocusOut);
		};
	}, [elementRef, isOpen, dismissOnClick, dismissOnEsc, dismissOnBlur]);
};
