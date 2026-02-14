import { css } from '@/styled-system/css';
import { ModalContent } from './components/modal-window';
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
				<ModalContent title={title} size={size} onClose={onClose}>
					{children}
				</ModalContent>
			</div>
		);
	}
};
