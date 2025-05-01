import { ReactElement } from 'react';
import { ImageProps } from '../../types';
import { renderImage } from './render-image';

export const Image = (props: ImageProps): ReactElement => {
	return renderImage(props);
};
