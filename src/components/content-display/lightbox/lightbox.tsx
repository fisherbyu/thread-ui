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

/**
 * A fullscreen Gallery for focused content viewing, built on {@link ModalPrimitive}.
 *
 * Renders a {@link Gallery} in `bare` appearance over a scrim backdrop.
 *
 * @example
 * ```tsx
 * <Lightbox
 *   isOpen={isOpen}
 *   onClose={() => setOpen(false)}
 *   title="Photos"
 *   items={[<img src="a.jpg" />, <img src="b.jpg" />]}
 * />
 * ```
 */
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
