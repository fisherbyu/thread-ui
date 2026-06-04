'use client';
import { ModalProps } from './modal.types';
import { ModalProvider } from './modal-context';
import { ModalContent } from './components/modal-content';
import { cva } from '@/styled-system/css';
import { ModalPrimitive } from '@/internal-components/modal-primitive';

const styles = {
	overlay: cva({
		base: {
			position: 'fixed',
			inset: 0,
			background: 'scrim',
			display: 'flex',
			justifyContent: 'center',
			zIndex: 'modal',
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
 * <Modal isOpen={isOpen} onClose={() => setIsOpen(false)} title="Confirm" size="md">
 *   <p>Are you sure?</p>
 * </Modal>
 */
export const Modal = (props: ModalProps) => {
	const {
		isOpen,
		onClose,
		portalTarget,
		preventScroll = true,
		placement = 'center',
		closeOnOverlayClick = true,
		closeOnEsc = true,
	} = props;
	return (
		<ModalPrimitive
			overlayClassName={styles.overlay({ placement })}
			isOpen={isOpen}
			onClose={onClose}
			closeOnOverlayClick={closeOnOverlayClick}
			closeOnEsc={closeOnEsc}
			preventScroll={preventScroll}
			portalTarget={portalTarget}
		>
			<ModalProvider
				value={{
					...props,
					placement,
					closeOnOverlayClick,
					closeOnEsc,
					preventScroll,
				}}
			>
				<ModalContent />
			</ModalProvider>
		</ModalPrimitive>
	);
};
