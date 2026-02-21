import { css } from '@/styled-system/css';
import { ModalContent } from './components/modal-window';
import { ModalProps } from './modal.types';
import { ModalProvider } from './modal-context';
import { useEffect } from 'react';
import { createPortal } from 'react-dom';

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
