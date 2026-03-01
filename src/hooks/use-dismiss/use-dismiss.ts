'use client';
import { useEffect, useRef, RefObject } from 'react';

export const useDismiss = (
	elementRef: RefObject<HTMLElement | null>,
	isOpen: boolean,
	onClose: () => void,
	isClickDisabled: boolean = false,
	isEscDisabled: boolean = false
) => {
	const onCloseRef = useRef(onClose);
	onCloseRef.current = onClose;

	useEffect(() => {
		if (!isOpen || (isClickDisabled && isEscDisabled)) return;

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

		if (!isClickDisabled) {
			document.addEventListener('mousedown', handleClickOutside);
		}

		if (!isEscDisabled) {
			document.addEventListener('keydown', handleKeyDown);
		}

		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
			document.removeEventListener('keydown', handleKeyDown);
		};
	}, [elementRef, isOpen, isClickDisabled, isEscDisabled]);
};
