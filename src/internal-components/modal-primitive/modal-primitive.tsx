'use client';
import { useEffect, useRef } from 'react';
import { ModalPrimitiveProps } from './modal-primitive.types';
import { createPortal } from 'react-dom';
import { useDismiss } from '@/hooks';

export const ModalPrimitive = ({
	children,
	closeOnEsc = true,
	closeOnOverlayClick = true,
	isOpen,
	onClose,
	overlayClassName,
	portalTarget,
	preventScroll = true,
}: ModalPrimitiveProps) => {
	const primitiveRef = useRef<HTMLDivElement>(null);

	useDismiss(primitiveRef, isOpen, onClose, closeOnOverlayClick, closeOnEsc);

	useEffect(() => {
		if (isOpen && preventScroll) {
			document.body.style.overflow = 'hidden';
		}
		return () => {
			document.body.style.overflow = '';
		};
	}, [isOpen, preventScroll]);

	if (isOpen) {
		const target = portalTarget ?? document.body;

		return createPortal(
			<div className={overlayClassName}>
				<div ref={primitiveRef}>{children}</div>
			</div>,
			target
		);
	}
};
