'use client';
import { useEffect, useRef, RefObject } from 'react';

export const useDismiss = (
	elementRef: RefObject<HTMLElement | null>,
	isOpen: boolean,
	onClose: () => void,
	disabled: boolean = false
) => {
	const onCloseRef = useRef(onClose);
	onCloseRef.current = onClose;

	useEffect(() => {
		if (!isOpen || disabled) return;

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

		document.addEventListener('mousedown', handleClickOutside);
		document.addEventListener('keydown', handleKeyDown);

		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
			document.removeEventListener('keydown', handleKeyDown);
		};
	}, [isOpen, disabled, elementRef]);
};
