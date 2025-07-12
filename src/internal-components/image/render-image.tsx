import React, { CSSProperties, isValidElement, ReactElement } from 'react';
import { ImageProps } from '../../types';
import { isHtmlImageProps } from './is-html-image-props';
import { cx } from '@/styled-system/css'; // Add this import

export const renderImage = (imageInput: ImageProps, styles?: CSSProperties, className?: string): ReactElement => {
	if (isValidElement(imageInput)) {
		const prevProps = imageInput.props as React.HTMLAttributes<HTMLElement>;
		const newProps: React.HTMLAttributes<HTMLElement> = {
			...prevProps,
			className: cx(prevProps.className, className),
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
				className={cx(imgClassName, className)}
				style={{ ...restProps.styles, ...styles }}
				{...restProps}
			/>
		);
	}

	console.warn('Invalid image props provided to renderImage');
	return <img src="" alt="Invalid image" style={{ display: 'none' }} />;
};
