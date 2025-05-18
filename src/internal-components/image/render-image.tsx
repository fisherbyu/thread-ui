import React, { CSSProperties, isValidElement, ReactElement } from 'react';
import { ImageProps } from '../../types';
import { isHtmlImageProps } from './is-html-image-props';

export const renderImage = (imageInput: ImageProps, styles?: CSSProperties, className?: string): ReactElement => {
	if (isValidElement(imageInput)) {
		const prevProps = imageInput.props as React.HTMLAttributes<HTMLElement>;
		const newProps: React.HTMLAttributes<HTMLElement> = {
			...prevProps,
			className: className ? (prevProps.className ? `${prevProps.className} ${className}` : className) : prevProps.className,
			style: {
				...prevProps.style,
				...styles,
			},
		};
		return React.cloneElement(imageInput, newProps);
	}

	if (isHtmlImageProps(imageInput)) {
		const { src, alt, width, height, className: imgClassName, ...restProps } = imageInput;
		return (
			<img
				src={src}
				alt={alt}
				width={width}
				height={height}
				className={className ? (imgClassName ? `${imgClassName} ${className}` : className) : imgClassName}
				style={{ ...restProps.styles, ...styles }}
				{...restProps}
			/>
		);
	}

	console.warn('Invalid image props provided to renderImage');
	return <img src="" alt="Invalid image" style={{ display: 'none' }} />;
};
