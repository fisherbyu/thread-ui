import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { ModalProps } from './modal.types';
import { ModalProvider } from './modal-context';
import { ModalContent } from './components/modal-content';
import { css } from '@/styled-system/css';

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
	const { open, portalTarget, preventScroll = true, placement = 'center' } = props;

	useEffect(() => {
		if (open && preventScroll) {
			document.body.style.overflow = 'hidden';
		}
		return () => {
			document.body.style.overflow = '';
		};
	}, [open, preventScroll]);

	const styles = {
		overlay: css({
			position: 'fixed',
			inset: 0,
			background: 'rgba(0, 0, 0, 0.5)',
			display: 'flex',
			alignItems: placement === 'top' ? 'flex-start' : 'center',
			justifyContent: 'center',
			zIndex: 50,
			paddingTop: placement === 'top' ? '10' : '0',
		}),
	};

	if (open) {
		const target = portalTarget ?? document.body;

		return createPortal(
			<ModalProvider value={props}>
				<div className={styles.overlay}>
					<ModalContent />
				</div>
			</ModalProvider>,
			target
		);
	}
};
