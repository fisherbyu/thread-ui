import { css } from '@/styled-system/css';
import { ModalContent } from './components/modal-window';
import { ModalProps } from './modal.types';
import { ModalProvider } from './modal-context';

export const Modal = (props: ModalProps) => {
	const { open, children } = props;

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
			<ModalProvider value={props}>
				<div className={styles.overlay}>
					<ModalContent />
				</div>
			</ModalProvider>
		);
	}
};
