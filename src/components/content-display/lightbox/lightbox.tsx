import { ModalPrimitive } from '@/internal-components';
import { LightboxProps, LightboxState } from './lightbox.types';
import { LightboxProvider } from './lightbox-context';
import { css } from '@/styled-system/css';
import { LightBoxContent } from './components/lightbox-content';

const styles = {
	overlay: css({
		position: 'fixed',
		inset: 0,
		background: 'scrim',
		display: 'flex',
		justifyContent: 'center',
		zIndex: 'modal',
		alignItems: 'center',
		padding: '6',
	}),
};

export const Lightbox = ({ title, items, itemWrapper, isOpen, onClose }: LightboxProps) => {
	const initialValue: LightboxState = {
		title,
		items,
		itemWrapper,
		isOpen,
		onClose,
	};

	return (
		<LightboxProvider value={initialValue}>
			<ModalPrimitive overlayClassName={styles.overlay} isOpen={isOpen} onClose={onClose}>
				<LightBoxContent />
			</ModalPrimitive>
		</LightboxProvider>
	);
};
