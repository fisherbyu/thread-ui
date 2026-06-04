import { ModalPrimitive } from '@/internal-components';
import { LightboxProps, LightboxState } from './lightbox.types';
import { LightboxProvider } from './lightbox-context';

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
			<ModalPrimitive isOpen={isOpen} onClose={onClose}>
				<>Content Here</>
			</ModalPrimitive>
		</LightboxProvider>
	);
};
