'use client';
import { useEffect, RefObject } from 'react';

export const useOutsideCloseClick = (
	enabled: boolean,
	elementRef: RefObject<HTMLElement | null>,
	isOpen: boolean,
	onClose: () => void
) => {
	useEffect(() => {
		if (!isOpen || !enabled) return;

		const handleClickOutside = (e: MouseEvent) => {
			if (elementRef.current && !elementRef.current.contains(e.target as Node)) {
				onClose();
			}
		};

		document.addEventListener('mousedown', handleClickOutside);
		return () => document.removeEventListener('mousedown', handleClickOutside);
	}, [isOpen, elementRef, onClose]);
};
