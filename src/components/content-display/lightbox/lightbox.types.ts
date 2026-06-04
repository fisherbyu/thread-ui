import { Prettify } from '@/types';
import { GalleryProps } from '../gallery';
import { ModalProps } from '@/components/ui';
import { GalleryAppearanceOptions } from '../gallery/gallery.types';

export type LightboxProps = Prettify<
	Omit<GalleryProps, 'size' | 'appearance'> &
		Pick<ModalProps, 'isOpen' | 'onClose'> & {
			/** Gallery Content Appearance @default `bare` */
			appearance?: GalleryAppearanceOptions;
		}
>;

export type LightboxState = LightboxProps;
