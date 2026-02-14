import { UtilitySizeOptions } from '@/types';
import { ReactNode, RefObject } from 'react';

type ModalSizeOptions = UtilitySizeOptions & 'full';

export type ModalProps = {
	open: boolean;
	onClose: () => void;
	defaultOpen?: boolean;

	title?: ReactNode;
	description?: ReactNode;
	children: ReactNode;
	footer?: ReactNode;

	size?: ModalSizeOptions;
	placement?: 'center' | 'top';

	closeOnOverlayClick?: boolean;
	closeOnEsc?: boolean;
	preventScroll?: boolean;

	initialFocus?: RefObject<HTMLElement>;
	portalTarget?: HTMLElement;
};
