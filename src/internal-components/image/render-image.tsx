import { isValidElement, ReactElement } from 'react';
import { ImageProps } from '../../types';
import { isHtmlImageProps } from './is-html-image-props';

export const renderImage = (imageInput: ImageProps): ReactElement => {
	if (isValidElement(imageInput)) {
		return imageInput;
	}
	if (isHtmlImageProps(imageInput)) {
		const { src, alt, width, height, ...restProps } = imageInput;
		return <img src={src} alt={alt} width={width} height={height} {...restProps} />;
	}

	console.warn('Invalid image props provided to renderImage');
	return <img src="" alt="Invalid image" style={{ display: 'none' }} />;
};
