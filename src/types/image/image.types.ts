import { ReactNode } from 'react';

export type HtmlImageProps = {
	src: string;
	alt: string;
	width?: number | string;
	height?: number | string;
};

export type ImageProps = HtmlImageProps | ReactNode;
