import { CSSProperties, ReactNode } from 'react';

export type HtmlImageProps = {
	src: string;
	alt: string;
	width?: number | string;
	height?: number | string;
	className?: string;
	styles?: CSSProperties;
};

export type ImageProps = HtmlImageProps | ReactNode;
