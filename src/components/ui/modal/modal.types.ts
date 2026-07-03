import { ModalPrimitiveProps } from '@/internal-components/modal-primitive';
import { Prettify, ScrimScaleOptions, UtilitySizeOptions } from '@/types';
import { ReactNode } from 'react';

type ModalSizeOptions = UtilitySizeOptions & 'full';

export type ModalProps = Prettify<
	ModalPrimitiveProps & {
		/** Title rendered in the modal header */
		title?: ReactNode;
		/** Content rendered in the modal footer */
		footer?: ReactNode;
		/** Controls the max width of the modal */
		size?: ModalSizeOptions;
		/** Vertical placement of the modal within the page @default `'center'` */
		placement?: 'center' | 'top';
		/** Scrim Background Opacity @default `medium` */
		scrimLevel?: ScrimScaleOptions;
	}
>;

export type ModalState = Prettify<
	Pick<ModalProps, 'children' | 'size' | 'title' | 'footer' | 'onClose'>
>;
