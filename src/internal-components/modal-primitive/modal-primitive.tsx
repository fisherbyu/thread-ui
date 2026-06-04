'use client';
import { useEffect, useRef } from 'react';
import { ModalPrimitiveProps } from './modal-primitive.types';
import { createPortal } from 'react-dom';
import { useDismiss } from '@/hooks';
import { css } from '@/styled-system/css';

const styles = {
	contentWrapperRef: css({
		display: 'contents',
	}),
};

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

	useDismiss({
		elementRef: primitiveRef,
		isOpen,
		onClose,
		dismissOnClick: closeOnOverlayClick,
		dismissOnEsc: closeOnEsc,
	});

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
				<div className={styles.contentWrapperRef} ref={primitiveRef}>
					{children}
				</div>
			</div>,
			target
		);
	}
};
