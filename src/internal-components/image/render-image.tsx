import React, { CSSProperties, isValidElement, ReactElement } from 'react';
import { ImageProps } from '../../types';
import { isHtmlImageProps } from './is-html-image-props';

export const renderImage = (imageInput: ImageProps, styles?: CSSProperties): ReactElement => {
	if (isValidElement(imageInput)) {
		const prevProps = imageInput.props as React.HTMLAttributes<HTMLElement>;
		const newProps: React.HTMLAttributes<HTMLElement> = {
			...prevProps,
			style: {
				...prevProps.style,
				...styles,
			},
		};
		return React.cloneElement(imageInput, newProps);
	}
	if (isHtmlImageProps(imageInput)) {
		const { src, alt, width, height, ...restProps } = imageInput;
		return <img src={src} alt={alt} width={width} height={height} style={{ ...restProps.styles, ...styles }} {...restProps} />;
	}

	console.warn('Invalid image props provided to renderImage');
	return <img src="" alt="Invalid image" style={{ display: 'none' }} />;
};
