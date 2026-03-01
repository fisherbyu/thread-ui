import { CSSProperties, ReactNode } from 'react';

/** Props for a standard HTML `<img>` element */
export type HtmlImageProps = {
	src: string;
	alt: string;
	width?: number | string;
	height?: number | string;
	className?: string;
	styles?: CSSProperties;
};

/** Accepts either a standard image definition or a custom React element for full rendering control (ex: Next.js optimized image) */
export type ImageProps = HtmlImageProps | ReactNode;
