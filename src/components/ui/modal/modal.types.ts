import { UtilitySizeOptions } from '@/types';
import { ReactNode, RefObject } from 'react';

type ModalSizeOptions = UtilitySizeOptions & 'full';

export type ModalProps = {
	/** Controls whether the modal is visible */
	open: boolean;
	/** Called when the modal requests to be closed */
	onClose: () => void;

	/** Title rendered in the modal header */
	title?: ReactNode;
	/** Modal Contents */
	children: ReactNode;
	/** Content rendered in the modal footer */
	footer?: ReactNode;

	/** Controls the max width of the modal */
	size?: ModalSizeOptions;
	/** Vertical placement of the modal within the page @default `'center'` */
	placement?: 'center' | 'top';

	/** Close the modal when the overlay is clicked @default `true` */
	closeOnOverlayClick?: boolean;
	/** Prevents body scroll while the modal is open @default `true` */
	preventScroll?: boolean;
	/** DOM element to portal the modal into. Defaults to `document.body` */
	portalTarget?: HTMLElement;
};
