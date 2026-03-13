'use client';
import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { ModalProps } from './modal.types';
import { ModalProvider } from './modal-context';
import { ModalContent } from './components/modal-content';
import { css, cva } from '@/styled-system/css';

const styles = {
	overlay: cva({
		base: {
			position: 'fixed',
			inset: 0,
			background: 'rgba(0, 0, 0, 0.5)',
			display: 'flex',
			justifyContent: 'center',
			zIndex: 50,
		},
		variants: {
			placement: {
				center: {
					alignItems: 'center',
					paddingTop: '0',
				},
				top: {
					alignItems: 'top',
					paddingTop: '10',
				},
			},
		},
	}),
};

/**
 * Modal dialog rendered in a portal with a backdrop overlay. Supports top and center placement,
 * scroll locking, and optional overlay-click dismissal.
 *
 * @example
 * <Modal open={isOpen} onClose={() => setIsOpen(false)} title="Confirm" size="md">
 *   <p>Are you sure?</p>
 * </Modal>
 */
export const Modal = (props: ModalProps) => {
	const {
		open,
		portalTarget,
		preventScroll = true,
		placement = 'center',
		closeOnOverlayClick = true,
		closeOnEsc = true,
	} = props;

	useEffect(() => {
		if (open && preventScroll) {
			document.body.style.overflow = 'hidden';
		}
		return () => {
			document.body.style.overflow = '';
		};
	}, [open, preventScroll]);

	if (open) {
		const target = portalTarget ?? document.body;

		return createPortal(
			<ModalProvider
				value={{
					...props,
					placement,
					closeOnOverlayClick,
					closeOnEsc,
					preventScroll,
				}}
			>
				<div className={styles.overlay({ placement })}>
					<ModalContent />
				</div>
			</ModalProvider>,
			target
		);
	}
};
