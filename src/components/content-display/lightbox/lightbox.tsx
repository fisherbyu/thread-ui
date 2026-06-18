import { ModalPrimitive } from '@/internal-components';
import { LightboxProps, LightboxState } from './lightbox.types';
import { LightboxProvider } from './lightbox-context';
import { css, cva } from '@/styled-system/css';
import { LightBoxContent } from './components/lightbox-content';

const styles = {
	overlay: cva({
		base: {
			position: 'fixed',
			inset: 0,
			background: 'scrim.heavy',
			display: 'flex',
			justifyContent: 'center',
			zIndex: 'modal',
			alignItems: 'center',
			padding: '6',
		},
		variants: {
			scrimLevel: {
				light: { background: 'scrim.light' },
				medium: { background: 'scrim.medium' },
				heavy: { background: 'scrim.heavy' },
			},
		},
		defaultVariants: {
			scrimLevel: 'heavy',
		},
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
export const Lightbox = ({
	title,
	items,
	itemWrapper,
	isOpen,
	onClose,
	startIndex,
	appearance = 'bare',
	variableWidths = true,
	scrimLevel = 'heavy',
}: LightboxProps) => {
	const initialValue: LightboxState = {
		title,
		items,
		itemWrapper,
		isOpen,
		onClose,
		startIndex,
		appearance,
		variableWidths,
	};

	return (
		<LightboxProvider value={initialValue}>
			<ModalPrimitive
				overlayClassName={styles.overlay({ scrimLevel })}
				isOpen={isOpen}
				onClose={onClose}
			>
				<LightBoxContent />
			</ModalPrimitive>
		</LightboxProvider>
	);
};
