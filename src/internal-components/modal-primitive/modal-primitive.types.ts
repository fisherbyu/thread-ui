import { ReactNode } from 'react';

export type ModalPrimitiveProps = {
	/** Controls whether the modal is visible */
	isOpen: boolean;
	/** Called when the modal requests to be closed */
	onClose: () => void;
	/** Modal Contents */
	children: ReactNode;
	/** Close the modal when the overlay is clicked @default `true` */
	closeOnOverlayClick?: boolean;
	/** Close the modal when the Escape key is pressed @default `true` */
	closeOnEsc?: boolean;
	/** Prevents body scroll while the modal is open @default `true` */
	preventScroll?: boolean;
	/** DOM element to portal the modal into. Defaults to `document.body` */
	portalTarget?: HTMLElement;
};
