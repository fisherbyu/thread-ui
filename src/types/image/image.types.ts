import { ReactNode } from 'react';

export type HtmlImageProps = {
	src: string;
	alt: string;
};

export type ImageProps = HtmlImageProps | ReactNode;
