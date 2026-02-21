import { UtilitySizeOptions } from '@/types';
import { ReactNode, RefObject } from 'react';

type ModalSizeOptions = UtilitySizeOptions & 'full';

export type ModalProps = {
	open: boolean;
	onClose: () => void;

	title?: ReactNode;
	children: ReactNode;
	footer?: ReactNode;

	size?: ModalSizeOptions;
	placement?: 'center' | 'top';

	closeOnOverlayClick?: boolean;
	preventScroll?: boolean;

	portalTarget?: HTMLElement;
};
