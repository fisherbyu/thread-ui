'use client';
import { useEffect, useRef } from 'react';

type UseResizeProps = {
	onResize: () => void;
	disabled?: boolean;
};

/**
 * Calls `onResize` on window resize.
 * Only active when `disabled` is false.
 *
 * @example
 * useResize({ onResize: () => setIsOpen(false) });
 */
export const useResize = ({ onResize, disabled = false }: UseResizeProps) => {
	const onResizeRef = useRef(onResize);
	onResizeRef.current = onResize;

	useEffect(() => {
		if (disabled) return;

		const handleResize = () => {
			onResizeRef.current();
		};

		window.addEventListener('resize', handleResize);
		return () => window.removeEventListener('resize', handleResize);
	}, [disabled]);
};
