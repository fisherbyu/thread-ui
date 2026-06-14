import { Prettify } from '@/types';
import { GalleryProps } from '../gallery';
import { ModalProps } from '@/components/ui';
import { GalleryAppearanceOptions } from '../gallery/gallery.types';

export type LightboxProps = Prettify<
	Omit<GalleryProps, 'size' | 'subtitle' | 'appearance' | 'variableWidths'> &
		Pick<ModalProps, 'isOpen' | 'onClose'> & {
			/** Gallery Content Appearance @default `bare` */
			appearance?: GalleryAppearanceOptions;
			/** Control Auto-Width within track thumbnails @default `true` */
			variableWidths?: boolean;
		}
>;

export type LightboxState = LightboxProps;
