import { Prettify } from '@/types';
import { GalleryProps } from '../gallery';
import { ModalProps } from '@/components/ui';

export type LightboxProps = Prettify<
	GalleryProps & Pick<ModalProps, 'isOpen' | 'onClose' | 'title'>
>;
