'use client';
import { useEffect, RefObject } from 'react';

export const useOutsideCloseClick = (
	enabled: boolean,
	ref: RefObject<HTMLElement | null>,
	isOpen: boolean,
	onClose: () => void
) => {
	useEffect(() => {
		if (!isOpen || !enabled) return;

		const handleClickOutside = (e: MouseEvent) => {
			if (ref.current && !ref.current.contains(e.target as Node)) {
				onClose();
			}
		};

		document.addEventListener('mousedown', handleClickOutside);
		return () => document.removeEventListener('mousedown', handleClickOutside);
	}, [isOpen, ref, onClose]);
};
