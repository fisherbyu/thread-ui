import { Prettify } from '@/types';
import { GalleryProps } from '../gallery';
import { ModalProps } from '@/components/ui';

export type LightboxProps = Prettify<
	Omit<GalleryProps, 'size'> & Pick<ModalProps, 'isOpen' | 'onClose'>
>;

export type LightboxState = LightboxProps;
