'use client';
import { useEffect, useRef, RefObject } from 'react';

export const useClickOutside = (
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

		document.addEventListener('mousedown', handleClickOutside);
		return () => document.removeEventListener('mousedown', handleClickOutside);
	}, [isOpen, disabled, elementRef]);
};
