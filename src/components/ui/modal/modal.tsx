import { css } from '@/styled-system/css';
import { ModalWindow } from './components/modal-window';
import { ModalProps } from './modal.types';

export const Modal = ({
	open,
	onClose,
	defaultOpen,
	title,
	description,
	children,
	footer,
	size,
	placement,
	closeOnOverlayClick,
	closeOnEsc,
	preventScroll,
	initialFocus,
	portalTarget,
}: ModalProps) => {
	const styles = {
		overlay: css({
			position: 'fixed',
			inset: 0,
			background: 'rgba(0, 0, 0, 0.5)',
			display: 'flex',
			alignItems: 'center',
			justifyContent: 'center',
			zIndex: 50,
		}),
	};

	if (open) {
		return (
			<div className={styles.overlay}>
				<ModalWindow size={size}>{children}</ModalWindow>
			</div>
		);
	}
};
