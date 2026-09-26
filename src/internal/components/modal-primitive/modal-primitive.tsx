'use client';
import { useEffect, useRef } from 'react';
import { ModalPrimitiveProps } from './modal-primitive.types';
import { createPortal } from 'react-dom';
import { useDismiss } from '@/hooks';
import { css } from '@/styled-system/css';

const FOCUSABLE_SELECTOR =
	'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';

export const ModalPrimitive = ({
	autoFocus = true,
	children,
	closeOnEsc = true,
	closeOnOverlayClick = true,
	dismissRef,
	isOpen,
	onClose,
	overlayClassName,
	portalTarget,
	preventScroll = true,
}: ModalPrimitiveProps) => {
	const internalRef = useRef<HTMLDivElement>(null);
	const primitiveRef = dismissRef ?? internalRef;
	const triggerRef = useRef<HTMLElement | null>(null);

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

	useEffect(() => {
		if (!isOpen || !autoFocus) return;

		// Remember what was focused before opening so we can restore it on close
		triggerRef.current = document.activeElement as HTMLElement | null;

		// Focus the first focusable descendant after the portal has mounted
		const raf = requestAnimationFrame(() => {
			const first = primitiveRef.current?.querySelector<HTMLElement>(FOCUSABLE_SELECTOR);
			first?.focus();
		});

		return () => {
			cancelAnimationFrame(raf);
			// Restore focus to the trigger when the modal closes
			triggerRef.current?.focus();
		};
	}, [isOpen, autoFocus, primitiveRef]);

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
