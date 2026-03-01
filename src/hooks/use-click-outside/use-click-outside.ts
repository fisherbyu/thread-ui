'use client';
import { useEffect, RefObject } from 'react';

export const useClickOutside = (
	elementRef: RefObject<HTMLElement | null>,
	isOpen: boolean,
	onClose: () => void,
	disabled: boolean = false
) => {
	useEffect(() => {
		if (!isOpen || disabled) return;

		const handleClickOutside = (e: MouseEvent) => {
			if (elementRef.current && !elementRef.current.contains(e.target as Node)) {
				onClose();
			}
		};

		document.addEventListener('mousedown', handleClickOutside);
		return () => document.removeEventListener('mousedown', handleClickOutside);
	}, [isOpen, elementRef, onClose]);
};
